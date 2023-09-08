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
      this.n = data.length;
    });
  }
  
  onLoginSubmit(): void {
    if (this.username && this.password) {
      const consultant = this.consultants.find(consultant => consultant.codeConsultant === this.username && consultant.mdpConsultant === this.password);
  
      if (consultant) {
        console.log('Success');

        // Recupere le nomConsultant
        this.loginService.indiceConnexion = true;
        this.loginService.setNomConsultantConnecte(consultant.nomConsultant);

        // Recupere le statutConsultant
        const statutConsultant = consultant.statutConsultant;
        this.loginService.setStatutConsultantConnecte(consultant.statutConsultant); 

        // Recupere le idSpecialite
        const idSpecialite = consultant.idSpecialite;
        this.loginService.setIdSpecialiteConsultantConnecte(consultant.idSpecialite); 

        // Recupere le codeConsultant
        const codeConsultant = consultant.codeConsultant;
        this.loginService.setCodeConsultantConnecte(consultant.codeConsultant); 

        // Recupere le score du Consultant
        const score = consultant.score;
        this.loginService.setScoreConsultantConnecte(consultant.score); 

        // Recupere l'idConsultant du Consultant
        const idConsultant = consultant.idConsultant;
        this.loginService.setIdConsultantConsultantConnecte(consultant.idConsultant); 

        this.router.navigate(['/home']);
      } else {
        console.log('Fail');
        this.loginService.indiceConnexion = false;
        this.loginService.openFailureSnackBar();
      }
    } else {
      console.log('Veuillez remplir les champs username et password.');
    }
  }
}

