# Cahier des Charges - Modernisation Portfolio

## 1. Direction Artistique Globale
- **Style** : "Glass / Soft" (Glassmorphism).
- **Couleurs** : Dégradés doux (Slate / Indigo / Purple), surfaces translucides (`backdrop-blur`), bordures fines.
- **Typographie** : 
  - Titres : *Vina Sans*
  - Corps : *Outfit*
- **Ambiance** : Moderne, épuré, fluide.

## 2. Section "Mon Parcours" (Timeline)
- **Structure** : Verticale (Zig-Zag / Alterné Gauche-Droite), la ligne se dessine au scroll.
- **Fonctionnalité clé** : Une ligne SVG animée qui relie les étapes.
- **Contenu** : 
  - Conserver les objets 3D (`BookScene`, `ComputerScene`, `SittedScene`) comme illustrations des étapes.
  - Facilité d'ajout de nouvelles étapes (tableau de données).
- **Animation** : Apparition progressive des étapes synchronisée avec la ligne.

## 3. Section "Mes Projets" (Browse)
- **Filtrage** : Conserver le système de **Tags** (Technologies, Types, Outils).
- **Layout** : Grille responsive de cartes "Glass".
- **Carte Projet** : 
  - Image de couverture.
  - Titre et description courte.
  - Baies/Tags visibles.
  - Effet de survol (hover) pour l'interactivité.
  - **Détails** : Page dédiée (nouvelle URL) pour chaque projet.
- **Composant 3D** : Intégration subtile des objets 3D associés aux projets (si applicable/performant).

## 4. Section "Contact"
- **Style** : Modernisation des blocs actuels (Téléphone, Mail, LinkedIn) en cartes "Glass" épurées.
- **Layout** : Centré, propre, avec iconographie moderne (FontAwesome).
- **Scene 3D** : Conserver `ContactScene` si elle s'intègre bien.

## 5. Nouvelle Section (Secondaire)
- **Type** : "Knowledge Map" / Graphe de connaissances.
- **Style** : Liens entre concepts (type Obsidian), interactif.
- **Priorité** : Basse (après modernization).

## 6. Technique & Performance
- **Framework Animation** : `framer-motion`.
- **Styling** : `Tailwind CSS v4`.
- **Navigation** : `react-router-dom` (à installler).
