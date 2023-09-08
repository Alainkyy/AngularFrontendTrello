export class CarteEtat {
    constructor(
      public idCours: number,
      public isVosCours: boolean,
      public isActif: boolean,
      public isFinis: boolean,
      public idConsultant: number,
      public scoreEtat: number,
    ) {}
  }