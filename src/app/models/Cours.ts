export class Cours {
    constructor(
      public idCours: number,
      public nomCours: string,
      public lienVersCours: string,
      public videoVersCours: string,
      public exercice: string,
      public avancement: number,
      public dateDebutCours: Date,
      public dateFinCours: Date,
      public commentaire: string,
      public idSpecialite:number
    ) {}
  }
  