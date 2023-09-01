import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css']
})
export class HeroSectionComponent implements OnInit {
  currentHero: string = 'hero-green'; // Bouton vert actif par défaut
  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    // Définir l'image comme image initiale
    this.changeHero('hero-green');
  }


  changeHero(imageId: string) {
    this.currentHero = imageId;
    // Masquer toutes les images du hero
    this.hideAllHeroes();

    // Afficher l'image correspondant au bouton cliqué
    const element = document.getElementById(imageId);
    if (element) {
      this.renderer.setStyle(element, 'display', 'block');
    }
  }

  private hideAllHeroes() {
    const heroes = ['hero-green', 'hero-blue', 'hero-pink', 'hero-orange'];
    heroes.forEach(hero => {
      const element = document.getElementById(hero);
      if (element) {
        this.renderer.setStyle(element, 'display', 'none');
      }
    });
  }
}