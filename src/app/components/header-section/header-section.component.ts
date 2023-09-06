import { Component, OnInit } from '@angular/core';
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
  connectedAs: string | null = null;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  onAuthClick() {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.connectedAs = this.loginService.getNomConsultantConnecte();
  }

  deconnexion(): void {
    this.loginService.deconnexion();
    this.connectedAs = null;
    this.router.navigate(['/home']);
    this.loginService.openSuccessSnackBar();
  }
}
