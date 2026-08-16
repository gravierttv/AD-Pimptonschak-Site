# Pimp Ton Shack — Site web v2.0

## Fichiers inclus
- `index.html` — Page d'accueil complète
- `contact.html` — Page contact avec coordonnées
- `style.css` — Styles unifiés
- `main.js` — Interactivités (menu, scroll, lightbox, formulaire)
- `404.html` — Page d'erreur personnalisée

## Ce qui a changé par rapport à v1.0

### Contenu
- ✅ Services remplis avec vrai texte + prix indicatifs
- ✅ Section "À propos" avec histoire et badges
- ✅ 3 témoignages clients
- ✅ Footer complet (4 colonnes : marque, services, contact, légal)
- ✅ Coordonnées visibles sur la page contact
- ✅ CTA sticky sur mobile

### Visuel
- ✅ Icônes SVG inline pour les services
- ✅ Galerie agrandie (260px) avec hover zoom + légendes
- ✅ Lightbox sur les images
- ✅ Section CTA pleine largeur avant le footer
- ✅ Badges et tags stylisés

### Technique
- ✅ Meta SEO (description, Open Graph, Twitter Card)
- ✅ Schema.org JSON-LD (LocalBusiness)
- ✅ Loading spinner sur le formulaire
- ✅ Champs supplémentaires (téléphone, type de projet)
- ✅ Page 404 stylisée
- ✅ Accessibilité améliorée (focus visible, aria-labels)

## Prochaines étapes
1. Remplace `images/hero-chalet.jpg` par une vraie photo dans le CSS (voir commentaire `.hero-bg`)
2. Remplace la photo placeholder dans "À propos" par une vraie photo d'équipe
3. Génère un favicon.png et apple-touch-icon.png
4. Mets à jour les vraies coordonnées (téléphone, email, adresse)
5. Crée un compte EmailJS et remplace les clés dans `main.js`
6. Remplis les vrais témoignages de tes clients

## Déploiement GitHub Pages
1. Push tous les fichiers sur ta branche `main`
2. Va dans Settings > Pages
3. Source : Deploy from a branch → `main` / `root`
4. Ton domaine perso doit pointer sur `username.github.io`
