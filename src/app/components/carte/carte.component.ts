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

  public idCours0 : number = 0;
  public NIKMOK = 0;
    
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
  this.coursService.getCours().subscribe((result: Cours[]) => {
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
  // On calcule le Score
  const totalCours = this.listecours.length + this.done.length + this.actif.length; 
  const finishedCours = this.done.length; 
  this.score = Math.floor((finishedCours / totalCours) * 100);


  // Et on met a jour sur le table Consultant
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

ajouterModification(carteEtatToAdd: CarteEtat) {
  this.modifications.push(carteEtatToAdd);
}

public AjoutCarteEtat() {
  // j'appelle OuEstLeCours qui a la localisation du cours et je stock dans coursInfo
  const coursInfo = this.OuEstLeCours(this.idCoursMoved);

  // Créer un nouvel objet CarteEtat en ajoutant les valeurs obtenues
  this.carteEtatToAdd = new CarteEtat(
    this.idCarte,
    this.connectedAs6,
    this.idCoursMoved,
    this.carteEtatToAdd.isVosCours,
    this.carteEtatToAdd.isActif,
    this.carteEtatToAdd.isFinis,
    this.score
  );

  // Ajouter la modification
  this.ajouterModification(this.carteEtatToAdd);
}

EnregistrerModifications() {
  // Supprimer les ajouts précédents des cartes si nécessaire
  this.carteEtats = [];

  // Ajouter les nouvelles cartes
  this.carteEtats.push(this.carteEtatToAdd);

  // Compter le nombre total de cours
  const nbTotalDesCours = this.listecours.length + this.done.length + this.actif.length;

  // Créer un ensemble de cartes ajoutées pour suivre les idCours déjà ajoutés
  const cartesAjoutees = new Set<number>();

  // Ajouter les modifications à partir de la liste modifications
  this.modifications.forEach((modification) => {
    // Utilisez modification.idCours pour localiser le cours en cours de traitement
    const { isVosCours, isActif, isFinis } = this.OuEstLeCours(modification.idCours);

    modification.isVosCours = isVosCours;
    modification.isActif = isActif;
    modification.isFinis = isFinis;

    if (this.NIKMOK === 1) {
      modification.isVosCours = true;
      modification.isVosCours = false;
      modification.isVosCours = false;
    } else if (this.NIKMOK === 2) {
      modification.isActif = false;
      modification.isVosCours = true;
      modification.isVosCours = false;
    } else if (this.NIKMOK === 3) {
      modification.isFinis = false;
      modification.isVosCours = false;
      modification.isVosCours = true;
    }

    // Ajouter l'idCours à l'ensemble des cartes ajoutées
    cartesAjoutees.add(modification.idCours);

    // Effectuer un POST pour chaque modification
    this.coursService.PostCarteEtat(modification).subscribe(
      (carteEtats: CarteEtat) => {
        console.log('Valeurs de carte après enregistrement :', modification);
        this.carteEtats.push(modification); // Ajoutez la mise à jour à carteEtats
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de CarteEtat :', error);
      }
    );
  });

  // Vérifier si toutes les cartes de cours ont été ajoutées
  for (const carteCours of this.listecours) {
    if (!cartesAjoutees.has(carteCours.idCours)) {
      console.log(`La carte du cours ${carteCours.idCours} n'a pas été touchée`);
      const { isVosCours, isActif, isFinis } = this.OuEstLeCours(carteCours.idCours);

      // Créer une nouvelle CarteEtat avec les informations manquantes
      const nouvelleCarte = new CarteEtat(
        this.idCarte, // Vous pouvez définir l'idCarte comme vous le souhaitez
        this.connectedAs6,
        carteCours.idCours,
        isVosCours,
        isActif,
        isFinis,
        this.score
      );

      // Effectuer un POST pour ajouter la carte manquante
      this.coursService.PostCarteEtat(nouvelleCarte).subscribe(
        (carteEtats: CarteEtat) => {
          console.log(`Carte ajoutée pour le cours ${carteCours.idCours}`);
          this.carteEtats.push(carteEtats); // Ajoutez la mise à jour à carteEtats
        },
        (error) => {
          console.error(`Erreur lors de l'ajout de la carte pour le cours ${carteCours.idCours}:`, error);
        }
      );
    }
  }



  // Vérifier si toutes les cartes de cours ont été ajoutées
  for (const carteCours of this.actif) {
    if (!cartesAjoutees.has(carteCours.idCours)) {
      console.log(`La carte du cours ${carteCours.idCours} n'a pas été touchée`);
      const { isVosCours, isActif, isFinis } = this.OuEstLeCours(carteCours.idCours);

      // Créer une nouvelle CarteEtat avec les informations manquantes
      const nouvelleCarte = new CarteEtat(
        this.idCarte, // Vous pouvez définir l'idCarte comme vous le souhaitez
        this.connectedAs6,
        carteCours.idCours,
        isVosCours,
        isActif,
        isFinis,
        this.score
      );

      // Effectuer un POST pour ajouter la carte manquante
      this.coursService.PostCarteEtat(nouvelleCarte).subscribe(
        (carteEtats: CarteEtat) => {
          console.log(`Carte ajoutée pour le cours ${carteCours.idCours}`);
          this.carteEtats.push(carteEtats); // Ajoutez la mise à jour à carteEtats
        },
        (error) => {
          console.error(`Erreur lors de l'ajout de la carte pour le cours ${carteCours.idCours}:`, error);
        }
      );
    }
  }

  // Vérifier si toutes les cartes de cours ont été ajoutées
  for (const carteCours of this.done) {
    if (!cartesAjoutees.has(carteCours.idCours)) {
      console.log(`La carte du cours ${carteCours.idCours} n'a pas été touchée`);
      const { isVosCours, isActif, isFinis } = this.OuEstLeCours(carteCours.idCours);

      // Créer une nouvelle CarteEtat avec les informations manquantes
      const nouvelleCarte = new CarteEtat(
        this.idCarte, // Vous pouvez définir l'idCarte comme vous le souhaitez
        this.connectedAs6,
        carteCours.idCours,
        isVosCours,
        isActif,
        isFinis,
        this.score
      );

      // Effectuer un POST pour ajouter la carte manquante
      this.coursService.PostCarteEtat(nouvelleCarte).subscribe(
        (carteEtats: CarteEtat) => {
          console.log(`Carte ajoutée pour le cours ${carteCours.idCours}`);
          this.carteEtats.push(carteEtats); // Ajoutez la mise à jour à carteEtats
        },
        (error) => {
          console.error(`Erreur lors de l'ajout de la carte pour le cours ${carteCours.idCours}:`, error);
        }
      );
    }
  }


  // Effacer les modifications après l'ajout
  this.modifications = [];
}





public OuEstLeCours(idCoursMoved: number) {
  let isVosCours = false;
  let isActif = false;
  let isFinis = false;
  let NIKMOK = 0;

  if (this.listecours.find(cours => cours.idCours === idCoursMoved)) {
    isVosCours = true;
    isActif = false;
    isFinis = false;
    console.log("Le cours se trouve dans 1" + isVosCours + "-" + isActif + "-" + isFinis);
    NIKMOK = 1;
  } else if (this.actif.find(cours => cours.idCours === idCoursMoved)) {
    isVosCours = false;
    isActif = true;
    isFinis = false;
    console.log("Le cours se trouve dans 2" + isVosCours + "-" + isActif + "-" + isFinis);
    NIKMOK = 2;
  } else if (this.done.find(cours => cours.idCours === idCoursMoved)) {
    isVosCours = false;
    isActif = false;
    isFinis = true;
    console.log("Le cours se trouve dans 3" + isVosCours + "-" + isActif + "-" + isFinis);
    NIKMOK = 3;
  }
  
  return { isVosCours, isActif, isFinis };
}

  deleteCartesByIdConsultant(idConsultant: number) {
    const cartesASupprimer = this.carteEtats.filter(carte => carte.idConsultant === idConsultant);
    
    for (const carte of cartesASupprimer) {
      this.coursService.DeleteCarteEtat(carte.idCarte).subscribe(
        () => {
          // Suppression réussie, vous pouvez effectuer des actions supplémentaires si nécessaire
          console.log(`CarteEtat avec idCarte ${carte.idCarte} supprimée avec succès.`);
        },
        (error) => {
          console.error(`Erreur lors de la suppression de CarteEtat avec idCarte ${carte.idCarte}:`, error);
        }
      );
    }
  }

  supprimerles0(idCours0 : number){
    const cartesBuggerASupprimer = this.carteEtats.filter(carte => carte.idCours === idCours0);

    for (const carte of cartesBuggerASupprimer) {
      this.coursService.DeleteCarteEtat(carte.idCarte).subscribe(
        () => {
          // Suppression réussie, vous pouvez effectuer des actions supplémentaires si nécessaire
          console.log(`CarteEtat avec idCarte ${carte.idCarte} supprimée avec succès.`);
        },
        (error) => {
          console.error(`Erreur lors de la suppression de CarteEtat avec idCarte ${carte.idCarte}:`, error);
        }
      );
    }
  }

  resetCours() {

    // Vider les listes
    this.listecours = [];
    this.actif = [];
    this.done = [];

    this.deleteCartesByIdConsultant(this.connectedAs6);
  
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

        if (this.carteEtatToAdd2.idCours == 0 ){
          this.supprimerles0(this.carteEtatToAdd2.idCours);
        } 

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
     // Vider les listes
     this.listecours = [];
     this.actif = [];
     this.done = [];
    this.ngOnInit();
  }

  
  simulerClic() {
    const bouton = document.getElementById('enregistrer-button');
    
    if (bouton !== null) {
      bouton.click();
    }
  }
}