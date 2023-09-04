import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Cours } from './models/Cours';
import { CoursService } from './services/cours.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Trello Like';
  cours: Cours[] = [];

  isLoginVisible = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isLoginVisible = false;
      } else if (event instanceof NavigationEnd) {
        this.isLoginVisible = true;
      }
    });
  }
}

  
