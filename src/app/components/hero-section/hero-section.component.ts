import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css']
})
export class HeroSectionComponent implements OnInit {
  currentHero: string = 'hero-green'; // Bouton vert actif par défaut
  heroText: string = ''; // Texte dynamique du héros

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    // Définir l'image comme image initiale
    this.changeHero('hero-green', 'var(--color-green)'); // Vous pouvez spécifier la couleur ici
  }

  changeHero(imageId: string, color: string) {
    this.currentHero = imageId;
    this.updateCircleColor(color);
    this.hideAllHeroes();

    // Afficher l'image correspondant au bouton cliqué
    const element = document.getElementById(imageId);
    if (element) {
      this.renderer.setStyle(element, 'display', 'block');
    }

    // Mettre à jour le texte en fonction du bouton cliqué
    this.updateHeroText(imageId);
  }

  private updateCircleColor(color: string) {
    const circles = document.querySelectorAll('.circle');
    circles.forEach(circle => {
      this.renderer.setStyle(circle, 'background-color', color);
    });
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

  private updateHeroText(imageId: string) {
    // Mettre à jour le texte en fonction de l'image cliquée
    switch (imageId) {
      case 'hero-orange':
        this.heroText = 'Votre parcours village de l’emploi est financé\n par nos partenaires,qui sont aussi vos futurs\n employeurs.';
        break;
      case 'hero-blue':
        this.heroText = 'Un emploi garanti chez les plus grands comptes, avec\n à la clé un gain d’expérience et une rémunération\n considérable.';
        break;
      case 'hero-pink':
        this.heroText = 'Dès que vous prenez la décision de vous engager\n avec nous, vous êtes automatiquement pris en\n charge par le staff village de l’emploi pour\n franchir dûment toutes les étapes de votre\n parcours.';
        break;
      case 'hero-green':
        this.heroText = 'Des Formateurs experts sont à votre service pour\n une transmission descompétences et techniques\n nécessaires pour une accélération de votre cursus\n professionnel.';
        break;
      default:
        this.heroText = '';
        break;
    }
  }
}
