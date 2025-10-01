# Documentation du Frontend – RoomBooker

## Structure du projet

```
front/
├── public/           # Fichiers statiques (images, SVG, etc.)
├── src/
│   ├── assets/       # Images et icônes utilisées dans l'app
│   ├── components/   # Composants réutilisables (Card, LoginForm, etc.)
│   ├── hooks/        # Hooks personnalisés (AuthContext, useAuth)
│   ├── Layout/       # Composants de structure (Header, Footer, Layout)
│   ├── routes/       # Définition des routes et protections (RequireAuth)
│   ├── services/     # Fonctions d'appel API (AuthServices, PostServices, TypeServices)
│   ├── utils/        # Fonctions utilitaires (auth, axios)
│   ├── views/        # Pages principales (Home, Login, CreatePost, etc.)
│   ├── index.css     # Styles globaux
│   ├── main.jsx      # Point d'entrée React
│   └── router.jsx    # Configuration du routeur
├── index.html        # Fichier HTML principal
├── package.json      # Dépendances et scripts
└── vite.config.js    # Configuration Vite
```

## Principaux dossiers/fichiers

- **components/** : Composants UI réutilisables.
- **hooks/** : Gestion du contexte d’authentification et hooks personnalisés.
- **Layout/** : Structure de la page (Header, Footer, Layout général).
- **routes/** : Définition des routes, protection des routes privées.
- **services/** : Fonctions pour communiquer avec l’API backend.
- **utils/** : Fonctions utilitaires (authentification, configuration axios).
- **views/** : Pages principales de l’application.

## Authentification
- Utilisation d’un contexte (`AuthContext`) pour stocker l’état de l’utilisateur connecté.
- Les routes privées sont protégées via le composant `RequireAuth`.
- Les tokens sont stockés côté client (localStorage ou context).

## Appels API
- Les services (`AuthServices.js`, `PostServices.js`, `TypeServices.js`) centralisent les appels HTTP vers le backend.
- Utilisation d’axios pour les requêtes HTTP.

## Navigation
- Utilisation de React Router pour la navigation entre les pages.
- Les routes sont définies dans `router.jsx` et protégées si besoin.

## Lancement du projet

1. Installer les dépendances :
	```bash
	cd front
	npm install
	```
2. Lancer le serveur de développement :
	```bash
	npm run dev
	```
