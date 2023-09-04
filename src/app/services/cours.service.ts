import { Injectable } from '@angular/core';
import { Cours } from '../models/Cours';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursService {
  private url = environment.apiURL;

  constructor(private http : HttpClient) { }

  public getCours() : Observable<Cours[]>{
    return this.http.get<Cours[]>(`${environment.apiURL}Cours/liste`);
  }
}
