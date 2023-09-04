import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userData = {
    username: 'Alain',
    password: '1234'
  };

  errorMessage = ''; // Message d'erreur
  constructor(private router: Router) { }

  onSubmit() {
    const username = this.userData.username;
    const password = this.userData.password;
  
    if (username === 'Alain' && password === '1234') {
      console.log('Success');
      this.router.navigate(['/home']);
    } else {
      console.log('Fail');
      this.errorMessage = 'Veuillez réessayer, utilisateur ou mot de passe incorrect !'; 
    }
  }
}

