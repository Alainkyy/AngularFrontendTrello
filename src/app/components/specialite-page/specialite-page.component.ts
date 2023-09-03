import { Component } from '@angular/core';
import { Axe } from 'src/app/models/Axe';
import { AxeService } from 'src/app/services/axe.service';

@Component({
  selector: 'app-specialite-page',
  templateUrl: './specialite-page.component.html',
  styleUrls: ['./specialite-page.component.css']
})
export class SpecialitePageComponent {
  selectedButton: number | null = null;
  selectedText: string = '';

  onButtonClick(index: number) {
    this.selectedButton = index;
    this.updateSelectedText(index);
  }

  updateSelectedText(index: number) {
    switch (index) {
      case 0:
        this.selectedText = `
                  <div class="text-section">
            <div class="text-column">
              <h1 class="main-title">ASSISTANT MAÎTRISE D’OUVRAGE</h1>
              <p>Pour tous les profils Littéraires ou scientifiques</p>
              <h2 class="section-title">Description</h2>
              <p>
                L’assistance à maîtrise d’ouvrage et à maîtrise d’œuvre (AMOA/AMOE) est une spécialité conseillée particulièrement aux personnes non techniques puisqu’elle ne nécessite pas d’avoir des compétences techniques. L’enjeu de cette spécialité est la maitrise de la démarche projet et les spécificités métiers.
              </p>
              <h2 class="section-title">Responsabilités</h2>
              <p>
                L’aide à la formulation des besoins du client, et la transcription dans des termes appropriés pour les besoins du projet nécessitent un bon relationnel, un bon rédactionnel, une méthodologie solide. Des tests de validation sont utilisés en aval avec quelques technologies de niveau simple et compréhensif par tous.
              </p>
            </div>

            <div class="text-column">
              <h2 class="section-title">Spécialisations</h2>
              <ul class="specializations">
                <li>
                  <p class="specialization-title">AMOA Banque Finance</p>
                  <a href="lien_vers_le_programme.pdf" class="download-link">Téléchargez le programme de formation.pdf</a>
                </li>
                <li>
                  <p class="specialization-title">AMOA spécialisation Assurances</p>
                </li>
                <li>
                  <p class="specialization-title">AMOA spécialisation Grande Distribution Logistique</p>
                  <a href="lien_vers_le_programme.pdf" class="download-link">Téléchargez le programme de formation.pdf</a>
                </li>
                <li>
                  <p class="specialization-title">Programme Assistance à maîtrise d'ouvrage spécialisation tests et outils de tests</p>
                </li>
                <li>
                  <p class="specialization-title">PROGRAMME ASSISTANCE À MAÎTRISE D OUVRAGE SPÉCIALISATION gestion des risques crédit</p>
                  <a href="lien_vers_le_programme.pdf" class="download-link">Téléchargez le programme de formation.pdf</a>
                </li>
                <li>
                  <p class="specialization-title">PROGRAMME ASSISTANCE À MAÎTRISE D OUVRAGE SPÉCIALISATION SWIFT ET SEPA</p>
                </li>
                <li>
                  <p class="specialization-title">Exemples de spécialité pour ce métier:</p>
                  <ul class="sub-specializations">
                    <li>ASSISTANT MAÎTRISE d’ouvrage</li>
                    <li>Assurance vie</li>
                    <li>Chef de projet MOA</li>
                    <li>E-Commerce</li>
                    <li>Consultant Test</li>
                    <li>Grande distribution</li>
                    <li>BUSINESS analyste</li>
                  </ul>
                </li>
                <li>
                  <p class="specialization-title">Finances</p>
                  <a href="lien_vers_toutes_les_specialites.html" class="specializations-link">Voir toutes les spécialités de ce métier</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="text-section">
            <h2 class="main-title">Nacer Djarabi</h2>
            <p class="title-description">Responsable Pôle Métier et Assistance à la Maitrise d’Ouvrage</p>
            <p><img src="https://24presse.com/wp-content/uploads/2022/07/nacer_djarabi-1024x633.jpg" style="width: 730px;height: 500px;"/></p>   
          </div>
        `;
        break;
      case 1:
        this.selectedText = `
        <div class="text-section">
        <div class="text-column">
          <h1 class="main-title">Business Intelligence (BI)</h1>
          <div class="subtitle">Pour les profils techniques ou scientifiques</div>
          <h2 class="section-title">Description</h2>
          <p>
            La spécialité Informatique Décisionnelle et Statistiques touche aux systèmes d’aide à la décision,
            que ce soit en terme de conception ou de développement.
          </p>
          <h2 class="section-title">Responsabilités</h2>
          <p>
            Elle désigne les moyens, les outils et les méthodes qui permettent de collecter, consolider,
            modéliser et restituer les données, matérielles ou immatérielles, d’une entreprise en vue
            d’offrir une aide à la décision et de permettre à un décideur d’avoir une vue d’ensemble de l’activité traitée.
            Elle nécessite une maîtrise de la Business Intelligence et de maîtrise plusieurs ETL
            (Outils de traitement de données), couramment utilisés par les Directions système d’information.
          </p>
        </div>
        <div class="text-column">
          <h2 class="section-title">Spécialisations</h2>
          <ul class="specializations">
            <li>
              <p class="specialization-title">Informatique Décisionnelle_spécialisation DATASTAGE</p>
              <br />
              <a class="download-link" href="#">Téléchargez le programme de formation</a>
            </li>
            <li>Informatique Décisionnelle_spécialisation GENIO</li>
            <li>
              <p class="specialization-title">Informatique Décisionnelle_spécialisation INFORMATICA</p>
              <br />
              <a class="download-link" href="#">Téléchargez le programme de formation</a>
            </li>
            <li>Informatique Décisionnelle_spécialisation SAS</li>
            <li>
              <p class="specialization-title">Informatique Décisionnelle_spécialisation MS BI</p>
              <br />
              <a class="download-link" href="#">Téléchargez le programme de formation</a>
            </li>
            <li>Informatique Décisionnelle_spécialisation ODI</li>
            <li>
              <p class="specialization-title">Informatique Décisionnelle_spécialisation TALEND</p>
              <br />
              <a class="download-link" href="#">Téléchargez le programme de formation</a>
            </li>
          </ul>
          <h2 class="section-title">Exemples de spécialité pour ce métier:</h2>
          <ul class="sub-specializations">
            <li>Analyste base de données</li>
            <li>Assurance vie</li>
            <li>Analyste-concepteur SI</li>
            <li>E-Commerce</li>
            <li>Gestionnaire base de données</li>
            <li>Grande distribution</li>
            <li>Développeur ETL</li>
            <li>DATASTAGE</li>
          </ul>
          <div class="specializations-link">
            <a href="#">Voir toutes les spécialités de ce métier</a>
          </div>
        </div>
      </div>
      <div class="text-section">
        <div class="text-column">
          <div class="title-description">AHMED AKROUR</div>
          <p>Responsable Pôle décisionnel, Architecture SI</p>
        </div>
        <div class="text-column">
          <p><img src="https://static.lpnt.fr/images/2020/03/04/20117447lpw-20217834-article-jpg_7022039_1250x625.jpg" style="width: 730px;height: 500px;"/></p>
        </div>
      </div>
      
        `;
        break;
      case 2:
        this.selectedText = `
                <div class="text-section">
          <div class="text-column">
            <h1 class="main-title">NOUVELLES TECHNOLOGIES ET DÉVELOPPEMENT</h1>
            <div class="subtitle">Pour les informaticiens</div>
            <h2 class="section-title">Description</h2>
            <p>
              La spécialité Nouvelles Technologies et Développement s’adresse aux informaticiens, ou à des personnes ayant des bases techniques.
              L’apport du Village de l’Emploi consiste à consolider les compétences en développement logiciel, par l’apprentissage de plusieurs langages de programmation, dans un environnement de développement réel : Nouvelles technologies, Client/serveur, Mainframe.
            </p>
            <h2 class="section-title">Responsabilités</h2>
            <p>
              L’ingénieur Études et Développement conçoit, développe et met au point un projet d’application informatique, de la phase d’étude à son intégration pour un client ou une entreprise selon des besoins fonctionnels et un cahier des charges.
              Il peut conduire des projets de développement et coordonner une équipe.
            </p>
          </div>
          <div class="text-column">
            <h2 class="section-title">Spécialisations</h2>
            <ul class="specializations">
              <li>
                <p class="specialization-title">Etudes et Développement_spécialisation JAVA J2EE</p>
                <br />
                <a class="download-link" href="#">Téléchargez le programme de formation</a>
              </li>
              <li>Etudes et Développement_spécialisation AGL</li>
              <li>
                <p class="specialization-title">Etudes et Développement_spécialisation DOTNET</p>
                <br />
                <a class="download-link" href="#">Téléchargez le programme de formation</a>
              </li>
              <li>ETUDES ET DÉVELOPPEMENT_SPÉCIALISATION C++</li>
              <li>ETUDES ET DÉVELOPPEMENT_SPÉCIALISATION PHP</li>
              <li>ETUDES ET DÉVELOPPEMENT_SPÉCIALISATION JAVASCRIPT</li>
            </ul>
            <h2 class="section-title">Exemples de spécialité pour ce métier:</h2>
            <ul class="sub-specializations">
              <li>Concepteur / développeur</li>
              <li>Java EE</li>
              <li>Développeur Web</li>
              <li>Drupal</li>
              <li>Ingenieur études et dev</li>
              <li>PHP</li>
              <li>Chef de projet</li>
              <li>.NET E-Commerce</li>
            </ul>
            <div class="specializations-link">
              <a href="#">Voir toutes les spécialités de ce métier</a>
            </div>
          </div>
        </div>
        <div class="text-section">
          <div class="text-column">
            <div class="title-description">Yougerthen BOUHANIK</div>
            <p>Consultant-expert Nouvelle Technologie et Business Intelligence.</p>
          </div>
          <div class="text-column">
            <p><img src="https://images.midilibre.fr/api/v1/images/view/5e7e0e17d286c22378003315/hd/image.png?v=1" style="width: 730px;height: 500px;"/></p>
          </div>
        </div>  
        `;
        break;
      case 3:
        this.selectedText = `
                <div class="text-section">
          <div class="text-column">
            <h1 class="main-title">Data Management</h1>
            <div class="subtitle">Pour les profils techniques et scientifiques</div>
            <h2 class="section-title">Description</h2>
            <p>
              On a tendance à considérer les métiers de la production et de l’exploitation comme la dernière roue du carrosse. Détrompez-vous ! S’il est un secteur qui recrute, c’est bien celui-ci.
            </p>
            <h2 class="section-title">Responsabilités</h2>
            <p>
              Les métiers concernent tous les niveaux : les titulaires d’un bac+2 peuvent devenir technicien d’exploitation, technicien réseau ou télécoms, analyste système, administrateur d’outils/système/réseaux et télécoms ou pilotes d’exploitation, les bac+4/+5 évolueront, eux, vers des postes d’administrateur de base de données ou d’intégrateur d’exploitation.
            </p>
          </div>
          <div class="text-column">
            <h2 class="section-title">Spécialisations</h2>
            <ul class="specializations">
              <li>
                <p class="specialization-title">Les métiers de la Data Management, systèmes et base de données.</p>
                <br />
                <a class="download-link" href="#">Télécharger le programme de la formation</a>
              </li>
              <li>Data Management Sécurité Réseaux</li>
              <li>Data Management et Exploitation</li>
              <li>Data Management Dev Ops</li>
              <li>Data Management, Administration Systèmes Linux</li>
              <li>Administration Windows</li>
            </ul>
          </div>
        </div>
        <div class="text-section">
          <div class="text-column">
            <div class="title-description">Mohammed ABDELALI</div>
            <p>INGENIEUR D’ETUDES ET DEVELOPPEMENT / FORMATEUR PL/SQL-SQL-UNIX INFORMATICA, DATASTAGE</p>
          </div>
          <div class="text-column">
          <p><img src="https://villageemploi.info/wp-content/uploads/2021/06/image-1.png" style="width: 730px;height: 500px;"/></p>
          </div>
        </div>
      `;
        break;
      default:
        this.selectedText = '';
        break;
    }
}
}