import { Component } from '@angular/core';
import { APP } from './constants/app.constant';
import { fadeInOutAnimation, resizeAnimation } from './animations/on-page-change.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fadeInOutAnimation, 
    resizeAnimation
  ] 
})
export class AppComponent {
  title = APP;
}
