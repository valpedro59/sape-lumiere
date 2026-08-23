# Festival Sapé & Lumière

Site vitrine du **Festival Sapé & Lumière**, un événement culturel fictif célébrant l'élégance sapologique, la musique live et l'art lumineux à Brazzaville, sur trois soirs.

Projet réalisé dans le cadre du **Cas Pratique S10 — Akieni Academy** (parcours Full Stack, en binôme avec le parcours Business Analyst).

**Démo en ligne :** [valpedro59.github.io/sape-lumiere](https://valpedro59.github.io/sape-lumiere/)

---

## Aperçu

Site one-page, mobile-first, entièrement statique — HTML / CSS / JavaScript vanilla, sans framework ni backend. Direction artistique inspirée de l'éditorial mode (contraste serif/sans-serif façon magazine), avec la palette du festival :

| Couleur                   | Usage                |
| ------------------------- | -------------------- |
| `#1b7b4b` — vert émeraude | Couleur primaire     |
| `#c81e51` — rouge/corail  | Accent secondaire    |
| `#e5b80b` — or            | Accent, CTA          |
| `#f7f8f6` — ivoire        | Fond clair           |
| `#1e232a` — encre         | Texte, fonds sombres |

Typographie : **Playfair Display** (titres, serif à contraste éditorial) + **Lato** (texte courant, sans-serif).

---

## Fonctionnalités

- **Accueil** — hero plein écran avec compte à rebours dynamique jusqu'à l'ouverture du festival ; une fois la date atteinte, le compteur est remplacé par un message d'accueil.
- **Navigation** — menu mobile en surimpression (burger), fermeture au clic extérieur ou sur un lien, verrouillage du scroll de fond pendant l'ouverture du menu.
- **Programme** — trois onglets (Vendredi / Samedi / Dimanche), un seul jour affiché à la fois.
- **Line-up** — grille d'artistes filtrable par catégorie (Musique / Mode & Sapé / Art Lumière), mise en page en mosaïque sur desktop qui s'adapte automatiquement au nombre d'éléments visibles après filtrage.
- **Billetterie** — deux formules (Pass 1 jour / Pass 3 jours), chaque bouton "Réserver" ouvre WhatsApp avec un message pré-rempli mentionnant le pass choisi.
- **Partenaires** — bandeau de logos.
- **FAQ** — accordéon (une question ouverte à la fois, icône +/− dynamique).
- **Contact** — formulaire avec validation JavaScript (champs requis, format e-mail, longueur minimale) et retour visuel en cas d'erreur ou de succès.
- **Responsive** — CSS écrit mobile-first, avec paliers à 680px (tablette) et 1024px (desktop).

---

## Structure du repo

```
sape-lumiere/
├── images/          # visuels du site (hero, line-up, logos partenaires)
├── index.html       # structure de la page
├── style.css        # styles, mobile-first
├── main.js          # interactions (navbar, onglets, filtres, FAQ, countdown, validation, WhatsApp)
└── README.md
```

---

## Lancer le projet en local

Aucune dépendance ni installation nécessaire.

```bash
git clone https://github.com/valpedro59/sape-lumiere.git
cd sape-lumiere
```

Ouvrir simplement `index.html` dans un navigateur, ou servir le dossier avec une extension type _Live Server_ pour profiter du rechargement automatique.

---

## Déploiement

Le site est déployé via **GitHub Pages** depuis la branche principale du repo.
👉 [valpedro59.github.io/sape-lumiere](https://valpedro59.github.io/sape-lumiere/)

---

## Notes techniques

- Le numéro WhatsApp utilisé pour les réservations est défini dans `main.js` (constante `WHATSAPP_NUMBER`) — à mettre à jour si besoin.
- La date d'ouverture du festival (cible du compte à rebours) est définie dans `index.html` via l'attribut `data-target` sur `#countdown`.
- Aucune donnée n'est envoyée à un serveur : le formulaire de contact est validé côté client uniquement (pas de backend sur ce projet).

---

## Auteur

**Val Pedro** — [github.com/valpedro59](https://github.com/valpedro59)

Cas pratique réalisé dans le cadre de la formation **Akieni Academy**.
