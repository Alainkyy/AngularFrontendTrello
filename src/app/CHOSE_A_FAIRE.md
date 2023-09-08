A faire :
Faire une variable qui vas stocker le pourcentage de l'avancement en fonction de la specialité exemple : 10 cours dans une spécialité donc 1 cours = 10%
Afficher la boite de cours ameliorer le design
Quand un cours est passé dans la liste done => avancement s'incremente en fonction du nbcours
Rajouter Variable pour savoir si un cours est en cours ou done (un boolean : finished)

Plus tard :
S'occuper de l'affichage administrateur (All details Cours consultant)


zézzion avancémént toiz zaffiché chéz formatéur & tétail auzzi


Dans cours seront affiché les cours filtré par la spécialité ! 
Donc je dois faire un service pour recuperer la specialité selectionné ou dans la BD par Consultant




    Récupérez l'ID de la spécialité du consultant connecté. FAIT
    Récupérez la liste complète des cours. FAIT
    Utilisez l'ID de spécialité du consultant pour filtrer la liste des cours. FAIT
    Affichez la liste filtrée des cours dans votre interface utilisateur. FAIT DU PREMIER COUP SA MERE ! 



Mettre en place le localStorage

Et si le code etait bon et c'etait le ngOnInit qui intialise pas la sauvegarde ? 
Non ca sauvegarde n'importe comment systematiquement, il faut que la classe CarteState 
- recupere l'id du cours quand on Drag un cours 
- recupere la localisation apres un Drag du cours pour voir si cardDone true or false

- Enregistre ces données dans la table CardState e

- Recupere ces donnée au chargement de la page par session
- Affecte chaque idCours a sa place (En cours / Done )

 
