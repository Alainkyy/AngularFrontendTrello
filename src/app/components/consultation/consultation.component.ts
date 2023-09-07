import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ConsultationService } from 'src/app/services/consultation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Consultant } from '../../models/Consultant';

import { Axe } from '../../models/Axe';
import { Specialite } from '../../models/Specialite';
import { AxeService } from 'src/app/services/axe.service';


@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationComponent implements OnInit{
  consultants: any[] = [];
  axes: any[] = [];
  specialites: any[] = [];

  constructor(
    private consultationService: ConsultationService,
    private axeService: AxeService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
        this.afficherTousLesConsultants();
    })};


    afficherTousLesConsultants() {
      this.chargerTousLesAxes();
      this.chargerToutesLesSpecialites();
    
      this.consultationService.GetConsultant().subscribe((result: any[]) => {
        this.consultants = result.map(consultantData => {
          const axe = this.axes.find(axe => axe.idAxe === consultantData.idAxe);
          const nomAxe = axe ? axe.nomAxe : '';
          const specialite = this.specialites.find(specialite => specialite.idSpecialite === consultantData.idSpecialite);
          const nomSpecialite = specialite ? specialite.nomSpecialite : '';
    
          return new Consultant(
            consultantData.idConsultant,
            consultantData.nomConsultant,
            consultantData.codeConsultant,
            consultantData.statutConsultant,
            consultantData.mdpConsultant,
            nomAxe,
            nomSpecialite,
            consultantData.score,
          );
        });
    
        console.log('Liste des Consultants:', this.consultants);
      });
    }

  public chargerTousLesAxes() {
    this.axeService.getAxe().subscribe((result: any[]) => {
      this.axes = result.map(axeData => new Axe(
        axeData.idAxe,
        axeData.nomAxe,
        axeData.nbSpecialite
      ));
      console.log('Liste des axes:', this.axes);
  });
}

public chargerToutesLesSpecialites() {
  this.axeService.getSpecialite().subscribe((result: any[]) => {
    this.specialites = result.map(specialiteData => new Specialite(
      specialiteData.idSpecialite,
      specialiteData.nomSpecialite,
      specialiteData.idAxe
    ));
    console.log('Liste des Specialités:', this.specialites);
});
}

  supprimerConsultant(idConsultant: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce consultant ?')) {
      this.consultationService.DeleteConsultant(idConsultant).subscribe(() => {
        this.afficherTousLesConsultants();
      }, (error) => {
        console.error('Erreur lors de la suppression du consultant :', error);
      });
    }
  }

  modifierConsultant(idConsultant: number) {
    this.router.navigate(['/editConsultant', idConsultant]);
  }
  }