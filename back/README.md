# Documentation du Backend – RoomBooker

## Structure du projet

```
back/
├── config/           # Configuration de la base de données
├── controllers/      # Logique métier pour chaque ressource (auth, post, type)
├── middleWare/       # Middlewares Express (auth, upload, etc.)
├── routes/           # Définition des routes API
├── services/         # Fonctions de service (accès DB, logique métier)
├── tests/            # Tests unitaires et d’intégration
├── uploads/          # Fichiers uploadés
├── index.js          # Point d’entrée du serveur Express
├── package.json      # Dépendances et scripts
└── jest.config.js    # Configuration des tests
```

## Principaux dossiers/fichiers

- **config/bd.js** : Configuration de la connexion à la base de données.
- **controllers/** : Contient la logique métier pour chaque entité (authentification, posts, types).
- **middleWare/** : Middlewares pour la gestion des tokens, des fichiers, etc.
- **routes/** : Définit les endpoints de l’API REST.
- **services/** : Fonctions de service pour l’accès aux données et la logique métier.
- **tests/** : Tests automatisés (Jest).
- **uploads/** : Répertoire pour les fichiers uploadés.

## Lancement du projet

1. Installer les dépendances :
   ```bash
   cd back
   npm install
   ```
2. Lancer le serveur :
   ```bash
   npm start
   ```

## Fonctionnalités principales
- Authentification JWT (login, register, vérification de token)
- Gestion des posts (CRUD)
- Gestion des types de posts
- Upload de fichiers (images)
- Sécurisation des routes via middleware
