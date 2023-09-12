import { ChangeDetectorRef, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CoursService } from 'src/app/services/cours.service';
import { LoginService } from 'src/app/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cours } from '../../models/Cours';
import { Consultant } from '../../models/Consultant';
import { CarteEtat } from '../../models/CarteEtat';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { EditConsultationComponent } from "C:/Users/kleyf/source/repos/AngularFrontend/AngularFrontendTrello/src/app/components/consultation/edit-consultation/edit-consultation.component";
import { ConsultationService } from '../../services/consultation.service';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.css'],
  providers: [EditConsultationComponent],
})
export class CarteComponent implements OnInit {

  title = 'Trello Like';
  carteEtats: CarteEtat[] = [];
  connectedAs4: string | null = null; //codeConsultant
  connectedAs3: number | null = null; //idSpecialite du Consultant
  connectedAs5: number | null = null; //score du Consultant
  connectedAs6: any | null = null; //idConsultant du Consultant
  infoCours : Cours [] = [];
  listecours: Cours[] = [];
  actif: Cours[] = [];
  done: Cours[] = [];
  
  score: number = 0;
  idCoursMoved : number = 0;
  public consultants: Consultant[] = [];
  idCarte: number = 0;
  public carteEtatToAdd: CarteEtat = new CarteEtat();
  modifications: CarteEtat[] = [];
    
