import { ChangeDetectorRef, Component, OnInit, AfterViewInit  } from '@angular/core';
import { Consultant } from '../../models/Consultant';
import { LoginService } from 'src/app/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {
  consultants: Consultant[] = [];
  username: string = ''; 
  password: string = ''; 

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loginService.getConsultant().subscribe((data: Consultant[]) => {
      this.consultants = data;
      console.log('Liste Consultants:', this.consultants);
      for (let i = 0; i < data.length; i++) {
        const currentRow = data[i];
        console.log('CodeConsultant de la ligne', i + 1, ':', currentRow.codeConsultant);
        console.log('MDPConsultant de la ligne', i + 1, ':', currentRow.mdpConsultant !== undefined ? currentRow.mdpConsultant : 'Valeur non définie ou nulle');
      }
      
    });
  }
  
  onLoginSubmit(): void {
    if (this.username && this.password) {
      const Consultant = this.consultants[0]; // Supposons que vous utilisez la première ligne de la table
      if (this.username === Consultant.codeConsultant && this.password === Consultant.mdpConsultant) {
        console.log('Success');
        this.router.navigate(['/home']); 
      } else {
        console.log('Fail');
      }
    } else {
      console.log('Veuillez remplir les champs username et password.');
    }
  }
}

