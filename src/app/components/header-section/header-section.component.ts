import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-section',
  templateUrl: './header-section.component.html',
  styleUrls: ['./header-section.component.css']
})
export class HeaderSectionComponent {
  isLoginVisible = false;

  constructor(private router: Router) { }

  onAuthClick() {
    this.router.navigate(['/login']);
    this.isLoginVisible = true;
  }

  ngOnInit() {}
}
