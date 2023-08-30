import { Injectable } from '@angular/core';
import { Axe } from '../models/Axe';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AxeService {

  /*private url = environment.apiURL;

  constructor(private http : HttpClient) { }

  public getAxe() : Observable<Axe[]>{
    return this.http.get<Axe[]>(`${environment.apiURL}/Axe`);
  }*/
    constructor() { }
  
    public getAxe() : Axe[]{
      let axe = new Axe(0, "Nouvelles Technologies", 5);
  
      return [axe];
    }
}