import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CoursService } from 'src/app/services/cours.service';
import { LoginService } from 'src/app/services/login.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cours } from '../../models/Cours';
import { Consultant } from '../../models/Consultant';
import { CardState } from '../../models/CardState';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.css']
})
export class CarteComponent implements OnInit {
  title = 'Trello Like';
  connectedAs4: string | null = null; //codeConsultant
  connectedAs3: number | null = null; //idSpecialite du Consultant
  totalcours: Cours[] = [];
  actif: Cours[] = [];
  done: Cours[] = [];
  cardStates: CardState[] = [];
  score: number = 0;

  constructor(
    private coursService: CoursService,
    private loginService: LoginService,
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}
    
ngOnInit(): void {
  this.connectedAs4 = this.loginService.getCodeConsultantConnecte();
  this.connectedAs3 = this.loginService.getIdSpecialiteConsultantConnecte();

  if (this.connectedAs3 !== null) {
    this.afficherTousLesCoursFiltre(this.connectedAs3);
  } else {
    console.log("L'ID de spécialité est null.");
  }

  if (this.connectedAs4 !== null) {
    console.log("Code Consultant :",this.connectedAs4);
  } else {
    console.log("Le CodeConsultant est null.");
  }
}

afficherTousLesCoursFiltre(idSpecialite: number) {
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
}

calculateScore() {
  const totalCours = this.totalcours.length + this.done.length + this.actif.length ; // Le nombre total de cours dans "Vos Cours"
  const finishedCours = this.done.length; // Le nombre de cours dans "Finis"
  this.score = (finishedCours / totalCours) * 100;
}


}