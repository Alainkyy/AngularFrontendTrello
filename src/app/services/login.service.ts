import { Injectable } from '@angular/core';
import { Consultant } from '../models/Consultant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = environment.apiURL;
  private codeConsultantConnecte: string | null = null;
  private nomConsultantConnecte: string | null = null;
  indiceConnexion: boolean = false;

  constructor(
    private http : HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
    ) { }

  setNomConsultantConnecte(nom: string): void {
    this.nomConsultantConnecte = nom;
  }

  getNomConsultantConnecte(): string | null {
    return this.nomConsultantConnecte;
    this.indiceConnexion = true;
  }

  setCodeConsultantConnecte(code: string): void {
    this.codeConsultantConnecte = code;
  }

  getCodeConsultantConnecte(): string | null {
    return this.codeConsultantConnecte;
  }

  deconnexion(): void {
    this.indiceConnexion = false;
    this.router.navigate(['/home']);
  }

  public getConsultant() : Observable<Consultant[]>{
    return this.http.get<Consultant[]>(`${environment.apiURL}Consultant/liste`);
  }

  openSuccessSnackBar(){
    this.snackBar.open("Deconnexion Reussis", "OK", {
      duration: 3000,
      panelClass: ['green-snackbar', 'login-snackbar'],
      verticalPosition: 'top',
     });
    }//Snackbar that opens with failure background
    openFailureSnackBar(){
    this.snackBar.open("Nom d'utilisateur ou Mot de Passe Incorrect", "Veuillez Réessayer !", {
      duration: 3000,
      panelClass: ['red-snackbar','login-snackbar'],
      verticalPosition: 'top',
      });
     }
}

