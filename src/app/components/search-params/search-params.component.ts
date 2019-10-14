import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-params',
  templateUrl: './search-params.component.html',
  styleUrls: ['./search-params.component.css'],
})
export class SearchParamsComponent {

  @Output()
  public termChanged: EventEmitter<string> = new EventEmitter();
  public term = '';

  public termChange(): void {
    this.termChanged.emit(this.term);
  }
}
