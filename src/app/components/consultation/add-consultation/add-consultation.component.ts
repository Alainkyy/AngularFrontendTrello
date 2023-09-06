import { Component } from '@angular/core';
import { Consultant } from '../../../models/Consultant';
import { ConsultationService } from '../../../services/consultation.service';

@Component({
  selector: 'app-add-consultation',
  templateUrl: './add-consultation.component.html',
  styleUrls: ['./add-consultation.component.css']
})
export class AddConsultationComponent {
  public consultantToAdd: Consultant = new Consultant();

  constructor(private consultationService: ConsultationService) {}

  onSubmit() {
    this.consultationService.PostConsultant(this.consultantToAdd).subscribe(
      (addedConsultant: Consultant) => {
        console.log('Consultant ajouté avec succès :', addedConsultant);
        this.consultantToAdd = new Consultant();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du consultant :', error);
      }
    );
  }
}