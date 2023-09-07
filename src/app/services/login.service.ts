import { Injectable } from '@angular/core';
import { Consultant } from '../models/Consultant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = environment.apiURL;
  private codeConsultantConnecte: string | null = null;
  private nomConsultantConnecte: string | null = null;
  private statutConsultantConnecte: string | null = null;
  private idSpecialiteConsultantConnecte: number | null = null;
  indiceConnexion: boolean = false;
  isAdmin: boolean = false;
  isFormation: boolean = false;

  constructor(
    private http : HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
    ) { }

// nomConsultant
  setNomConsultantConnecte(nom: string): void {
    this.nomConsultantConnecte = nom;
  }

  getNomConsultantConnecte(): string | null {
    return this.nomConsultantConnecte;
    this.indiceConnexion = true;
  }
// statutConsultant
  setStatutConsultantConnecte(statut: string): void {
    this.statutConsultantConnecte = statut;
  }

  getStatutConsultantConnecte(): string | null {
    this.indiceConnexion = true;
    return this.statutConsultantConnecte;
  }
// codeConsultant
  setCodeConsultantConnecte(code: string): void {
    this.codeConsultantConnecte = code;
  }

  getCodeConsultantConnecte(): string | null {
    return this.codeConsultantConnecte;
  }
// idSpecialite
  setIdSpecialiteConsultantConnecte(idSpe: number): void {
    this.idSpecialiteConsultantConnecte = idSpe;
  }

  getIdSpecialiteConsultantConnecte(): number | null {
    return this.idSpecialiteConsultantConnecte;
  }

  deconnexion(): void {
    this.indiceConnexion = false;
    this.isAdmin = false;
    this.isFormation = false;
    this.router.navigate(['/home']);
  }

  resetStatus(): void {
    this.isAdmin = false;
    this.isFormation = false;
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

