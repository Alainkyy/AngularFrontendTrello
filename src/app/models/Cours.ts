export class Cours {
    constructor(
      public IdCours: number,
      public NomCours: string,
      public IdNiveau: number,
      public LienVersCours: string,
      public VideoVersCours: string,
      public Exercice: string,
      public Avancement: number,
      public DateDebutCours: Date,
      public DateFinCours: Date,
      public Commentaire: string
    ) {}
  }
  