  constructor(
    private coursService: CoursService,
    private loginService: LoginService,
    private editConsultationComponent: EditConsultationComponent,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}
    
ngOnInit(): void {
  this.connectedAs4 = this.loginService.getCodeConsultantConnecte();
  this.connectedAs3 = this.loginService.getIdSpecialiteConsultantConnecte();
  this.connectedAs5 = this.loginService.getScoreConsultantConnecte();
  this.connectedAs6 = this.loginService.getIdConsultantConsultantConnecte();

  // Recupere l'idSpecialite du Consultant connecté
  if (this.connectedAs3 !== null) {
    //  this.afficherTousLesCoursFiltre(this.connectedAs3);
  } else {
    console.log("L'ID de spécialité est null.");
  }

  // Recupere le codeConsultant du Consultant connecté
  if (this.connectedAs4 !== null) {
   // console.log("Code Consultant :",this.connectedAs4);
  } else {
    console.log("Le CodeConsultant est null.");
  }

  // Recupere le score du Consultant connecté
  if (this.connectedAs5 !== null) {
  } else {
    console.log("Le Score est null.");
  }

  // Recupere l'idConsultant du Consultant connecté
  if (this.connectedAs6 !== null) {
  } else {
    console.log("L'idConsultant est null.");
  }
  this.afficherTousLesCours();
  this.afficherTousLesEtatsFiltre(this.connectedAs6);
}

afficherTousLesEtatsFiltre(connectedAs6: number) {
  this.coursService.GetCarteEtat().subscribe((result: any[]) => {
    this.carteEtats = result
    .filter(carteEtats => carteEtats.idConsultant === this.connectedAs6)
    .map(carteEtats => new CarteEtat(
      carteEtats.idCarte,
      carteEtats.idConsultant,
      carteEtats.idCours,
      carteEtats.isVosCours,
      carteEtats.isActif,
      carteEtats.isFinis,
      carteEtats.scoreEtat
    ));
    
    if (this.carteEtats.length === 0){
      if (this.connectedAs3 !== null) {
      this.afficherTousLesCoursFiltre(this.connectedAs3)
      }
    }

    console.log('Chargement des carteEtats:', this.carteEtats);

    const coursAvecProprietesUniques = this.getUniqueCoursProperties(this.carteEtats, this.infoCours);
    this.associerCoursAuxListes(coursAvecProprietesUniques);


    const totalCours = this.listecours.length + this.done.length + this.actif.length;
    const finishedCours = this.done.length;
    this.score = totalCours !== 0 ? Math.floor((finishedCours / totalCours) * 100) : 0;

    return this.carteEtats;
  });
}

public afficherTousLesCoursFiltre(connectedAs3: number) {
  this.coursService.getCours().subscribe((result: any[]) => {
    this.listecours = result
      .filter(coursData => coursData.idSpecialite === connectedAs3)
      .map(coursData => new Cours(
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
  });
}

afficherTousLesCours() {
  this.coursService.getCours().subscribe((result: any[]) => {
    this.infoCours = result.map(infoCoursData => new Cours(
      infoCoursData.idCours,
      infoCoursData.nomCours,
      infoCoursData.lienVersCours,
      infoCoursData.videoVersCours,
      infoCoursData.exercice,
      infoCoursData.avancement,
      infoCoursData.dateDebutCours,
      infoCoursData.dateFinCours,
      infoCoursData.commentaire,
      infoCoursData.idSpecialite
    ));
});
}

getUniqueCoursProperties(carteEtats: any[], cours: any[]): any[] {
  const coursAvecProprietesUniques: any[] = [];

  // Créez un dictionnaire pour stocker les informations sur les cours
  const coursInfo: { [key: number]: any } = {};

  // Remplissez le dictionnaire avec les informations sur les cours
  for (const coursData of cours) {
    coursInfo[coursData.idCours] = coursData;
  }

  // Groupez les cartes par ID de cours et trouvez le maximum pour chaque groupe
  const groupedByCours: { [key: number]: any[] } = {};

  for (const carteEtat of carteEtats) {
    const idCours = carteEtat.idCours;
    if (idCours !== 0) { // Excluez les lignes où idCours = 0
      if (!groupedByCours[idCours]) {
        groupedByCours[idCours] = [];
      }
      groupedByCours[idCours].push(carteEtat);
    }
  }

  // Parcourez les groupes pour obtenir les propriétés uniques
  for (const idCours in groupedByCours) {
    if (groupedByCours.hasOwnProperty(idCours)) {
      const cartesEtatGroupe = groupedByCours[idCours];
      const carteMax = cartesEtatGroupe.reduce((maxCarte, carteEtat) => {
        if (carteEtat.idCarte > maxCarte.idCarte) {
          return carteEtat;
        }
        return maxCarte;
      });

      // Récupérez les informations du cours à partir du dictionnaire
      const coursInfoCours = coursInfo[Number(idCours)];

      coursAvecProprietesUniques.push({
        idCours: Number(idCours),
        isVosCours: carteMax.isVosCours,
        isActif: carteMax.isActif,
        isFinis: carteMax.isFinis,
        // Jointure Here
        nomCours: coursInfoCours.nomCours,
        lienVersCours: coursInfoCours.lienVersCours,
        commentaire: coursInfoCours.commentaire,
        videoVersCours: coursInfoCours.videoVersCours,
        dateDebutCours: coursInfoCours.dateDebutCours,
        dateFinCours: coursInfoCours.dateFinCours,
      });
    }
  }

  console.log('Liste des cartes:', coursAvecProprietesUniques);
  return coursAvecProprietesUniques;
}


associerCoursAuxListes(coursAvecProprietesUniques: any[]) {

  // Parcourez les cours uniques et placez-les dans les listes appropriées
  for (const cours of coursAvecProprietesUniques) {
    if (cours.isVosCours) {
      this.listecours.push(cours);
    } else if (cours.isActif) {
      this.actif.push(cours);
    } else if (cours.isFinis) {
      this.done.push(cours);
    }
  }
  return coursAvecProprietesUniques;
}

      
drop(event: CdkDragDrop<Cours[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    transferArrayItem(event.previousContainer.data,
                      event.container.data,
                      event.previousIndex,
                      event.currentIndex);
  }

  this.idCoursMoved = event.container.data[event.currentIndex]['idCours']
}

calculateScore() {
  const totalCours = this.listecours.length + this.done.length + this.actif.length; // Le nombre total de cours dans "Vos Cours"
  const finishedCours = this.done.length; // Le nombre de cours dans "Finis"
  this.score = Math.floor((finishedCours / totalCours) * 100);

  this.editConsultationComponent.consultationService.GetConsultant().subscribe(
  (consultants: Consultant[]) => {

    var consultantToUpdate = consultants.find((consultant) => consultant.idConsultant === this.connectedAs6);

    if (consultantToUpdate) {
      
      consultantToUpdate.score = this.score;
      
      this.editConsultationComponent.consultationService.PutConsultant(consultantToUpdate).subscribe(
        (updatedConsultant: Consultant) => {
          console.log('Score du Consultant mis à jour avec succès :', updatedConsultant);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du score du consultant :', error);
        }
      );
    } else {
      console.error('Consultant non trouvé avec l\'ID spécifié.');
    }
  }
);
this.AjoutCarteEtat();
}

ajouterModification(carteEtat: CarteEtat) {
  this.modifications.push(carteEtat);
}

AjoutCarteEtat() {
  this.OuEstLeCours();

  this.carteEtatToAdd = new CarteEtat(
    this.idCarte,
    this.connectedAs6,
    this.idCoursMoved,
    this.carteEtatToAdd.isVosCours,
    this.carteEtatToAdd.isActif,
    this.carteEtatToAdd.isFinis,
    this.score
  );

  this.ajouterModification(this.carteEtatToAdd);
}

EnregistrerModifications() {

  const dernieresModifications: Map<number, CarteEtat> = new Map();

  for (const modification of this.modifications) {
    dernieresModifications.set(modification.idCours, modification);
  }

  dernieresModifications.forEach((modification) => {
    this.coursService.PostCarteEtat(modification).subscribe(
      (carteEtatToAdd: CarteEtat) => {
        console.log('Valeurs de carte après enregistrement :', carteEtatToAdd);
      },
      (error) => {
        console.error('Erreur lors de l\'enregistrement de la carte :', error);
        console.log('Valeurs de carte lors de l\'erreur :', modification);
      }
    );
  });
  this.modifications = [];
}

OuEstLeCours(){
var coursTrouveListeCours = this.listecours.find(cours => cours.idCours === this.idCoursMoved);

var coursTrouveActif = this.actif.find(cours => cours.idCours === this.idCoursMoved);

var coursTrouveDone = this.done.find(cours => cours.idCours === this.idCoursMoved);

if (coursTrouveListeCours) {
  this.carteEtatToAdd.isVosCours = true;
  this.carteEtatToAdd.isActif = false;
  this.carteEtatToAdd.isFinis = false;
} else if (coursTrouveActif) {
  this.carteEtatToAdd.isVosCours = false;
  this.carteEtatToAdd.isActif = true;
  this.carteEtatToAdd.isFinis = false;
} else if (coursTrouveDone) {
  this.carteEtatToAdd.isVosCours = false;
  this.carteEtatToAdd.isActif = false;
  this.carteEtatToAdd.isFinis = true;
}
}
}
