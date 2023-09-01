import { Component } from '@angular/core';
import { Axe } from 'src/app/models/Axe';
import { AxeService } from 'src/app/services/axe.service';

@Component({
  selector: 'app-specialite-page',
  templateUrl: './specialite-page.component.html',
  styleUrls: ['./specialite-page.component.css']
})
export class SpecialitePageComponent {
  axes: Axe[] = [];
  isTableVisible = false;
  containerHeight = '35vh';

  constructor(
    private axeService: AxeService
  ) {}

  toggleTable() {
    this.isTableVisible = !this.isTableVisible;
    if (this.containerHeight === '35vh') {
      this.containerHeight = '65vh';
    } else {
      this.containerHeight = '65vh';
    }
  }
}