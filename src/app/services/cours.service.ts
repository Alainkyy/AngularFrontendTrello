import { Injectable } from '@angular/core';
import { Cours } from '../models/Cours';
import { CarteEtat } from '../models/CarteEtat'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursService {
  private url = environment.apiURL;

  constructor(private http : HttpClient) { }

  public getCours() : Observable<Cours[]>{
    return this.http.get<Cours[]>(`${environment.apiURL}Cours/liste`);
  }

  public GetCarteEtat() : Observable<CarteEtat[]>{
    return this.http.get<CarteEtat[]>(`${environment.apiURL}CarteEtat/liste`);
  }

  public PostCarteEtat(carteEtat: CarteEtat): Observable<CarteEtat> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', // Définir le type de média comme JSON
      }),
    };

    const carteEtatToAdd = {
      idCarte: carteEtat.idCarte,
      idConsultant: carteEtat.idConsultant,
      idCours: carteEtat.idCours,
      isVosCours: carteEtat.isVosCours,
      isActif: carteEtat.isActif,
      isFinis: carteEtat.isFinis,
      scoreEtat: carteEtat.scoreEtat,
    };
    
   return this.http.post<CarteEtat>(
    `${environment.apiURL}CarteEtat/ajouter`,
    carteEtatToAdd,
    httpOptions // Utiliser les options HTTP pour spécifier le Content-Type
  );
  }

  public PutCarteEtat(carteEtat: CarteEtat): Observable<CarteEtat> {
    return this.http.put<CarteEtat>(`${environment.apiURL}CarteEtat/modifier/${carteEtat.idCarte}`, carteEtat);
  }

  public DeleteCarteEtat(idCarte: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiURL}CarteEtat/supprimer/${idCarte}`);
  }

}
