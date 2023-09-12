CarteEtat est fait model + service

Quand on s'authentifie et qu'on click sur cours alors on charge le tableau CarteEtat
0 - Recuperer CarteEtat filtré par connectedAs6 (IdConsultantConnecté)
1 - Charger 0 dans le ngOnInit()

CarteEtat doit recuperer idConsultantConnecte donc connectedAs6
2 - CarteEtat.IdConsultant = this.connectedAs6

A chaque deplacement de carte, de la meme facon que calculateScore est appelé on vas mettre dans calculateScore
le remplissage de la table CarteEtat de sorte que chaque deplacement sois enregistré dans la table. 

3 :
    - Recuperer cours.idCours qui est déplacé et le mettre dans CarteEtat.IdCours

    - Si listeDdCours contient CarteEtat.IdCours alors CarteEtat.IsVosCours = true, CarteEtat.IsActif = false, CarteEtat.IsFinis = false
    - Si listeDdActif contient CarteEtat.IdCours alors CarteEtat.IsVosCours = false, CarteEtat.IsActif = true, CarteEtat.IsFinis = false
    - Si listeDdFinis contient CarteEtat.IdCours alors CarteEtat.IsVosCours = false, CarteEtat.IsActif = false, CarteEtat.IsFinis = true

A la fin de calculateScore rajouté 
4 - CarteEtat.ScoreEtat = consultantToUpdate.score



5 - Filtre par IdConsultant dans CarteEtat pour charger uniquement les modifications du consultant connecté (connectedAs6)



A Faire Autre :
Sur la liste Consultant affiché chez les "Admin" rajouté un filtre sur Axe
Rajouté un trie sur Score

En cours : 
Recuperer l'idCours du cours deplacé 


gestion Store ngrx
