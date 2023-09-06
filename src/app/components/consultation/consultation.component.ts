import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ConsultationService } from 'src/app/services/consultation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Consultant } from '../../models/Consultant';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationComponent implements OnInit{
  consultants: any[] = [];

  constructor(
    private consultationService: ConsultationService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
        this.afficherTousLesConsultants();
    })};


    afficherTousLesConsultants() {
      this.consultationService.GetConsultant().subscribe((result: any[]) => {
        this.consultants = result.map(consultantData => new Consultant(
          consultantData.idConsultant,
          consultantData.nomConsultant,
          consultantData.codeConsultant,
          consultantData.statutConsultant,
          consultantData.mdpConsultant,
          consultantData.idAxe,
          consultantData.idSpecialite,
          consultantData.score
        ));
        console.log('Liste des Consultants:', this.consultants);
    });
  }

  supprimerConsultant(idConsultant: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce consultant ?')) {
      this.consultationService.DeleteConsultant(idConsultant).subscribe(() => {
        this.afficherTousLesConsultants();
      }, (error) => {
        console.error('Erreur lors de la suppression du consultant :', error);
      });
    }
  }
  }