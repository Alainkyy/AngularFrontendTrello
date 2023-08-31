import { Component } from '@angular/core';
import { Axe } from './models/Axe';
import { AxeService } from './services/axe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Trello Like";
  axes: Axe[] = [];

    constructor(
      private axeService: AxeService,
      private router: Router // Ajoutez cette ligne
    ) {
      this.axeService.getAxe().subscribe((result: Axe[]) => {
        this.axes = result;
      });
    }
}
 

  
