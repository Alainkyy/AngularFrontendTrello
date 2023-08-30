import { Component } from '@angular/core';
import { Axe } from './models/Axe';
import { AxeService } from './services/axe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Paroles d'Aventure";
  axes: Axe[] = [];

  /*constructor(private axeService: AxeService) {
    this.axeService
      .getAxe()
      .subscribe((result : Axe[]) => (this.axes = result));
    }*/

    constructor(private axeService: AxeService) {
      this.axes = this.axeService.getAxe();
        console.log(this.axes);
      }
  
}