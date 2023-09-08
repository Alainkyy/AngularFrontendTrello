import { Injectable } from '@angular/core';
import { Consultant } from '../models/Consultant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {
  private url = environment.apiURL;

  constructor(private http : HttpClient) { }

  public GetConsultant() : Observable<Consultant[]>{
    return this.http.get<Consultant[]>(`${environment.apiURL}Consultant/liste`);
  }

  public PostConsultant(consultant: Consultant): Observable<Consultant> {
    return this.http.post<Consultant>(`${environment.apiURL}Consultant/ajouter`, consultant);
  }

  public PutConsultant(consultant: Consultant): Observable<Consultant> {
    return this.http.put<Consultant>(`${environment.apiURL}Consultant/modifier/${consultant.idConsultant}`, consultant);
  }

  public DeleteConsultant(idConsultant: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiURL}Consultant/supprimer/${idConsultant}`);
  }
}
