import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AxeService } from 'src/app/services/axe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Axe } from '../../models/Axe';

@Component({
  selector: 'app-axe-liste',
  templateUrl: './axe-liste.component.html',
  styleUrls: ['./axe-liste.component.css']
})
export class AxeListeComponent implements OnInit {
  axes: any[] = [];

  constructor(
    private axeService: AxeService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

ngOnInit(): void {
  this.route.queryParamMap.subscribe(params => {
      this.afficherTousLesAxes();
  })};

  afficherTousLesAxes() {
    this.axeService.getAxe().subscribe((result: any[]) => {
      this.axes = result.map(axeData => new Axe(
        axeData.idAxe,
        axeData.nomAxe,
        axeData.nbSpecialite
      ));
      console.log('Liste des axes:', this.axes);
  });
}
}