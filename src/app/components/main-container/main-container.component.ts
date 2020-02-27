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

  private output: string = 'Console log. Waiting...';

  person: Person;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.person = new Person('Clarence', 'Darnell', 'Whitaker');
  }

  clearOutput() {
   this.output = '';
  }

  writeLog(data: string) {
    debugger;
    // this.outputDiv.nativeElement.childNodes[0].appendChild(document.createTextNode(data));
    this.output = data;
  }


  // create obserable from an object
  doOf() {
    this.clearOutput();
    this.writeLog('Working...');
    const person$:  Observable<Person> = of(this.person);
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

}
