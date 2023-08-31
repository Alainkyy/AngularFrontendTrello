import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AxeListeComponent } from './components/axe-liste/axe-liste.component';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
 // { path: 'home', component: HomepageComponent },
  { path: 'liste', component: AxeListeComponent },
  // { path: 'ajouter', component: AjoutLivreComponent },
 //  { path: 'modifier', component: ModifierLivreComponent },
 // { path: 'supprimer', component: SupprimerLivreComponent },
  // ... autres routes
];

@NgModule({
  declarations: [
    AppComponent,
    AxeListeComponent
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
