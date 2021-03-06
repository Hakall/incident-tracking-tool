# Création d'un outil de suivi d'incidents

Le service client de l'entreprise reçoit quotidiennement des demandes par email et par téléphone (~deux centaines / jour). Quand le temps le permet, chaque demande est retranscrite dans un formulaire typeform. Les données ainsi saisies sont ensuite utiliées à des fins d'analyse. L'objectif de cet exercice technique est de prototyper un outil ergonomique de suivi d'incidents.

Les informations saisies lors d'un incident sont les suivantes :
* un ou plusieurs **emails** concernés par l'incident
* le **point relais** où l'incident a eu lieu (liste complète ci-dessous)
* la **date** de l'incident (l'heure n'a pas d'importance)
* le **type** d'incident (Conditionnement, Livraison, Point Relais, Produit, Client, E-commerce)
* la **cause** de l'incident (et pour certains des détails supplémentaires)
    - si le type d'incident est « Conditionnement » la cause (Fuite, Ouvert)
    - si le type d'incident est « Livraison » la cause (Retard, Retard au lendemain, Casier manquant, Température, Livraison partielle, Livraison à la mauvaise adresse, Non livré, Équipement)
    - si le type d'incident est « Point Relais » la cause (Fermeture, Casier manquant)
    - si le type d'incident est « Produit » la cause (Inversion, Poids, Manque, Fraicheur, Mortalité, Découpe, Diversité, Non vidé, Vers, Sable) **puis** **l'espèce** (liste complète ci-dessous)
    - si le type d'incident est « Client » la cause (Oubli, Paiement, Insatisfaction)
    - si le type d'incident est « E-commerce » la cause (Navigateur, Paiement, Email non reçu, Commande impossible, Frais de livraison, Autre)
* la (ou les) **résoluation(s)** de l'incident (Email, Appel téléphonique, Remboursement partiel, Remboursement total)
* si la (ou une des) résolution(s) est « Remboursement partiel » ou « Remboursement total » le **montant remboursé**
* un **commentaire** optionnel sur l'incident

## Contraintes fonctionnelles

1. une saisie la plus rapide possible ; les champs avec une liste de choix pré-établis doivent être autocomplete, et forcer un choix parmi ceux disponibles.
2. une liste des incidents triés par date puis client (champs affichés : Email client, Point Relais, Date de l'incident, Type d'incident, Cause, Résolution, Montant remboursé)

Et, en option, si le temps / l'envie le permet (sans ordre de préférence) :
* une saisie élégante lorsqu'un client rencontre plusieurs incidents le même jour
* une liste des incidents ayant occasionné un remboursement groupés par produit et par jour (champs affichés : Produit, Cause, Montant remboursé, Nombre d'occurence, Date d'incident)
* pour ce listing « regroupé », un affichage graphique, avec les données cumulées du jour
* pour chaque listing réalisé, une pagination

## Contraintes techniques

