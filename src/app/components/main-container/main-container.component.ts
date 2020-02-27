import {
  Component,
  OnInit,
  ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnInit {

  @ViewChild('outputDiv', {static: true})
  private outputDiv;

  private output: string = 'Console log...';

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    // this.writeLog('Waiting...');
  }

  clearOutput() {
   this.output = '';
  }

  writeLog(data: string) {
    debugger;
    // this.outputDiv.nativeElement.childNodes[0].appendChild(document.createTextNode(data));
    this.output = data;
  }


  doOf() {

  }

}
