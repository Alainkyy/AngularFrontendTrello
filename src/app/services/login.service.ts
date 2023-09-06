import { Injectable } from '@angular/core';
import { Consultant } from '../models/Consultant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = environment.apiURL;
  private codeConsultantConnecte: string | null = null;

  constructor(private http : HttpClient) { }

  setCodeConsultantConnecte(code: string): void {
    this.codeConsultantConnecte = code;
  }

  getCodeConsultantConnecte(): string | null {
    return this.codeConsultantConnecte;
  }

  public getConsultant() : Observable<Consultant[]>{
    return this.http.get<Consultant[]>(`${environment.apiURL}Consultant/liste`);
  }
}