L'interface de cet outil doit être réalisée avec [react](https://fr.reactjs.org/), l'api avec [node](https://nodejs.org/en/) et les données stockées avec [nedb](https://github.com/louischatriot/nedb).

## Contraintes temporelles

Aucune. Le process de recrutement reprend dès le rendu de l'exercice.

## Données

La liste des points relais est la suivante :
* 3 Ptits Pois, mercredi
* 3 Ptits Pois, jeudi
* A 2 pains d'ici, jeudi
* A la Ferme du Val Durance, mardi
* A Travers Champs, mercredi
* Altermarché Du dan, jeudi
* Amap 360 Degrès Sud, jeudi
* Amap d'Argenteuil, jeudi
* Amap de Jujurieux : Le vert à soie, mercredi
* AMAP de la Chapelle - Jardin partagé ECObox, vendredi
* AMAP de Maringues, mardi
* Amap du marais, mardi
* Amap Le Potager Balmontin, jeudi
* AMAP Les cagettes Larziacoises, jeudi
* AMAP Sand'illon, mardi
* Ange et Fromage, mercredi
* Après la Pluie Biomonde, mercredi
* Aromes et passions, jeudi
* Art à table, mardi
* Artisans du monde SQY, vendredi
* As de Table, mercredi
* As de Table, samedi
* Association ANTRAIDE, mercredi
* Astuces En Vrac, mardi
* Au bout du champ - Belleville, jeudi
* Au Bout Du Champ - Dames, mardi
* Au Bout Du Champ - Levallois, jeudi
* Au bout du champ - Losserand, mercredi
* Au Bout Du Champ - Martyrs, mardi
* Au bout du champ - Oberkampf, jeudi
* Au Bout du Champ - Truffaut - Bois, mercredi
* Au Bout du Champ - Truffaut - Herblay, jeudi
* Au Coin Bio, mardi
* Au FonDue Caquelon, jeudi
* Au Sarto de Marie, jeudi
* Au Tour Du Vrac, mardi
* Aux 4 saisons, jeudi
* Avoboko, mercredi
* B-Vrac, vendredi
* Basso Com'Pôtes, mardi
* Bellota France, mercredi
* Betty, mercredi
* Bibovino, jeudi
* Bio d'Issy, jeudi
* Bio Saveurs, mercredi
* Bio Vergt, mardi
* Bio Veyre, jeudi
* Biocoop Albi, mercredi
* Biocoop Andernos, mercredi
* Biocoop Annonay, mardi
* Biocoop Au Bourgeon vert, mercredi
* Biocoop Au p'tit Bio, jeudi
* Biocoop Autun, mercredi
* Biocoop Beaune, jeudi
* Biocoop Bioambiance, mardi
* Biocoop Bioplaisir craponne Lyon, mardi
* Biocoop Bioplaisir Tassin, mardi
* Biocoop Biovivéo Soisy, mercredi
* Biocoop Blagnac, mardi
* Biocoop Breg Osio, jeudi
* Biocoop Bressuire, mercredi
* Biocoop Bréda, jeudi
* Biocoop Cahors, jeudi
* Biocoop Cahors Cathédrale, jeudi
* Biocoop Campana, mardi
* Biocoop Capdenac Le Haut, jeudi
* Biocoop Capinghem, mardi
* Biocoop Champagnole, mercredi
* Biocoop Chatenay Malabry, jeudi
* Biocoop Chécy, jeudi
* Biocoop Cornebarrieu, mercredi
* Biocoop Croix Daurade, mardi
* Biocoop Crolles, jeudi
* Biocoop des Ternes, mardi
* Biocoop du Bazert, jeudi
* Biocoop du Grand Large, jeudi
* Biocoop Estancarbon, jeudi
* Biocoop Gaillac, jeudi
* Biocoop Germinal Auxerre, jeudi
* Biocoop Germinal Perrigny, mardi
* Biocoop Germinal Sens, jeudi
* Biocoop Germinal Tonnerre, jeudi
* Biocoop Gourdon - La p'tite bouriane, jeudi
* Biocoop Greendy, jeudi
* Biocoop Gujan, mardi
* Biocoop Hem, mardi
* Biocoop Itteville, mercredi
* Biocoop L'Arbre à Pain, mercredi
* Biocoop L'Arbre à Pain, jeudi
* Biocoop L'Epicerie Souillagaise, jeudi
* Biocoop L'Escale, mardi
* Biocoop La Canopée - Mouillère, mercredi
* Biocoop La Canopée - Valentin, jeudi
* Biocoop La graine en Vexin, jeudi
* Biocoop La Ménude, mardi
* Biocoop La Ruche de Tolbiac, mardi
* Biocoop La Teste, jeudi
* Biocoop la ville du bois, jeudi
* Biocoop Le Baquet Vert, mercredi
* Biocoop Le Baraban, jeudi
* Biocoop le Chou Ravi, mardi
* Biocoop Le Grenier Vert - Belfort, mercredi
* Biocoop Le Grenier Vert - l'autre rive, mercredi
* Biocoop Le Monde Allant Vert, jeudi
* Biocoop Le Refuge des saveurs, mardi
* Biocoop Le retour à la terre rive gauche, vendredi
* Biocoop Le Temps des Saisons, jeudi
* Biocoop Les Artisons, mercredi
* Biocoop Les Bonnes Graines, jeudi
* Biocoop Les Halles, mercredi
* Biocoop Les Papillons, mercredi
* Biocoop les Pousses de Menilmontant, mercredi
* Biocoop Mathay, jeudi
* Biocoop Monge, mardi
* Biocoop Montauban, mercredi
* Biocoop Montignac, jeudi
* Biocoop Montredon, mercredi
* Biocoop Montée des soldats, mercredi
* Biocoop Origine, jeudi
* Biocoop Paris Bastille, mardi
* Biocoop Plaisance du Touch, mercredi
* Biocoop Porte des Alpes, jeudi
* Biocoop Purpan, mardi
* Biocoop Quint Fonsegrives, mercredi
* Biocoop Saint André, mardi
* Biocoop Saint Vit, mardi
* Biocoop Sarlat, jeudi
* Biocoop Saveurs et Saisons Bouvines, mardi
* Biocoop Saveurs et Saisons Lille, jeudi
* Biocoop Semnoz, jeudi
* Biocoop Sorbiers, jeudi
* Biocoop Totem, mardi
* Biocoop Totem, mercredi
* Biocoop Tournefeuille, mercredi
* Biocoop Valenciennes, mercredi
* Biocoop Vallée du Gapeau, mercredi
* Biocoop Velay Nature, mardi
* Biocoop Vendome, jeudi
* Biocoop Villefranche, mercredi
* Biocoop Voreppe, mardi
* Biocoop Wattignies, mercredi
* Biolinet, mercredi
* Biomonde Cachan, samedi
* Biomonde Malouviere, mercredi
* Biomonde Saveur Nature, mercredi
* Biomonde Val de Scarpe, mardi
* Biovrac Shop, jeudi
* BOC' - Drive Local & Zéro Déchet, mardi
* Boc's, vendredi
* Boco&co Marcq, mardi
* Boco&co Marcq, jeudi
* Boco&co Mouvaux, jeudi
* Bon Sens, vendredi
* Bonheur Nature, mercredi
* Botanic Pontault Combault, mercredi
* Botanic Pontault Combault, vendredi
* Botanic Villeurbanne, vendredi
* Boulangerie Pajol, mardi
* Boulangerie Pajol, vendredi
* Brasserie MIR, vendredi
* Brasserie Ourobouros, mercredi
* Brin d'arôm, mercredi
* Bulliz, jeudi
* Café du Coin, mardi
* Carrément Bio, mercredi
* Castels Vrac, mercredi
* Causses 1er, jeudi
* Causses 3e, vendredi
* Causses 9e, samedi
* Cavavin - La muette, mercredi
* Cave et Jardin, mercredi
* Cave Le Vingt-Deux, mardi
* Cave Le Vingt-Deux, samedi
* Cave Ponthieu, mardi
* Caviste Fontenay, mardi
* Caviste Fontenay, samedi
* Champs Libres, mardi
* Chaumartin, mardi
* Chez Alexandre, mercredi
* Chez Augustin, mercredi
* Chez B.Fimbel, mercredi
* Chez Brigitte Marchand, jeudi
* Chez béchet, mercredi
* Chez Chloé, jeudi
* Chez Christophe Cialdini, mardi
* Chez Danielle Naudot, mardi
* Chez Dominique, jeudi
* Chez Francette, mercredi
* Chez Isabelle Calvet, jeudi
* Chez J&R, vendredi
* Chez Julien Boulord, mercredi
* Chez Jérémy.N, mardi
* Chez Katheleen Jouneau, jeudi
* Chez Marie Pierre VUITTENEZ, mercredi
* Chez Marion Collas, mardi
* Chez Monique Ecoiffier, jeudi
* Chez Mère-Grand, l'épicerie d'antan, jeudi
* CiaoGnari, mardi
* CiaoGnari, samedi
* CLAMAP, mercredi
* Comptoir Bio, vendredi
* Comptoir de campagne - Boisset Saint-Priest, mercredi
* Comptoir de Campagne - Faverges, jeudi
* Comptoir de campagne - Luriecq, mercredi
* Comptoir de Campagne - Rochetoirin, jeudi
* Comptoir de Campagne - Ste Blandine, jeudi
* Comptoir de Champdieu, mardi
* Comptoir du Vrac  Dourdan, mardi
* Comptoir du vrac Rambouillet, mardi
* Comptoir du vrac Rambouillet, vendredi
* Contre-Poids, jeudi
* Coopaparis, jeudi
* Croc Nature Serre Les Sapins, mercredi
* Croc Nature Valence, mardi
* Croc nature Voujeaucourt, mercredi
* Croc'Bauges, jeudi
* Croc'us Magasin Mahon, mercredi
* Croc'us Marché Central, mercredi
* Crémerie Fromagerie Mercy, mercredi
* Curiosités, mercredi
* Côté Nature Hésingue, mercredi
* Dandîne, mercredi
* Dans la cuisine, mercredi
* Day by Day 12ème, mercredi
* Day by Day 94 Charenton- le-Pont, mercredi
* Day by Day Asnières, mardi
* Day by day Avignon, mardi
* Day by day Avignon, jeudi
* Day by Day Batignolles, vendredi
* Day By Day Belleville, jeudi
* Day by Day Boulogne Billancourt, jeudi
* Day by day Brive, mardi
* Day by Day Cambronne, vendredi
* Day by Day Chambéry, mardi
* Day by Day Chambéry, mercredi
* Day by Day Chartres, mercredi
* Day By Day Colmar, jeudi
* Day by Day Gap, mardi
* Day by Day Gap, jeudi
* Day by Day Grenoble, mercredi
* Day by Day Le Mans, mardi
* Day by Day Lyon 2, jeudi
* Day by Day Lyon 2, vendredi
* Day by day Lyon 7, jeudi
* Day by Day Metz, mardi
* Day by Day Metz, jeudi
* Day by day Monplaisir, jeudi
* Day by day Monplaisir, vendredi
* Day by day Montreuil, vendredi
* Day by Day Mouffetard, mercredi
* Day by Day Mouffetard, vendredi
* Day by Day Nancy, mardi
* Day by Day Nancy, jeudi
* Day by day Nanterre, vendredi
* Day by Day Nice, mardi
* Day by Day Nice, jeudi
* Day by Day Orléans, jeudi
* Day by Day Pau, mardi
* Day by Day Raincy, jeudi
* Day by Day Reims, mardi
* Day by Day Reims, jeudi
* Day by day Rouen, mardi
* Day by Day Savigny, mardi
* Day by day Sèvres, jeudi
* Day by day Sèvres, samedi
* Day by Day Versailles, vendredi
* Day by Day Voltaire, vendredi
* De l'Autre Côté de la Rue, mercredi
* De la Fourche à la Fourchette, mardi
* De la Fourche à la Fourchette, vendredi
* Demain Supermaché, mardi
* Denis - Épicerie de qualité, mercredi
* Denis - Épicerie de qualité, vendredi
* Denis - Épicerie de qualité, samedi
* Drive La Fourmilière, jeudi
* Délices de Tivoli, mercredi
* Ecrin Bio, mercredi
* Elan Nature 14ème, jeudi
* Elan Nature 15ème, samedi
* Eldora D'Oz, mercredi
* Eldora D'Oz, vendredi
* Elize Mazuel, jeudi
* En avant toute!, vendredi
* Entre METS & VINS, jeudi
* Entre Pots, mercredi
* Entre Terre et Mer, mercredi
* Epi C'Tout, jeudi
* Epicerie Bio Coeur d'Artichaut, mercredi
* Epicerie BLV : Bio Local Vrac, mercredi
* Epicerie Chez Gaëlle, mardi
* Epicerie du Coing, mercredi
* Epicerie Label Echoppe, jeudi
* Epicerie le Lizieux, jeudi
* Epicerie Poulain, mercredi
* Epicerie Tounette, vendredi
* Epicerie Wadi, mercredi
* Espace Bio, mardi
* Esprit Fermes, jeudi
* Esprit Fermes, samedi
* Ethique et Toque, mercredi
* Eugene Koepf, mercredi
* Fenotte, mardi
* Ferme Attitude - Francois-Verdier, jeudi
* Ferme Attitude Saint-Cyprien, jeudi
* Ferme Aux Epis Curieux, mardi
* Ferme de Viltain, vendredi
* Ferme de Viltain, samedi
* Fromagerie des 4 Gones, mardi
* Fromages et Ramage, vendredi
* G'Sunder Vrac, mardi
* GAEC de la Coumes, jeudi
* Galerie des papilles, mardi
* Genty Gastronomie, mercredi
* Goutte des gâtines, jeudi
* Graine & Cie, mercredi
* Graine d'essentiel, jeudi
* Graines de Loire, mardi
* Grand panier Bio Bourg (ancien croc nature), mercredi
* Green'market, jeudi
* Habitude, mardi
* Harmonie Nature, mercredi
* Hédonie, jeudi
* Inter Caves Le Mans, jeudi
* Je Thé Me, samedi
* Jetza Drive, mercredi
* Jetza Drive, jeudi
* L'Alimentation Géniale, mardi
* L'Ancienne Laiterie - JusdelaVigne, jeudi
* L'Arpent Vert -  Fruits et Légumes Bio, jeudi
* L'Arrosoir, vendredi
* L'atelier du Bio, jeudi
* L'Authentique, mercredi
* L'Eau Vive  Echirolles, mardi
* L'Eau Vive - Brié-Et-Angonnes, mardi
* L'eau Vive Annecy, jeudi
* L'Eau Vive Grenoble Irvoy, jeudi
* L'Eau Vive Nancy, mercredi
* L'eau Vive Villeurbanne, mardi
* L'Ecluse Restaurant, mercredi
* L'effet bocal, jeudi
* L'Entr'Pots, mercredi
* L'Entrechamps, jeudi
* L'Epicerie de Léonie, jeudi
* L'Epicerie Equitable Lyon, mercredi
* L'Essentiel, vendredi
* L'Etiquette, mardi
* L'Hay Nature, samedi
* L'ilot de la Meinau, mardi
* L'ilot de la Meinau, jeudi
* L'Oasis, mercredi
* L'Éco Bougnat, mardi
* L'épicerie Bagnolet, mercredi
* L'épicerie Comptoir, mercredi
* L'épicerie de Loïc, vendredi
* L'épicerie des environs, mardi
* L'épicerie des environs, jeudi
* L'épicerie des Julie, mercredi
* L'épicerie du coin, jeudi
* L'épicerie du village Caudeau, jeudi
* L'Épicerie Locavore, jeudi
* L'épicerie MIAM, mercredi
* L'épicerie MIAM, samedi
* L'épicerie Nathalie, mardi
* L'épicerie Simple, jeudi
* L'Épicerie Vintage, jeudi
* L'épicerie équitable Nantes, mercredi
* L'épimont, mardi
* L'épimont, jeudi
* La Base, jeudi
* La Bocalerie, mardi
* La Bonne Composition, mardi
* La Bonne Mesure, jeudi
* La Bonne Pioche, mardi
* La Bonne Pioche, mercredi
* La Boucherie du Village, jeudi
* La Bruyère qui rit - Drive Fermier, mardi
* La Camionnette des Fermiers, mercredi
* La Caravane, mercredi
* LA CAV, samedi
* La Cave Indépendante, samedi
* La Cave Montponnaise, mercredi
* La Coop des Dômes, mardi
* La Cyanopsitta, mercredi
* La Fabrique des Bières D'anjou, jeudi
* La Fabriquerie, mercredi
* La Ferme Chaillotine, mercredi
* La Ferme de Maneguet, jeudi
* La ferme de Pèbre, jeudi
* La Ferme des Perrelles, jeudi
* La Ferme des Perrières, mercredi
* La ferme du Barou, jeudi
* La Ferme du Génival, mercredi
* La Ferme du Logis, jeudi
* La Ferme du Matet, mardi
* La ferme du Mont Charvet, mercredi
* La Fontaine de Romainville, mardi
* La Grande Ferme, vendredi
* La Grange de Bel Air, mercredi
* La Halte Fermière, jeudi
* La Loco Bio, jeudi
* La main dans le vrac, mardi
* La main dans le vrac, jeudi
* La MIAM Locale, mercredi
* La Mine, jeudi
* La Nouvelle Douane, mardi
* La Nouvelle Douane, jeudi
* La Panaméenne, mardi
* La Panaméenne, samedi
* La Pantinoise, jeudi
* La Pantinoise, vendredi
* La part de Jeanne, mardi
* La petite cagette, samedi
* La Petite Cuisine de Sandrine, jeudi
* La Petite Réserve, mardi
* La petite épicerie, vendredi
* La Pépinière, samedi
* La Pépite Verte, mardi
* LA RUCH'BIO JOUGNE, mardi
* LA RUCH'BIO PONTARLIER, mardi
* La Ruche Majestic Passy, samedi
* La Récolte locale, mardi
* La Récolte locale, jeudi
* La Segoline, mardi
* La Source Barr, mercredi
* La Source Obernai, mercredi
* La Sphère Bio, mardi
* La Station, jeudi
* La Treille d'Or, jeudi
* La Tribu des Saveurs, mercredi
* La Vie Bio, vendredi
* La Vie Claire Aix les bains, mercredi
* La Vie Claire Amplepuis, mardi
* La Vie Claire Arcueil, vendredi
* La Vie Claire Bassens, mardi
* La Vie Claire Bourg la Reine, samedi
* La Vie Claire Bron, mercredi
* La Vie Claire Chaligny, vendredi
* La Vie Claire Champagne, mardi
* La Vie Claire Charenton, mardi
* La Vie Claire Comte Vert, mardi
* La Vie Claire Confluence, mardi
* La Vie Claire Courbevoie, jeudi
* La Vie Claire Fontenay aux roses, mardi
* La Vie Claire Gentil, mardi
* La Vie Claire Gentilly, mercredi
* La Vie Claire Haussmann, mardi
* La Vie Claire Issy-les-moulineaux, mercredi
* La Vie Claire Joinville, mercredi
* La Vie Claire Lafayette, jeudi
* La Vie Claire Mazarine, jeudi
* La Vie Claire Montluçon, mardi
* La Vie Claire Montrouge, jeudi
* La Vie Claire Morisot, mardi
* La Vie Claire Nogent sur Marne, mercredi
* La Vie Claire Oullins, jeudi
* La Vie Claire Saint Martin d'Hères, mercredi
* La Vie Claire Sainte Colombe, jeudi
* La Vie Claire Saumur, mardi
* La Vie Claire Saumur - Centre, vendredi
* La Vie Claire Seez, mardi
* La Vie Claire Sèvres, jeudi
* La Vie Claire Tarare, mercredi
* La Vie Claire Thimonnier, jeudi
* La Vie Claire Vienne, mercredi
* La Vie Claire Vitton, jeudi
* La Vie Saine Alès Rocade, jeudi
* La Vie Saine Bordeaux, mercredi
* La Vie Saine Chalon, jeudi
* La Vie Saine Chennevières, vendredi
* La Vie Saine Chenôve, mercredi
* La Vie Saine Conflans Sainte Honorine, mardi
* La Vie Saine Dijon, mardi
* La Vie Saine Dole, mardi
* La Vie Saine Montbéliard, mardi
* La Vie Saine Montpellier, jeudi
* La Vie Saine Quétigny, mardi
* Lagom, samedi
* Le Banc Sonore, mercredi
* Le Boulevard comme au Bistrot, mercredi
* Le Cabas de Steph, jeudi
* Le Café Vert, vendredi
* Le Caminito Cabaret, samedi
* Le Canon d'Achille, vendredi
* Le Cellier des Vignerons, samedi
* Le Chant Des Saisons, jeudi
* Le Comptoir de Chautagne, mardi
* Le Comptoir des Lions, mercredi
* Le Court Circuit, jeudi
* Le Dunois, jeudi
* Le Dépôt Vrac, mardi
* Le Fait-Tout, Café associatif, vendredi
* Le Fermier, vendredi
* Le GAG, jeudi
* Le Garage à Légumes, mercredi
* Le Garde-Manger, mercredi
* Le LAB Francais, samedi
* Le Local épicerie Frangy, jeudi
* Le Local épicerie Neuf, mardi
* LE LOCAL, epicerie vrac de quartier, mardi
* Le Marché Aux Saveurs, jeudi
* Le Marché de Léopold - Poitiers Saint benoit, jeudi
* Le marché des fruits défendus, samedi
* Le Pain d'Epi, mercredi
* Le Panier Bio, mardi
* Le Panier d'à côté, jeudi
* Le Panier du Pilat - Maclas, mercredi
* Le Pas-Sage Obligé, mardi
* Le petit bonheur, vendredi
* Le Petit Cabas Epicerie, jeudi
* Le Petit Cabas Epicerie, samedi
* Le Petit Nicoli, mardi
* Le Petit Porto, mercredi
* Le Placard en Vrac, jeudi
* Le Plaisir du Vrac, jeudi
* Le Potager d'Antan, mercredi
* Le Potager des Chartrons, jeudi
* Le pré du puy, jeudi
* Le Repère des Z'Héros, mercredi
* Le Rouge et le Verre Turin, mardi
* Le Royal, mardi
* Le sac de graines, samedi
* Le Trampaysan, jeudi
* Le Village Epicerie Fine, samedi
* LELL, mercredi
* Les 3 poireaux, mercredi
* LES 3 POIREAUX, Fabrique Bannier, mardi
* Les bocaux d'Alex, mercredi
* Les Bocaux d'Elise, mercredi
* Les bocaux de Camille, mercredi
* Les Bons Garçons, jeudi
* Les Boîtes @ Meuh Plessis-Robinson, samedi
* Les Celliers de Saint Vincent, samedi
* Les Comptoirs de la Bio - Ahuy, vendredi
* Les comptoirs de la Bio - Illzach, jeudi
* Les Comptoirs de la Bio - Poitiers, jeudi
* Les Comptoirs de la Bio Jet d'eau, mardi
* Les domaines Qui Montent 11e, mercredi
* Les Délices du Mézenc Fay, vendredi
* Les Délices du Mézenc Puy, jeudi
* Les fermes de Gally, vendredi
* Les fermes de Gally, samedi
* Les Fruits gourmands, mercredi
* Les Gaulois du Lauragais, jeudi
* Les Gourmandises de Catherine, mercredi
* Les Gourmandises de Catherine, samedi
* Les halles Biomonde, mercredi
* Les Jardins de la Petite Perriere, mercredi
* Les Joly Legumes, mardi
* Les Kiosques Ethiques, jeudi
* Les Paniers de Bonneuil, jeudi
* Les Pieds dans le Bocal, mercredi
* Les poireaux de Marguerite, samedi
* Les Pommes d'Abit, vendredi
* Les raviolis de Lilly, mercredi
* Les Robins des Bio, jeudi
* Les saveurs du terroir, mardi
* Les Serres de Mamie, mercredi
* Les Serres de Mamie, vendredi
* Les Vergers de  Saint Jean, jeudi
* Les Vergers de Beauce, vendredi
* Les Verts de Terre, jeudi
* Les vins du terroir, mercredi
* Les Épiterriens, mardi
* Livraison à domicile, mardi
* Livraison à domicile, mercredi
* Livraison à domicile, jeudi
* Livraison à domicile, vendredi
* LOVIN' Maison Alfort, samedi
* Lovin' Reuilly, mercredi
* Lovin' Reuilly, samedi
* Lupotie - Drive local et 0 déchet, jeudi
* Ma conciergerie SERFIM, mardi
* Ma Petite Ferme, jeudi
* Ma Poule, mercredi
* Mademoiselle Amande, mardi
* Mademoiselle vrac, jeudi
* Magasin du Clos Doré, mardi
* Magny Bio, mercredi
* Maison Graziana, jeudi
* Maison Plisson 1er, mercredi
* Maison Vimond, jeudi
* Mamie Mesure, mercredi
* Mille & Zim - Cave d'Asnières, jeudi
* Minjat, mercredi
* Mme Bio & M Vrac, mercredi
* Mon refuge : Le jardin, mercredi
* Monsieur Appert, vendredi
* Monsieur Appert, samedi
* Mood épicerie Vrac, vendredi
* NA-KA, mercredi
* Natur'l Bio, jeudi
* Nonante, mercredi
* Nonante, jeudi
* Nonante, vendredi
* Nonante, samedi
* Nosso, vendredi
* Nysa Amiral Mouchez, mardi
* Nysa Avenue de Versailles, mercredi
* Nysa Avenue de Versailles, vendredi
* Nysa Batignolles, mardi
* Nysa Capitaine Ferber, mardi
* Nysa Caulaincourt, mardi
* Nysa Caulaincourt, mercredi
* Nysa Chatillon, mardi
* Nysa Cler, vendredi
* Nysa Clichy, jeudi
* Nysa Clichy, vendredi
* Nysa Courbevoie, mercredi
* Nysa Daumesnil, mardi
* Nysa Enghiens-les-Bains, mardi
* Nysa Faubourg Montmartre, mercredi
* Nysa Issy les Moulineaux, mardi
* Nysa Lepic, mercredi
* Nysa Levallois, mercredi
* Nysa Martyrs, samedi
* Nysa Mayet, mercredi
* Nysa Montorgueil, jeudi
* Nysa Olive, mercredi
* Nysa Ordener, mardi
* Nysa Ordener, samedi
* Nysa Poissy, mardi
* Nysa Poncelet, mardi
* Nysa Poncelet, mercredi
* Nysa Poncelet, vendredi
* Nysa Puteaux, vendredi
* Nysa Pyrénées, samedi
* Nysa rendez-vous, jeudi
* Nysa rendez-vous, samedi
* Nysa Rueil Malmaison, vendredi
* Nysa Saint Antoine, mardi
* Nysa Saint Antoine, vendredi
* Nysa Saint-Charles, mercredi
* Nysa Sceaux, jeudi
* Nysa Secretan, mardi
* Nysa Suresnes Zola, mardi
* Nysa Tocqueville, vendredi
* Nysa Tocqueville, samedi
* Nysa Varenne, vendredi
* Nysa Voltaire, mardi
* O'Biotentic, jeudi
* O'Près, jeudi
* O'Vrac d'Amélie, vendredi
* On Passe au Vrac, mercredi
* PAMbio, mercredi
* Papilles et Papote, jeudi
* Parent'Vrac, jeudi
* Parma Mia, vendredi
* Paroles de Fromagers, mardi
* Patatadom Malesherbes, jeudi
* Patate, jeudi
* Paysa, mercredi
* Petit Jardin, jeudi
* Petits Zestes, mercredi
* Pimlico - Elan Nature 12ème, jeudi
* Pimlico - Elan Nature 12ème, vendredi
* Place au fromage, mercredi
* Plaisirs fermiers Poitiers, mercredi
* Poiscaille, mardi
* Poiscaille, mercredi
* Poiscaille, jeudi
* Poiscaille, vendredi
* Poiscaille Wissous, mardi
* Poiscaille Wissous, mercredi
* Poiscaille Wissous, jeudi
* Poiscaille Wissous, vendredi
* Popote & Papote, mercredi
* Popote épicerie moderne, mardi
* Popote épicerie moderne, samedi
* Prairial, mardi
* Prosper-Aimé, samedi
* Pré Délissieu, mercredi
* Pépins & Trognons, vendredi
* Pêcherie Eric Jacquier, mercredi
* Pêlmêl Meymac, mercredi
* Quartier Métisseur, mardi
* Ressourcerie La Mine, mercredi
* Ressourcerie La Mine Gentilly, samedi
* Restaurant Les Pianos, vendredi
* Robin des Bio, mardi
* SatiO épicerie, samedi
* Saveurs des Quatre Matins, mercredi
* Saveurs et vous rue de la Roquette, vendredi
* Saveurs et Vous rue Keller, mardi
* Saveurs et Vous rue Keller, samedi
* Savoie Touch Wine, vendredi
* Shakirail, jeudi
* Smile épicerie, mardi
* So'Vrac, mercredi
* Société Samo, mardi
* Spar des Hameaux, mardi
* Super Willette, mercredi
* Supercoop Bordeaux, mercredi
* Superfrais, jeudi
* Sur la Branche, mercredi
* Sur la Branche, jeudi
* Tchin Papa, mardi
* Terre de Vrac, mardi
* Test, mardi
* Thierry Schweitzer, jeudi
* Thierry Schweitzer - Le Serpent Vert, jeudi
* Tonton du Bread, mercredi
* Tot de Casa, jeudi
* Toucher Terre, jeudi
* TOUT BON, mardi
* Tout part en vrac, vendredi
* Un Caou dans l'bocal, vendredi
* Un tour en vrac, mercredi
* Vins des as, mercredi
* Vivrac Bio, vendredi
* Votre Terre, vendredi
* Vrac & Local l'Epicerie Eco Responsable, jeudi
* Vrac A'venir, jeudi
* Vrac en Vert, mardi
* Vrac en Vert, jeudi
* Vrac et Bocaux, jeudi
* Vrac&cie, vendredi
* Vrac'n Roll, mardi
* Vracomarche Marlenheim, jeudi
* Vracomarche Saverne, jeudi
* Vrac’yssime, jeudi
* We Vrac, mercredi
* Wild'Vrac, mardi
* Will, jeudi
* ZE DRIVE, mardi
* ZE DRIVE, jeudi
* Ça Vrac !, jeudi
* Écolieu MagnyÉthique, mardi
* Épi des Loges en Josas, vendredi
* Épicerie du village, mercredi
* Épicerie Hectare, vendredi
* Épicerie Terravrac, mercredi
* Épices & nous, jeudi
* Ô Local Bio, mercredi
* Ô P'tit Vrac, mardi
* Ô panier locas, mardi
* Ô plaisirs gourmands, jeudi

La listes des espèces est la suivante :
* Aiguillat
* Aiguillat Noir
* Alose
* Alose
* Amande de mer
* Anchois
* Anguille
* Aonori
* Araignée
* Arroche
* Aspe
* Aster
* Athérine
* Baliste
* Bar Commun
* Bar Moucheté
* Barbeau
* Barbue
* Barracuda
* Beryx
* Bette Maritime
* Bigorneau
* Bigorneau Nassa
* Bogue
* Bonite à dos rayé
* Bouquet
* Brochet
* Brosme
* Bulot
* Cabillaud
* Cardine
* Carpe
* Caviar d'Algues
* Céteau
* Chevesne
* Chinchard à Queue Jaune
* Chinchard Noir
* Congre
* Coque
* Coquille Saint Jacques
* Couteaux
* Crabe Bleu
* Crabe Vert
* Criste
* Daurade Royale
* Dente Commun
* Dorade Coryphène
* Dorade Grise
* Dorade Marbrée
* Dorade Rose
* Dulse
* Écrevisses
* Églefin
* Émissole
* Encornet
* Éperlan
* Espadon
* Étrille
* Fenouil
* Féra
* Feuille De Moutarde
* Flet
* Flétan
* Fleur De Criste
* Gardon
* Girelle
* Grande Castagnole
* Grande Vive
* Grateloupia
* Grondin
* Hareng
* Homard Bleu
* Huitres Creuses
* Huitres Plates
* Julienne
* Laitue De Mer
* Lancon
* Langouste Rose
* Langouste Rouge
* Langouste Royale
* Langoustine
* Liche
* Lieu Jaune
* Lieu Noir
* Limande Commune
* Limande-Sole
* Lingue Espagnole
* Lotte
* Lotte De Rivière
* Maigre
* Makaire Bleu
* Maquereau Commun
* Maquereau Espagnol
* Marlin
* Merlan
* Merlan Bleu
* Merlu
* Mérou
* Mostelle
* Moules
* Mulet
* Murène
* Murex
* Nori
* Obione
* Oblade
* Omble Chevalier
* Ombrine Côtière
* Opah
* Ormeau
* Orphie
* Oursins
* Pageot Acarné
* Pageot Commun
* Pagre
* Palomine
* Palourde
* Palourde Européenne
* Palourde Rose
* Palourdes
* Patelle
* Peau Bleue
* Perche
* Plie
* Plie Cynoglosse
* Pocheteau Gris
* Poissons de roche à bouillabaisse
* Poissons de roche à soupe
* Poivre De Maceron
* Pouce-Pied
* Poulpe
* Praire
* Raie
* Raie Pastenague
* Rascasse
* Requin Renard
* Requin-Hâ
* Roquette
* Rouget
* Roussette
* Sabre
* Sabre Noir
* Saint-Pierre
* Salicorne
* Sandre
* Sar Commun
* Sardine
* Saumon Atlantique
* Saupe
* Sébaste
* Sébaste Chevre
* Seiche
* Sériole
* Silure
* Sole Blonde
* Sole Brune
* Sole Perdrix
* Sole Sénégalaise
* Spaghettis De Mer
* Sparaillon Commun
* Sprat
* Tacaud
* Tassergal
* Tellines
* Thazard
* Thon Albacore
* Thon germon
* Thon Listao
* Thon Obèse
* Thon Rouge
* Thonine Commune
* Torpille
* Tourteau
* Truite De Mer
* Truite Fario
* Turbot
* Vernis
* Vieille Commune
* Vieille Coquette
* Violet
