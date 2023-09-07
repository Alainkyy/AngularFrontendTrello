import { Injectable } from '@angular/core';
import { Axe } from '../models/Axe';
import { Specialite } from '../models/Specialite';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AxeService {
  private url = environment.apiURL;

  constructor(private http : HttpClient) { }

  public getAxe() : Observable<Axe[]>{
    return this.http.get<Axe[]>(`${environment.apiURL}Axe/liste`);
  }

  public getSpecialite() : Observable<Specialite[]>{
    return this.http.get<Specialite[]>(`${environment.apiURL}Specialite/liste`);
  }
}