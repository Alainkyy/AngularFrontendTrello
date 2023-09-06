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
import {DragDropModule} from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { ConsultationComponent } from './components/consultation/consultation.component';
import { AddConsultationComponent } from './components/consultation/add-consultation/add-consultation.component';
import { EditConsultationComponent } from './components/consultation/edit-consultation/edit-consultation.component';
import { ViewConsultationComponent } from './components/consultation/view-consultation/view-consultation.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'specialitePage', component: SpecialitePageComponent },
  { path: 'listeAxe', component: AxeListeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'listeCours', component: CarteComponent },
  { path: 'listeConsultant', component: ConsultationComponent },
  { path: 'viewConsultant/:idConsultant', component: ViewConsultationComponent },
  { path: 'addConsultant', component: AddConsultationComponent },
  { path: 'editConsultant/:idConsultant', component: EditConsultationComponent } 

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
    CarteComponent,
    ConsultationComponent,
    AddConsultationComponent,
    EditConsultationComponent,
    ViewConsultationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatSnackBarModule,
    DragDropModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
