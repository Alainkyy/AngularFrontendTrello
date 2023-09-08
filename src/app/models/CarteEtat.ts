export class CarteEtat {
    constructor(
      public IdCarte: number,
      public IdCours: number,
      public IsVosCours: boolean,
      public IsActif: boolean,
      public IsFinis: boolean,
      public IdConsultant: number,
      public ScoreEtat: number,
    ) {}
  }