import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultationService } from '../../../services/consultation.service';
import { Consultant } from '../../../models/Consultant';

@Component({
  selector: 'app-edit-consultation',
  templateUrl: './edit-consultation.component.html',
  styleUrls: ['./edit-consultation.component.css']
})
export class EditConsultationComponent implements OnInit {
  public consultantToEdit: Consultant = new Consultant();

  constructor(
    private consultationService: ConsultationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeConsultantIdFromUrl();
  }

  private initializeConsultantIdFromUrl() {
    const idConsultant = this.route.snapshot.paramMap.get('idConsultant');

    if (idConsultant !== null) {

      this.consultantToEdit.idConsultant = +idConsultant;
    } else {
      console.error('ID du consultant non trouvé dans l\'URL.');
    }
  }

  onModif() {
    this.consultationService.PutConsultant(this.consultantToEdit).subscribe(
      (updatedConsultant: Consultant) => {
        console.log('Consultant modifié avec succès :', updatedConsultant);
        this.router.navigate(['/listeConsultant']);
      },
      (error) => {
        console.error('Erreur lors de la modification du consultant :', error);
      }
    );
  }
}
