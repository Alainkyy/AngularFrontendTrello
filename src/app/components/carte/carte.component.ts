import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  totalcours: Cours[] = [];
  actif: Cours[] = [];
  done: Cours[] = [];
  cardStates: CarteEtat[] = [];
  score: number = 0;
  idCoursMoved : number = 0;
  public consultants: Consultant[] = [];
  public carteEtatToAdd: CarteEtat = new CarteEtat();
    
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
    this.totalcours = result
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
  const totalCours = this.totalcours.length + this.done.length + this.actif.length; // Le nombre total de cours dans "Vos Cours"
  const finishedCours = this.done.length; // Le nombre de cours dans "Finis"
  this.score = Math.floor((finishedCours / totalCours) * 100);

  // Obtenez la liste de tous les consultants
  this.editConsultationComponent.consultationService.GetConsultant().subscribe(
  (consultants: Consultant[]) => {
    // Recherchez le consultant spécifique par son ID
    var consultantToUpdate = consultants.find((consultant) => consultant.idConsultant === this.connectedAs6);

    if (consultantToUpdate) {
      // Modifiez le score du consultant
      consultantToUpdate.score = this.score;

      // Mettez à jour le consultant spécifique en appelant la méthode PutConsultant avec le consultant modifié
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

this.carteEtatToAdd = new CarteEtat(
  undefined, // Laissez IdCarte à null, car il sera généré par le serveur
  this.connectedAs6,
  this.idCoursMoved,
  undefined, // Laissez isVosCours à null pour l'instant
  undefined, // Laissez isActif à null pour l'instant
  undefined, // Laissez isFinis à null pour l'instant
  this.score
);
console.log('Valeurs de carte avant envoi :', this.carteEtatToAdd);

this.coursService.PostCarteEtat(this.carteEtatToAdd).subscribe(
  (carteEtatToAdd: CarteEtat) => {
    console.log('Carte enregistrée :', carteEtatToAdd);

    // Mettez à jour carteEtatToAdd avec les valeurs retournées (si nécessaire)
    this.carteEtatToAdd = carteEtatToAdd;

    console.log('Valeurs de carte après enregistrement :', this.carteEtatToAdd);
  },
  (error) => {
    console.error('Erreur lors de l\'enregistrement de la carte :', error);
    console.log('Valeurs de carte lors de l\'erreur :', this.carteEtatToAdd);
  });
}
}
