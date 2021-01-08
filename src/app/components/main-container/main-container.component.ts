import {
  Component,
  OnInit,
  ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { map, share, switchMap, tap } from 'rxjs/operators';
import { Person } from '../../models/models';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnInit {

  @ViewChild('outputDiv', {static: true})
  private outputDiv;

  output: string = 'Click an operator button...';

  person: Person;

  postsUrl = 'https://jsonplaceholder.typicode.com/posts';
  todosUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.person = new Person('Clarence', 'Darnell', 'Whitaker');
  }

  clearOutput() {
   this.output = '';
  }

  writeLog(data: string) {
    // this.outputDiv.nativeElement.childNodes[0].appendChild(document.createTextNode(data));
    this.output = data;
  }


  // create observable from an object
  doOf() {
    this.clearOutput();
    this.writeLog('Working...');
    const person$: Observable<Person> = of(this.person);
    person$.subscribe( data => this.output = 'of: ' + JSON.stringify(data));
  }

  // create observable from a promise
  doFrom() {
    this.clearOutput();
    this.writeLog('Working...');
    const personPromise = Promise.resolve(this.person);
    const person$: Observable<Person> = from(personPromise);
    person$.subscribe( data => this.output = 'from: ' + JSON.stringify(data));
  }

  // alter the data
  doMap() {
    this.clearOutput();
    this.writeLog('Working...');
    // use map to manipulate the data
    const person$: Observable<Person> = of(this.person);
    person$
      .pipe(
        map(p => p.firstName.toUpperCase())
      ).subscribe(data => this.output = 'map: ' + JSON.stringify(data));
  }

  // get the data but don't alter it
  doTap() {
    this.clearOutput();
    this.writeLog('Working...');
    const person$: Observable<Person> = of(this.person);
    person$
      .pipe(
        tap(p => p.firstName.toLowerCase())
      ).subscribe(data => this.output = 'tap: ' + JSON.stringify(data));
  }

  getPosts(): Observable<any> {
    return this.httpClient.get<any>(this.postsUrl).pipe(share());
  }

  getTodos(): Observable<any> {
    return this.httpClient.get<any>(this.todosUrl).pipe(share());
  }

  // share the stream across subscriptions
  doShare() {
    this.clearOutput();
    this.writeLog('Working...');
    const posts$ = this.getPosts();
    posts$.subscribe(data => this.output = 'share: ' + JSON.stringify(data));
    return posts$;
  }

  doSwitchMap() {
    this.clearOutput();
    this.writeLog('Working...');
    // the observables
    const posts$ = this.getPosts();
    const todos$ = this.getTodos();
    // combine the oberservables
    const combined$ = posts$.pipe(
      switchMap(posts$ => {
        return todos$.pipe(
          tap(todos$ => {
            this.output += 'switchMap - todos: ' + JSON.stringify(todos$);
            this.output += '--------------------------------------------';
            this.output += 'switchMap - posts: ' + JSON.stringify(posts$);
          })
        );
      })
    );
    combined$.subscribe();
  }

}
