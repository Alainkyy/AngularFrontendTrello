import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  // Méthode pour stocker l'état des cartes dans le localStorage
  setCardState(codeConsultant: string, cardState: any): void {
    localStorage.setItem(`cardState_${codeConsultant}`, JSON.stringify(cardState));
  }

  // Méthode pour récupérer l'état des cartes depuis le localStorage
  getCardState(codeConsultant: string): any | null {
    const cardState = localStorage.getItem(`cardState_${codeConsultant}`);
    return cardState ? JSON.parse(cardState) : null;
  }

  // Méthode pour supprimer l'état des cartes du localStorage
  removeCardState(codeConsultant: string): void {
    localStorage.removeItem(`cardState_${codeConsultant}`);
  }

  // Méthode pour vider complètement le localStorage
  clear(): void {
    localStorage.clear();
  }
}
