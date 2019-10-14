import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lear-angular-homework2';

  private readonly _events$$: Subject<string> = new Subject();

  public get events$(): Observable<string> {
    return this._events$$.asObservable();
  }

  public searchTermChanged(value: string) {
    this._events$$.next(value);
  }

}
