import { Component, OnInit } from '@angular/core';
import { AxeService } from 'src/app/services/axe.service';

@Component({
  selector: 'app-axe-liste',
  templateUrl: './axe-liste.component.html',
  styleUrls: ['./axe-liste.component.css']
})
export class AxeListeComponent implements OnInit {
  items: any[] = [];

  constructor(private axeService: AxeService) { }

  ngOnInit(): void {
    this.axeService.getAxe().subscribe(
      (data) => {
        console.log('API Response:', data); // Ajoutez cette ligne pour afficher la réponse de l'API dans la console
        this.items = data; // Mettez à jour le tableau avec les données reçues
      },
      (error) => {
        console.error('API Error:', error); // Ajoutez cette ligne pour afficher les erreurs de l'API dans la console
      }
    );
  }
}