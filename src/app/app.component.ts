import { Component } from '@angular/core';
import {AppUrl} from './urls/app-url';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Koop - Wawelska Kooperatywa Spożywcza';
  home = AppUrl.HOME_PAGE_URL;
}
