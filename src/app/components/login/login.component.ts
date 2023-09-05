import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Consultant } from '../../models/Consultant';
import { LoginService } from 'src/app/services/login.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  consultants: any[] = [];

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    //private sharedService: SharedService,
    private cd: ChangeDetectorRef
  ) {}

ngOnInit(): void {
  this.route.queryParamMap.subscribe(params => {
      this.afficherTousLesConsultants();
  })};

  afficherTousLesConsultants() {
    this.loginService.getConsultant().subscribe((result: any[]) => {
      this.consultants = result.map(ConsultantData => new Consultant(
        ConsultantData.idConsultant,
        ConsultantData.nomConsultant,
        ConsultantData.codeConsultant,
        ConsultantData.statutConsultant,
        ConsultantData.mDPConsultant,
        ConsultantData.idAxe,
        ConsultantData.idSpecialite,
        ConsultantData.score
      ));
      console.log('Liste des consultants:', this.consultants);
  });
}
}
