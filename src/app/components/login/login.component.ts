import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Consultant } from '../../models/Consultant';
import { LoginService } from 'src/app/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  consultants: Consultant[] = [];
  username: string = ''; 
  password: string = ''; 
  loginError: boolean = false; 

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loginService.getConsultant().subscribe((data: Consultant[]) => {
      this.consultants = data;
      console.log('Liste Consultants :', this.consultants);
    });
  }

  onLoginSubmit(): void {
    const userExists = this.consultants.some(
      (consultant) =>
        consultant.codeConsultant === this.username && consultant.mDPConsultant === this.password
    );
  
    if (userExists) {
      this.router.navigate(['/home']);
      console.log("Success");
    } else {
      this.loginError = true;
      console.log("Fail");
    }
  }
}
