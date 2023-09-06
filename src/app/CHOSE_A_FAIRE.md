A faire :
Faire une variable qui vas stocker le pourcentage de l'avancement en fonction de la specialité exemple : 10 cours dans une spécialité donc 1 cours = 10%
Afficher la boite de cours ameliorer le design
Quand un cours est passé dans la liste done => avancement s'incremente en fonction du nbcours
Rajouter Variable pour savoir si un cours est en cours ou done (un boolean : finished)

Plus tard :
S'occuper de l'affichage administrateur (All details Cours consultant)

A faire :
Premiere connexion :
Rajouté un champ dans la table Consultant : PremiereConnexion de type Boolean
Par default premierconx = true;
si premiereconx = true alors /api/selection
Selection étant une nouvelle interface qui vas permettre de choisir son axe PUIS sa specialite
Une fois qu'on a choisis alors premiereconx = false et on y accede plus jamais EVER EVER ! 
Cela vas faire un PUT sur le consultant car IdSpecialité seras null en antendant

Backend :
Rendre IdSpecialite nullable

SQL requete : mettre " " dans chacune des IdSpecialite de Consultant

Faire en priorité !
Interface modification update Consultant, c'est l'admin qui choisis d'abord Axe, puis specialite du consultant
Chaque Axe a plusieurs specialité 
LA BD EST DEJA FAITES

Une fois que le consultant a choisis sa specialité : 
Il accede a Cours
Dans cours seront affiché les cours filtré par la spécialité ! 
Donc je dois faire un service pour recuperer la specialité selectionné ou dans la BD par Consultant









 
