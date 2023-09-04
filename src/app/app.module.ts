import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AxeListeComponent } from './components/axe-liste/axe-liste.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderSectionComponent } from './components/header-section/header-section.component';
import { FooterSectionComponent } from './components/footer-section/footer-section.component';
import { SpecialitePageComponent } from './components/specialite-page/specialite-page.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CarteComponent } from './components/carte/carte.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'specialitePage', component: SpecialitePageComponent },
  { path: 'liste', component: AxeListeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'listeCours', component: CarteComponent },

];

@NgModule({

  declarations: [
    AppComponent,
    AxeListeComponent,
    HeaderSectionComponent,
    FooterSectionComponent,
    SpecialitePageComponent,
    HeroSectionComponent,
    LoginComponent,
    HomeComponent,
    CarteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
