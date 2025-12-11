# Site Pisciniste

Site vitrine pour un pisciniste professionnel à Cajarc (Lot, 46).

## Formulaire de contact

Le formulaire fonctionne de deux façons :

### En ligne (GitHub Pages)
Le formulaire utilise **Web3Forms** - aucune configuration nécessaire.

### En local (XAMPP)
Pour tester avec PHPMailer :

1. Ouvrir `config.php`
2. Remplacer par vos identifiants Gmail :
   - `smtp_user` : votre adresse Gmail
   - `smtp_pass` : votre mot de passe d'application Google
3. Dans `contact.html`, remplacer l'action du formulaire par :
```html
   <form method="post" action="traitement_formulaire.php" class="formulaire-contact">
```
4. Lancer XAMPP et accéder via `http://localhost/site-pisciniste/`