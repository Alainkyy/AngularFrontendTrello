import { Injectable } from '@angular/core';
import { CardState } from '../models/CarteEtat'

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  /*setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  setCardState(codeConsultant: string, cardStates: CardState[]): void {
    localStorage.setItem(`cardState_${codeConsultant}`, JSON.stringify(cardStates));
  }
  
  getCardState(codeConsultant: string): CardState | null {
    const localCardState = this.getItem<CardState>(`cardState_${codeConsultant}`);
    return localCardState;
  }
  
  updateLocalCardState(codeConsultant: string, cardState: CardState): void {
    // Mettez à jour l'état local des cartes
    const localCardState: CardState = this.getItem<CardState>(`cardState_${codeConsultant}`) || new CardState(0, false);
    localCardState.cardDone = cardState.cardDone;
  
    // Mettez à jour le localStorage
    this.setItem(`cardState_${codeConsultant}`, localCardState);
  }
  
  clear(): void {
    localStorage.clear();
  }*/
}
