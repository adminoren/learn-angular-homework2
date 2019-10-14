import { Component, OnInit, Input } from '@angular/core';
import { GithubService } from 'src/app/Services/github.service';
import { Observable } from 'rxjs';
import { switchMap, debounceTime } from 'rxjs/operators';
import { IGitGubRepository } from 'src/app/models/repository.model';
import { RepositorySearchResult } from 'src/app/models/repositorySearchResult';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  @Input()
  public termChanged$: Observable<string>;

  private _page = 1;
  private _term: string;

  public showLoader = false;
  public pageSize = 30;
  public totalCount: number;
  public repositories: IGitGubRepository[];

  constructor(
    private readonly gitHubService: GithubService
  ) {}

  ngOnInit() {
    this.termChanged$.pipe(
      debounceTime(500),
      switchMap((term: string) => {
        this._term = term;
        this.showLoader = true;
        return this.gitHubService.searchRepositories(term, this.page);
      })
    ).subscribe((result: RepositorySearchResult) => {
      this.repositories = result.items;
      this.totalCount = result.totalCount;
      this.showLoader = false;
    });
  }

  set page(val: number) {
    if (this._page !== val) {
      this._page = val;
      this.reloadData();
    }
  }

  get page(): number {
    return this._page;
  }

  get numberOffset(): number {
    return (this._page - 1) * this.pageSize;
  }

  private reloadData(): void {
    this.showLoader = true;
    this.gitHubService.searchRepositories(this._term, this.page)
    .subscribe((result: RepositorySearchResult) => {
      this.repositories = result.items;
      this.totalCount = result.totalCount;
      this.showLoader = false;
    });
  }
}
