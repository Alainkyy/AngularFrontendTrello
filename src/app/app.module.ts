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


const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'specialitePage', component: SpecialitePageComponent },
  { path: 'liste', component: AxeListeComponent },
  // { path: 'ajouter', component: AjoutLivreComponent },
 //  { path: 'modifier', component: ModifierLivreComponent },
 // { path: 'supprimer', component: SupprimerLivreComponent },
  // ... autres routes
];

@NgModule({
  declarations: [
    AppComponent,
    AxeListeComponent,
    HeaderSectionComponent,
    FooterSectionComponent,
    SpecialitePageComponent,
    HeroSectionComponent
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
