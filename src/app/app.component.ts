import { Component, ViewChild} from '@angular/core';
import {MainContainerComponent} from './components/main-container/main-container.component';
import {SearchContainerComponent} from './components/search-container/search-container.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rxjs-sampler';
  @ViewChild('main') main: MainContainerComponent;
  @ViewChild('search')search: SearchContainerComponent;
}
