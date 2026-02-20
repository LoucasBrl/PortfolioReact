export const projects = [
  {
    id: "minicoffee-network",
    title: "Minicoffee Network",
    description: "Création d'un réseau d'entreprise fictif",
    descriptionlg: "Ce projet consiste en la création d'un réseau d'entreprise fictif pour Minicoffee, incluant la configuration de routeurs, et de multiples services (DHCP, NAS, DNS interne, Wiki, LDAP, etc.). Ce projet, qui a été mon premier lié a l'administration système, m'a appris énormement sur l'architecture d'un réseau, la cybersécurité et m'a grandement influencé sur mon choix de parcours professionnel",
    details: '5 personnes',
    image: '/projectimages/minicoffee.png',
    obj: 'minicoffee',
    tags: ['Network Architecture', 'Proxmox']
  },
  {
    id: "artswipe",
    title: 'ArtSwipe',
    description: 'Une application pour organiser vos futures visites de musées',
    descriptionlg: "Artswipe est une application web avec un fonctionnement similaire au célèbre Tinder, mais pour les musées. Vous pouvez swiper les œuvres d'art pour les aimer ou les ignorer, et ainsi organiser vos futures visites de musées, l'application utilise un algorithme de recommandation, qui permet de vous suggerer des musées adaptés a vos goûts artistiques. Ce projet m'a appris énormement sur le développement back-end, et comment mener a bien un projet en prenant en compte la séparation front/back",
    details: '7 personnes, Responsable Back-End',
    image: '/projectimages/Artswipe.png', 
    obj: 'tableau',
    tags: ['react', 'backend', 'node', 'Algorithm']
  },
  {
    id: "costle",
    title: 'Costle',
    description: 'Un jeu multijoueur aux mécaniques non intuitives',
    descriptionlg: "Costle est un de mes projets de jeu multijoueur, construit grace au moteur de jeu Unity, il est inspiré notamment du jeu 'Muck', qui propose une experience de jeu unique de par ses mécaniques de jeu non-intuitives, et un gameplay basé sur la survie. Ce projet personnel m'as appris enormement sur le développement de jeu video, sur le langage C# et m'a initié a la modélisation 3D",
    details: '1 personne (Projet Personnel)',
    image: '/projectimages/Costle.png', 
    obj: 'costle',
    tags: ['Game Developpement','Unity', 'csharp']
  },
  {
    id: "nutri-score",
    title: 'Nutri-Score',
    description: 'Analyse de données liées a la nutrition',
    descriptionlg: "Ce projet consiste en l'analyse de données liées a la nutrition, en utilisant le langage R et SQL. Pour se faire, j'ai utilisé la base de donnée libre OpenFoodFacts, qui contient des informations sur les produits alimentaires, et j'ai réalisé des analyses statistiques pour en tirer des conclusions sur la qualité nutritionnelle des produits. Ce projet m'a permis de comprendre comment traiter des données avec clarté, et faire correspondre des données entre elles, afin d'en déduire des conclusions.",
    details: '2 personnes',
    image: '/projectimages/nutriscore.jpg', 
    obj: 'nutriscore',
    tags: ['Data Analysis', 'R', 'SQL']
  },
  {
    id: "llama-1b",
    title: 'Llama 1.1B',
    description: "Déploiement d'un modèle d'IA en local",
    descriptionlg: "Durant ce projet, j'ai déployé le modèle d'IA Llama 1.1B en local, en utilisant la plateforme Hugging Face. De par les contraintes materielle de l'ordinateur sur lequel j'ai installé ce modèle, j'ai du utiliser plusieurs techniques d'optimisation, comme la quantification des poids du modèle, la gestion des tokens d'entrées/sorties et la mise en place d'une IA 'routeur' (60M param) pour rediriger les requetes complexes. Cela m'a appris les bases sur l'hebergement de modèles de langage et d'optimisation sur ces derniers",
    details: '1 personne (Projet Personnel)',
    image: '/projectimages/Tinyllama.png', 
    obj: 'Llama',
    tags: ['AI','Network Architecture','Hugging face', 'python']
  },
];
