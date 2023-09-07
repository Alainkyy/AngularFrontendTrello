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
  public consultants: Consultant[] = [];

  constructor(
    private consultationService: ConsultationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeConsultantIdFromUrl();
    this.initializeConsultantDetailsFromUrl();
  }

  private initializeConsultantIdFromUrl() {
    const idConsultant = this.route.snapshot.paramMap.get('idConsultant');
    if (idConsultant !== null) {
      this.consultantToEdit.idConsultant = +idConsultant;
    } else {
      console.error('ID du consultant non trouvé dans l\'URL.');
    }
  }

  private initializeConsultantDetailsFromUrl() {
    const idConsultantFromUrl = this.route.snapshot.paramMap.get('idConsultant');
    const idConsultant = idConsultantFromUrl !== null ? +idConsultantFromUrl : null;
  
    this.consultationService.GetConsultant().subscribe(
      (result: any[]) => {
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
  
        if (idConsultant !== null) {
          const consultantFound = this.consultants.find(c => c.idConsultant === idConsultant);
  
          if (consultantFound) {
            this.consultantToEdit = consultantFound;
          } else {
            console.error('Consultant non trouvé pour l\'ID spécifié.');
          }
        } else {
          console.error('ID du consultant non trouvé dans l\'URL.');
        }
      },
      (error) => {
        console.error('Erreur lors du chargement des consultants :', error);
      }
    );
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
