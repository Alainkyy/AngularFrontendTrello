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
    this.afficherTousLesCoursFiltre(this.connectedAs3);
  } else {
    console.log("L'ID de spécialité est null.");
  }

  // Recupere le codeConsultant du Consultant connecté
  if (this.connectedAs4 !== null) {
    console.log("Code Consultant :",this.connectedAs4);
  } else {
    console.log("Le CodeConsultant est null.");
  }

  // Recupere le score du Consultant connecté
  if (this.connectedAs5 !== null) {
  } else {
    console.log("Le Score est null.");
  }

  // Recupere le score du Consultant connecté
  if (this.connectedAs6 !== null) {
    this.afficherTousLesEtatsFiltre(this.connectedAs6);
  } else {
    console.log("L'idConsultant est null.");
  }

}

public afficherTousLesEtatsFiltre(connectedAs6: number) {
  this.coursService.GetCarteEtat().subscribe((result: any[]) => {
    this.carteEtats = result
      .filter(carteEtatData => carteEtatData.IdConsultant === connectedAs6)
      .map(carteEtatData => new CarteEtat(
        carteEtatData.idCarte,
        carteEtatData.idConsultant,
        carteEtatData.idCours,
        carteEtatData.isVosCours,
        carteEtatData.isActif,
        carteEtatData.isFinis,
        carteEtatData.scoreEtat
      ));
  });
}

public afficherTousLesCoursFiltre(idSpecialite: number) {
  this.coursService.getCours().subscribe((result: any[]) => {
    this.listecours = result
      .filter(coursData => coursData.idSpecialite === idSpecialite)
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
  for (const modification of this.modifications) {
    this.coursService.PostCarteEtat(modification).subscribe(
      (carteEtatToAdd: CarteEtat) => {
        console.log('Valeurs de carte après enregistrement :', carteEtatToAdd);
      },
      (error) => {
        console.error('Erreur lors de l\'enregistrement de la carte :', error);
        console.log('Valeurs de carte lors de l\'erreur :', modification);
      }
    );
  }
  
  // Effacer toutes les modifications après enregistrement
  this.modifications = [];
}

OuEstLeCours(){
  // Recherchez dans listecours
var coursTrouveListeCours = this.listecours.find(cours => cours.idCours === this.idCoursMoved);

// Recherchez dans actif
var coursTrouveActif = this.actif.find(cours => cours.idCours === this.idCoursMoved);

// Recherchez dans done
var coursTrouveDone = this.done.find(cours => cours.idCours === this.idCoursMoved);

// Maintenant, vous pouvez vérifier pour chaque liste
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
