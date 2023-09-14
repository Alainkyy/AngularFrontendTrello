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
  public carteEtats: CarteEtat[] = [];
  public connectedAs4: string | null = null; //codeConsultant
  public connectedAs3: number | null = null; //idSpecialite du Consultant
  public connectedAs5: number | null = null; //score du Consultant
  public connectedAs6: any | null = null; //idConsultant du Consultant
  public infoCours : Cours [] = []; // Tout les cours
  public listecours: Cours[] = []; // Cours filtré
  public actif: Cours[] = [];
  public done: Cours[] = [];
  
  public score: number = 0;
  public idCoursMoved : number = 0;
  public consultants: Consultant[] = [];
  public idCarte: number = 0;
  public carteEtatToAdd: CarteEtat = new CarteEtat();
  public modifications: CarteEtat[] = [];
  public carteEtatToAdd2: CarteEtat = new CarteEtat();
    
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
    // this.afficherTousLesCoursFiltre(this.connectedAs3);
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
  this.afficherTousLesCours();

  
  if (!this.carteEtatToAdd && !this.carteEtatToAdd2) {

  
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
        console.log("Premiere Connexion !");
      this.afficherTousLesCoursFiltre(this.connectedAs3)
      }
    } else {
    console.log('Chargement des infoCours:', this.infoCours);
    console.log('Chargement des carteEtats:', this.carteEtats);
 

    const coursAvecProprietesUniques = this.getUniqueCoursProperties(this.carteEtats, this.infoCours);
    this.associerCoursAuxListes(coursAvecProprietesUniques);

    const totalCours = this.listecours.length + this.done.length + this.actif.length;
    const finishedCours = this.done.length;
    this.score = totalCours !== 0 ? Math.floor((finishedCours / totalCours) * 100) : 0;
  }
    return this.carteEtats;
  });}
  else {
    this.carteEtats.push({ ...this.carteEtatToAdd });
    this.carteEtats.push({ ...this.carteEtatToAdd2 });

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
          console.log("Premiere Connexion !");
        this.afficherTousLesCoursFiltre(this.connectedAs3)
        }
      } else {
      console.log('Chargement des infoCours:', this.infoCours);
      console.log('Chargement des carteEtats:', this.carteEtats);
   
  
      const coursAvecProprietesUniques = this.getUniqueCoursProperties(this.carteEtats, this.infoCours);
      this.associerCoursAuxListes(coursAvecProprietesUniques);
  
      const totalCours = this.listecours.length + this.done.length + this.actif.length;
      const finishedCours = this.done.length;
      this.score = totalCours !== 0 ? Math.floor((finishedCours / totalCours) * 100) : 0;
    }
      return this.carteEtats;
    });
  }
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
  this.coursService.getCours().subscribe((result: Cours[]) => {
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
  this.OuEstLeCours(this.idCoursMoved);

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
  // Ajoutez la logique pour localiser le cours ici en utilisant la même logique qu'OuEstLeCours
  this.carteEtats.push({ ...this.carteEtatToAdd });
  this.carteEtats.push({ ...this.carteEtatToAdd2 });
  this.AjoutCarteEtat();
  this.carteEtats.push({ ...this.carteEtatToAdd });
  this.carteEtats.push({ ...this.carteEtatToAdd2 });
  const dernieresModifications: Map<number, CarteEtat> = new Map();

  for (const modification of this.modifications) {
    dernieresModifications.set(modification.idCours, modification);
  }

  dernieresModifications.forEach((modification) => {
    // Utilisez modification.idCours pour localiser le cours en cours de traitement
    const { isVosCours, isActif, isFinis } = this.OuEstLeCours(modification.idCours);

    modification.isVosCours = isVosCours;
    modification.isActif = isActif;
    modification.isFinis = isFinis;

    this.coursService.PostCarteEtat(this.carteEtatToAdd).subscribe(
      (carteEtats: CarteEtat) => {
        console.log('Valeurs de carte après enregistrement :', carteEtats);
        this.carteEtats.push({ ...this.carteEtatToAdd }); // Ajoutez la mise à jour à carteEtats
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de CarteEtat :', error);
      }
    );
  });

  this.modifications = [];
}


OuEstLeCours(idCoursMoved: number){
  let isVosCours = false;
  let isActif = false;
  let isFinis = false;

  if (this.listecours.find(cours => cours.idCours === this.idCoursMoved)) {
    this.carteEtatToAdd.isVosCours = true;
    this.carteEtatToAdd.isActif = false;
    this.carteEtatToAdd.isFinis = false;

  } else if (this.actif.find(cours => cours.idCours === this.idCoursMoved)) {
    this.carteEtatToAdd.isVosCours = false;
    this.carteEtatToAdd.isActif = true;
    this.carteEtatToAdd.isFinis = false;
    
  } else if (this.done.find(cours => cours.idCours === this.idCoursMoved)) {
    this.carteEtatToAdd.isVosCours = false;
    this.carteEtatToAdd.isActif = false;
    this.carteEtatToAdd.isFinis = true;
  }
  this.carteEtats.push({ ...this.carteEtatToAdd });
  return { isVosCours, isActif, isFinis };
  }

  resetCours() {

    // Vider les listes
    this.listecours = [];
    this.actif = [];
    this.done = [];

    this.coursService.DeleteCarteEtat(this.connectedAs6).subscribe(() => {
      console.log("Cartes Etat supprimées avec succès !");
    }, (error) => {
      console.error("Erreur lors de la suppression des cartesEtats :", error);
    });
  
    
  
    // Recharger les cours sur listecours
    if (this.connectedAs3 !== null) {
      console.log("Reset Success !");
      this.afficherTousLesCoursFiltre(this.connectedAs3);
    }
  
    // Créer et ajouter les enregistrements CarteEtat pour chaque cours
    this.listecours.forEach(cours => {
        this.carteEtatToAdd2.idCarte = this.idCarte + 1;
        this.carteEtatToAdd2.idConsultant = this.connectedAs6;
        this.carteEtatToAdd2.idCours = cours.idCours;
        this.carteEtatToAdd2.isVosCours = true;
        this.carteEtatToAdd2.isActif = false;
        this.carteEtatToAdd2.isFinis = false;
        this.carteEtatToAdd2.scoreEtat = 0;

    this.coursService.PostCarteEtat(this.carteEtatToAdd2).subscribe(
      (carteEtats: CarteEtat) => {
        console.log('Valeurs de carte après enregistrement :', carteEtats);
        this.carteEtats.push({ ...this.carteEtatToAdd2}); // Ajoutez la mise à jour à carteEtats
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de CarteEtat :', error);
      }
    );
  });
  

  this.carteEtats.push({ ...this.carteEtatToAdd2 });
console.log(this.carteEtats);
}


  recharger(){ 
    this.ngOnInit();
  }
}
