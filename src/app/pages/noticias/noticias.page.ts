import { NewsService } from '../../services/news.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
  providers: [ NewsService ]
})
export class NoticiasPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public lista_noticias = new Array<any>();
  public page:number = 1;

  constructor(private newsService: NewsService,
    private loadingController:LoadingController) { }

  ngOnInit() {
  }

  async efeitoLoading() {
    const loading = await this.loadingController.create({
      message: 'Carregando Notícias',
      duration: 1000
    });

    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }

  efeitoRefresh(event) {
    this.page = 1;
    this.carregarNoticias();
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

  efeitoScrollInfinito(event) {  
    this.page++;
    this.carregarNoticias();
    setTimeout(() => {
      event.target.complete();
      this.infiniteScroll.disabled = false;
    }, 1000);
  }

  carregarNoticias() {
    this.newsService.getNews(this.page).subscribe(
      data => {
        const response = (data as any);

        if (this.page === 1) {
          this.lista_noticias = response.articles;
        } else {
          this.lista_noticias = this.lista_noticias.concat(response.articles);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  ionViewDidEnter() {
    this.efeitoLoading();
    this.carregarNoticias();
  }
}
