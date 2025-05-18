import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private apiKey = environment.newsApiKey;
  private apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${this.apiKey}`;

  constructor(private http: HttpClient,) {}

getNews(): Observable<any> {
  return this.http.get(this.apiUrl).pipe(
    catchError((error) => {
      console.error('Erro ao carregar notícias', error);
      return of({ articles: [] });
    })
  );
}

getTopHeadlines(category: string = ''): Observable<any> {
  let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${this.apiKey}`;
  if (category && category !== 'all') {
    url += `&category=${category}`;
  }
  return this.http.get(url);
}

searchNews(term: string): Observable<any> {
  const url = `https://newsapi.org/v2/everything?q=${term}&apiKey=${this.apiKey}`;
  return this.http.get(url);
}


}
