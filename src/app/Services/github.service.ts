import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RepositorySearchResult } from '../models/repositorySearchResult';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  constructor(private readonly httpClient: HttpClient) {}

  public searchRepositories(
    term: string,
    page: number
  ): Observable<RepositorySearchResult> {
    if (!term) {
      return of(new RepositorySearchResult([], 0));
    }

    const params = new HttpParams()
      .set('q', term)
      .set('page', page.toString());

    return this.httpClient.get<any>('https://api.github.com/search/repositories', { params: params })
      .pipe(
        map((res) => {
          return new RepositorySearchResult(res.items, res.total_count);
        }));
  }
}
