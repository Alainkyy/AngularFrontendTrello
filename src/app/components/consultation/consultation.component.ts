import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { filter } from 'rxjs/operators';

import { Consultant } from '../../models/Consultant';
import { ConsultationService } from 'src/app/services/consultation.service';

import { Axe } from '../../models/Axe';
import { Specialite } from '../../models/Specialite';
import { AxeService } from 'src/app/services/axe.service'; // inclus Axe & Specialite

import { Cours } from '../../models/Cours';

import { CarteEtat } from '../../models/CarteEtat';
import { CoursService } from 'src/app/services/cours.service';


@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationComponent implements OnInit{
  public consultants: any[] = [];
  public axes: any[] = [];
  public specialites: any[] = [];
  public carteEtats: CarteEtat[] = [];
  public cours: Cours[] = [];

  constructor(
    private consultationService: ConsultationService,
    private axeService: AxeService,
    private coursService: CoursService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.axeService.getAxe().subscribe((result: any[]) => {
      this.axes = result.map(axeData => new Axe(
        axeData.idAxe,
        axeData.nomAxe,
        axeData.nbSpecialite
      ));
      console.log('Liste des axes:', this.axes);
  });

    this.axeService.getSpecialite().subscribe((result: any[]) => {
    this.specialites = result.map(specialiteData => new Specialite(
      specialiteData.idSpecialite,
      specialiteData.nomSpecialite,
      specialiteData.idAxe
    ));
  console.log('Liste des Specialités:', this.specialites);
});
    this.route.queryParamMap.subscribe(params => {
        this.afficherTousLesConsultants();
    })
  
    this.chargerToutesLesCartesEtats();
    this.chargerTousLesCours();
  
  };


    chargerToutesLesCartesEtats() {
      this.coursService.GetCarteEtat().subscribe((result: any[]) => {
        this.carteEtats = result.map(carteEtatData => new CarteEtat(
          carteEtatData.idCarte,
          carteEtatData.idConsultant,
          carteEtatData.idCours,
          carteEtatData.isVosCours,
          carteEtatData.isActif,
          carteEtatData.isFinis,
          carteEtatData.scoreEtat
        ));
        console.log('Liste des carteEtat:', this.carteEtats);
    });
  }

  chargerTousLesCours() {
    this.coursService.getCours().subscribe((result: Cours[]) => {
      this.cours = result.map(coursData => new Cours(
        coursData.idCours,
        coursData.nomCours,
        coursData.lienVersCours,
        coursData.videoVersCours,
        coursData.exercice,
        coursData.avancement,
        coursData.dateDebutCours,
        coursData.dateFinCours,
        coursData.commentaire,
        coursData.idSpecialite
      ));
      console.log('Liste des Cours :', this.cours);
  });
}

 public afficherTousLesConsultants() {
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

  public afficherToutesLesCartesEtatsParConsultant(idConsultant: number) {
    this.coursService.GetCarteEtat().subscribe((result: any[]) => {
    this.carteEtats = result.
     filter(carteEtatData => carteEtatData.idConsultant === idConsultant).
     map(carteEtatData => {


          const cours = this.cours.find(cours => cours.idCours === carteEtatData.idCours);
          const nomCours = cours ? cours.nomCours : '';
          
          return new CarteEtat(
          carteEtatData.idCarte,
          carteEtatData.idConsultant,
          carteEtatData.idCours,
          carteEtatData.isVosCours,
          carteEtatData.isActif,
          carteEtatData.isFinis,
          carteEtatData.scoreEtat
          )});
    });
    console.log(this.carteEtats);
  };

  

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