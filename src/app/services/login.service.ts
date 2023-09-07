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

    public getConsultant() : Observable<Consultant[]>{
      return this.http.get<Consultant[]>(`${environment.apiURL}Consultant/liste`);
    }
    
// nomConsultant
public setNomConsultantConnecte(nom: string): void {
    this.nomConsultantConnecte = nom;
  }

  public getNomConsultantConnecte(): string | null {
    return this.nomConsultantConnecte;
    this.indiceConnexion = true;
  }
// statutConsultant
public setStatutConsultantConnecte(statut: string): void {
    this.statutConsultantConnecte = statut;
  }

  public getStatutConsultantConnecte(): string | null {
    this.indiceConnexion = true;
    return this.statutConsultantConnecte;
  }
// codeConsultant
public setCodeConsultantConnecte(code: string): void {
  this.codeConsultantConnecte = code;
}

public getCodeConsultantConnecte(): string | null {
  return this.codeConsultantConnecte;
}
// idSpecialite
public setIdSpecialiteConsultantConnecte(idSpe: number): void {
    this.idSpecialiteConsultantConnecte = idSpe;
  }

  public getIdSpecialiteConsultantConnecte(): number | null {
    return this.idSpecialiteConsultantConnecte;
  }

  public deconnexion(): void {
    this.indiceConnexion = false;
    this.isAdmin = false;
    this.isFormation = false;
    this.router.navigate(['/home']);
  }

  public resetStatus(): void {
    this.isAdmin = false;
    this.isFormation = false;
  }

  public openSuccessSnackBar(){
    this.snackBar.open("Deconnexion Reussis", "OK", {
      duration: 3000,
      panelClass: ['green-snackbar', 'login-snackbar'],
      verticalPosition: 'top',
     });
    }

    public openFailureSnackBar(){
    this.snackBar.open("Nom d'utilisateur ou Mot de Passe Incorrect", "Veuillez Réessayer !", {
      duration: 3000,
      panelClass: ['red-snackbar','login-snackbar'],
      verticalPosition: 'top',
      });
     }
}

