import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getNews(): Observable<any> {
    return this.http.get(this.baseUrl).pipe(
      catchError((error) => {
        console.error('Erro ao carregar notícias', error);
        return of({ articles: [] });
      })
    );
  }

  getTopHeadlines(category: string = ''): Observable<any> {
    let url = this.baseUrl;
    if (category && category !== 'all') {
      url += `?category=${category}`;
    }
    return this.http.get(url).pipe(
      catchError((error) => {
        console.error('Erro ao carregar por categoria', error);
        return of({ articles: [] });
      })
    );
  }

  searchNews(term: string): Observable<any> {
    const url = `${this.baseUrl}?q=${term}`;
    return this.http.get(url).pipe(
      catchError((error) => {
        console.error('Erro ao buscar notícia', error);
        return of({ articles: [] });
      })
    );
  }
}
