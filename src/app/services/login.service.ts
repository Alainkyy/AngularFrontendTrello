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

  constructor(private http : HttpClient) { }

  public getConsultant() : Observable<Consultant[]>{
    return this.http.get<Consultant[]>(`${environment.apiURL}Consultant/liste`);
  }
}
