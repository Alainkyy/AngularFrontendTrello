import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-header-section',
  templateUrl: './header-section.component.html',
  styleUrls: ['./header-section.component.css']
})
export class HeaderSectionComponent implements OnInit {
  isLoginVisible = false;
  connectedAs: string | null = null; //nomConsultant
  connectedAs2: string | null = null; //statutConsultant
  connectedAs3: number | null = null; //idSpecialite du Consultant
  connectedAs4: string | null = null; //codeConsultant
  connectedAs5: number | null = null; //score du Consultant
  connectedAs6: number | null = null; //idConsultant du Consultant
  isAdmin: boolean = false;
  isFormation: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private cd: ChangeDetectorRef 
  ) {}

  onAuthClick() {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.connectedAs = this.loginService.getNomConsultantConnecte();
    this.connectedAs2 = this.loginService.getStatutConsultantConnecte();
    this.connectedAs3 = this.loginService.getIdSpecialiteConsultantConnecte();
    this.connectedAs4 = this.loginService.getCodeConsultantConnecte();
    this.connectedAs5 = this.loginService.getScoreConsultantConnecte();
    this.connectedAs6 = this.loginService.getIdConsultantConsultantConnecte();

    this.isAdmin = this.connectedAs2 === 'Admin';
    this.isFormation = this.connectedAs2 === 'Formation';
  }

  deconnexion(): void {
    this.loginService.deconnexion();
    this.connectedAs = null;
    this.loginService.openSuccessSnackBar();
    this.loginService.resetStatus();
    this.cd.detectChanges();

    setTimeout(() => {
      this.router.navigate(['/home']);
      window.location.reload();
    }, 900);
  }
}
