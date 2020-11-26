import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private chave = "a6940d80f6174dcbbc50c1ba89789bf7";
  private caminhoPadrao = "https://newsapi.org/v2";
  
  constructor(public http:HttpClient) { }

  public getNews(page:number = 1)
  {
    let noticias=`${this.caminhoPadrao}/Everything?q=queiroz&apiKey=${this.chave}&page=${page}&language=pt`;
    return this.http.get(noticias);
  }
}
