export class CarteEtat {
    constructor(
      public idCarte: number = 0,
      public idConsultant: number = 0,
      public idCours: number = 0,
      public isVosCours: boolean = false,
      public isActif: boolean = false,
      public isFinis: boolean = false,
      public scoreEtat: number = 0,
    ) {}
  }