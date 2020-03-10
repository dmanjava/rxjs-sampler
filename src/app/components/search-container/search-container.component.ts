import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {switchMap} from 'rxjs/operators';
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

  doSearch(text$: Observable<string>): Observable<string> {
    return text$.pipe(
      switchMap( searcTerm => {
        if (!searcTerm) {
          return [];
        }
        return this.mainComponment.getPosts();
      })
    );
  }

}
