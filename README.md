# E-Aka'njo

E-Aka'njo est une application e-commerce complète dédiée à la vente de vêtements en ligne. Le projet est construit selon une architecture MERN (MongoDB, Express, React, Node.js) avec une interface d'administration dédiée à la gestion du catalogue et des commandes.

## Fonctionnalités

### Côté client
- Catalogue de produits avec filtres par catégorie, sous-catégorie et prix
- Recherche de produits par nom
- Fiche produit détaillée (images, tailles, description)
- Panier d'achat (ajout, modification de quantité, suppression)
- Authentification (inscription / connexion) par JSON Web Token
- Tunnel de commande avec formulaire d'adresse de livraison
- Sélection du point de livraison sur une carte interactive (Leaflet / OpenStreetMap), avec géocodage inverse pour préremplir la ville et la rue
- Paiement en ligne par carte bancaire via Stripe, ou paiement à la livraison
- Suivi des commandes passées

### Côté administration
- Ajout de produits avec upload de plusieurs images (hébergées sur Cloudinary)
- Liste des produits avec filtre par catégorie et recherche
- Suppression de produits
- Suivi et mise à jour du statut des commandes (en attente, en préparation, en livraison, livré, annulé)

## Stack technique

**Frontend**
- React 19 (Vite)
- Tailwind CSS 4
- Zustand (gestion d'état)
- React Router
- React Leaflet / Leaflet (carte de livraison)
- Axios
- React Hot Toast

**Backend**
- Node.js / Express
- MongoDB / Mongoose
- JSON Web Token (authentification par cookie httpOnly)
- Multer (upload de fichiers)
- Cloudinary (hébergement des images)
- Stripe (paiement par carte)

## Architecture du projet

```
E-Aka'njo/
├── BackEnd/
│   └── src/
│       ├── controllers/     Logique métier (auth, produits, panier, commandes)
│       ├── db/               Connexion à MongoDB
│       ├── middleware/       Authentification, upload de fichiers
│       ├── models/           Schémas Mongoose (User, Products, Order)
│       ├── routes/           Définition des routes de l'API
│       └── server.js         Point d'entrée du serveur Express
└── FrontEnd/
    └── src/
        ├── appContext/        Contexte global (focus de navigation, mode admin)
        ├── components/        Composants réutilisables
        ├── pages/             Pages de l'application
        ├── stores/            Stores Zustand (utilisateur, produits, panier, commandes)
        └── utils/             Constantes et données statiques
```

## Installation

### Prérequis
- Node.js 18 ou supérieur
- Une base de données MongoDB (locale ou Atlas)
- Un compte Cloudinary
- Un compte Stripe (mode test suffisant pour le développement)

### Backend

```bash
cd BackEnd
npm install
cp .env.example .env
```

Renseigner les variables d'environnement dans `.env` :

| Variable | Description |
|---|---|
| `MONGODB_URI` | Chaîne de connexion à la base MongoDB |
| `SECRET_ACCESS` | Clé secrète utilisée pour signer les tokens JWT |
| `NODE_ENV` | `development` ou `production` |
| `CLOUDINARY_NAME` | Nom du cloud Cloudinary |
| `CLOUDINARY_API_KEY` | Clé API Cloudinary |
| `CLOUDINARY_SECRET_KEY` | Clé secrète Cloudinary |
| `STRIPE_SECRET_KEY` | Clé secrète Stripe (`sk_test_...` en développement) |
| `FRONTEND_URL` | URL du frontend, utilisée pour les redirections Stripe et le CORS |

```bash
npm run dev
```

### Frontend

```bash
cd FrontEnd
npm install
cp .env.example .env
```

Renseigner la variable d'environnement dans `.env` :

| Variable | Description |
|---|---|
| `VITE_BACKEND_URL` | URL de l'API backend (ex. `http://localhost:3000`) |

```bash
npm run dev
```

## API - Aperçu des routes principales

| Méthode | Route | Description | Accès |
|---|---|---|---|
| POST | `/api/auth/signup` | Inscription | Public |
| POST | `/api/auth/login` | Connexion | Public |
| POST | `/api/auth/logout` | Déconnexion | Authentifié |
| GET | `/api/auth/user` | Récupérer l'utilisateur connecté | Authentifié |
| GET | `/api/product/getProducts` | Liste des produits | Public |
| GET | `/api/product/getProduct/:productId` | Détail d'un produit | Public |
| POST | `/api/product/add` | Ajouter un produit | Admin |
| PUT | `/api/product/updateProduct/:productId` | Modifier un produit | Admin |
| DELETE | `/api/product/deleteProduct/:productId` | Supprimer un produit | Admin |
| GET | `/api/cart/getAllCart` | Récupérer le panier | Authentifié |
| POST | `/api/cart/addCart` | Ajouter un produit au panier | Authentifié |
| PUT | `/api/cart/updateCart/:productId` | Modifier la quantité | Authentifié |
| DELETE | `/api/cart/removeCart` | Retirer un produit (ou vider la carte) | Authentifié |
| POST | `/api/order/create` | Créer une commande (paiement à la livraison) | Authentifié |
| POST | `/api/order/create-checkout-session` | Créer une session de paiement Stripe | Authentifié |
| GET | `/api/order/verify-session/:sessionId` | Vérifier le paiement Stripe | Authentifié |
| GET | `/api/order/my-orders` | Historique des commandes de l'utilisateur | Authentifié |
| GET | `/api/order/all` | Liste de toutes les commandes | Admin |
| PUT | `/api/order/update-status/:orderId` | Mettre à jour le statut d'une commande | Admin |

## Paiement Stripe
