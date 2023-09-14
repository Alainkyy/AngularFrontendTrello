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
  public coursAvecProprietesUniques: any[] = [];

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
      this.carteEtats = result
        .filter(carteEtatData => carteEtatData.idConsultant === idConsultant)
        .map(carteEtatData => {
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
          );
        });
  
      const coursAvecProprietesUniques: CarteEtat[] = [];
  
      // Créer un dictionnaire pour stocker les cartes par idCours avec l'idCarte le plus élevé
      const cartesParIdCours: { [idCours: number]: CarteEtat } = {};
  
      // Parcourez les carteEtats existants pour conserver ceux avec idCarte le plus élevé
      this.carteEtats.forEach(carteEtat => {
        const idCours = carteEtat.idCours;
        if (!cartesParIdCours[idCours] || carteEtat.idCarte > cartesParIdCours[idCours].idCarte) {
          cartesParIdCours[idCours] = carteEtat;
        }
      });
  
      // Transformez le dictionnaire en un tableau d'objets
      for (const idCours in cartesParIdCours) {
        if (cartesParIdCours.hasOwnProperty(idCours)) {
          const carteMax = cartesParIdCours[idCours];
  
          coursAvecProprietesUniques.push({
            idCarte: carteMax.idCarte,
            idConsultant: carteMax.idConsultant,
            idCours: Number(idCours),
            isVosCours: carteMax.isVosCours,
            isActif: carteMax.isActif,
            isFinis: carteMax.isFinis,
            scoreEtat: carteMax.scoreEtat
          });
        }
      }
  
      // Maintenant, coursAvecProprietesUniques contient les propriétés uniques par idCours
      console.log('Liste des cours avec propriétés uniques:', coursAvecProprietesUniques);
      // Vous pouvez stocker les résultats dans une propriété de votre composant si nécessaire
      this.coursAvecProprietesUniques = coursAvecProprietesUniques;
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

  convertirIdCoursEnLettre(idCours: number): string {
    switch (idCours) {
      case 0:
        return "Not Found";
      case 1:
        return "Not Found";
      case 2:
        return "Not Found";
      case 3:
        return "Not Found";
      case 4:
        return "Introduction à JAVA";
      case 5:
        return "Programmation Orientée Objet";
      case 6:
        return "Gestion des exceptions en JAVA";
      case 7:
        return "Fondamentaux de .NET";
      case 8:
        return "Création d applications Web avec ASP.NET";
      case 9:
        return "Développement d applications Windows avec C#";
      case 10:
        return "Introduction à Python";
      case 11:
        return "Manipulation de données avec Pandas";
      case 12:
        return "Création d applications Web avec Flask";
      case 13:
        return "Introduction to Data Analytics";
      case 14:
        return "Data Mining Techniques";
      case 15:
        return "Big Data Analysis";
      case 16:
        return "Introduction to Data Visualization";
      case 17:
        return "Creating Effective Data Visualizations";
      case 18:
        return "Interactive Data Dashboards";
      case 19:
        return "Introduction to Database Administration";
      case 20:
        return "Database Performance Tuning";
      case 21:
        return "Data Backup and Recovery";
      case 22:
        return "Introduction to Data Governance";
      case 23:
        return "Data Privacy and Security";
      case 24:
        return "Data Quality Management";
      case 25:
        return "Introduction to Financial Analysis";
      case 26:
        return "Financial Reporting and Statements";
      case 27:
        return "Risk Assessment and Management";
      default:
        return ""; 
    }
  }
  }