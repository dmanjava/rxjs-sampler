import { Component, Input, OnInit } from '@angular/core';
import {Observable, of} from 'rxjs';
import {debounceTime, switchMap} from 'rxjs/operators';
import {MainContainerComponent} from '../main-container/main-container.component';

@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.scss']
})
export class SearchContainerComponent implements OnInit {

  @Input('main')
  mainComponment: MainContainerComponent;
  search: string;
  result$: Observable<any>;

  constructor() { }

  ngOnInit() {}

  doSearch(text: string): Observable<string> {
    debugger;
    const text$ = of(text);
    return text$.pipe(
      debounceTime(500),
      switchMap( searchTerm => {
        if (!searchTerm) {
          return [];
        }
        debugger;
        this.result$ = this.mainComponment.getPosts();
        return this.result$;
      })
    );
  }

}
