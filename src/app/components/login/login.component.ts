import { ChangeDetectorRef, Component, OnInit, AfterViewInit  } from '@angular/core';
import { Consultant } from '../../models/Consultant';
import { LoginService } from 'src/app/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { noop } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {
  consultants: Consultant[] = [];
  username: string = ''; 
  password: string = ''; 
  public n : number = 0;

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
      this.n = data.length;
    });
  }
  
  onLoginSubmit(): void {
    if (this.username && this.password) {
      const consultant = this.consultants.find(consultant => consultant.codeConsultant === this.username && consultant.mdpConsultant === this.password);
  
      if (consultant) {
        console.log('Success');
        this.loginService.setCodeConsultantConnecte(consultant.codeConsultant);
        this.router.navigate(['/home']);
      } else {
        console.log('Fail');
      }
    } else {
      console.log('Veuillez remplir les champs username et password.');
    }
  }
}

