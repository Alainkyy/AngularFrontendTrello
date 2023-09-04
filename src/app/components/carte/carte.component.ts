import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CoursService } from 'src/app/services/cours.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cours } from '../../models/Cours';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.css']
})
export class CarteComponent implements OnInit {
  title = 'Trello Like';
  cours: Cours[] = [];

  constructor(
    private coursService: CoursService,
    private route: ActivatedRoute,
    private router: Router,
    //private sharedService: SharedService,
    private cd: ChangeDetectorRef
  ) {}
    
ngOnInit(): void {
  this.route.queryParamMap.subscribe(params => {
      this.afficherTousLesCours();
      console.log(this.cours);
  })};

  afficherTousLesCours() {
    this.coursService.getCours().subscribe((result: any[]) => {
      this.cours = result.map(coursData => new Cours(
        coursData.idCours,
        coursData.nomCours,
        coursData.lienVersCours,
        coursData.videoVersCours,
        coursData.exercice,
        coursData.avancement,
        coursData.dateDebutCours,
        coursData.dateFinCours,
        coursData.commentaire,
        coursData.idSpecialite
      ));
      console.log('Liste des cours:', this.cours);
  });
}
}