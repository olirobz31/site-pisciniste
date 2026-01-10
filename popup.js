/* ================================================
   POPUP DEVIS GRATUIT - JavaScript
   ================================================ */

(function() {
    'use strict';

    // Configuration
    const POPUP_DELAY = 5000; // 5 secondes
    const COOKIE_NAME = 'popup_devis_closed';
    const COOKIE_DURATION = 1; // 1 jour

    // Ne pas afficher sur contact.html
    function isContactPage() {
        return window.location.pathname.includes('contact.html') ||
               window.location.pathname.endsWith('contact');
    }

    // Gestion des cookies
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/;SameSite=Lax';
    }

    function getCookie(name) {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.startsWith(name + '=')) {
                return cookie.substring(name.length + 1);
            }
        }
        return null;
    }

    // Vérifier si le popup doit s'afficher
    function shouldShowPopup() {
        if (isContactPage()) return false;
        if (getCookie(COOKIE_NAME)) return false;
        return true;
    }

    // Créer le HTML du popup
    function createPopupHTML() {
        return `
            <div class="popup-overlay" id="popupOverlay"></div>
            <div class="popup-container" id="popupContainer">
                <button class="popup-close" id="popupClose" aria-label="Fermer">&times;</button>
                <div class="popup-header">
                    <h2>Demandez votre devis gratuit</h2>
                    <p>Recevez une estimation personnalisée sous 24h</p>
                </div>
                <form class="popup-form" id="popupForm" action="https://api.web3forms.com/submit" method="POST">
                    <input type="hidden" name="access_key" value="9a01e0ea-0cc2-487d-8e01-f760a34845cf">
                    <input type="hidden" name="subject" value="Nouvelle demande de devis (popup)">
                    <input type="hidden" name="from_name" value="Popup Devis - Site Piscine">
                    <input type="hidden" name="redirect" value="https://olirobz31.github.io/site-pisciniste/merci.html">
                    <div class="form-group">
                        <label for="popupNom">Nom *</label>
                        <input type="text" id="popupNom" name="nom" placeholder="Votre nom" required>
                    </div>
                    <div class="form-group">
                        <label for="popupEmail">Email *</label>
                        <input type="email" id="popupEmail" name="email" placeholder="votre@email.com" required>
                    </div>
                    <div class="form-group">
                        <label for="popupTel">Téléphone</label>
                        <input type="tel" id="popupTel" name="telephone" placeholder="06 XX XX XX XX">
                    </div>
                    <div class="form-group">
                        <label for="popupMessage">Votre projet</label>
                        <textarea id="popupMessage" name="message" placeholder="Décrivez brièvement votre projet piscine..."></textarea>
                    </div>
                    <div class="h-captcha" data-captcha="true"></div>
                    <button type="submit" class="popup-submit">Envoyer ma demande</button>
                </form>
            </div>
        `;
    }

    // Afficher le popup
    function showPopup() {
        const overlay = document.getElementById('popupOverlay');
        const container = document.getElementById('popupContainer');

        if (overlay && container) {
            overlay.classList.add('active');
            container.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // Fermer le popup
    function closePopup() {
        const overlay = document.getElementById('popupOverlay');
        const container = document.getElementById('popupContainer');

        if (overlay && container) {
            overlay.classList.remove('active');
            container.classList.remove('active');
            document.body.style.overflow = '';

            // Définir le cookie pour 24h
            setCookie(COOKIE_NAME, 'true', COOKIE_DURATION);
        }
    }

    // Gérer la soumission du formulaire
    function handleSubmit(e) {
        // Définir le cookie avant la soumission (l'utilisateur sera redirigé)
        setCookie(COOKIE_NAME, 'true', COOKIE_DURATION);
        // Laisser le formulaire se soumettre normalement (pas de e.preventDefault())
    }

    // Initialisation
    function init() {
        if (!shouldShowPopup()) return;

        // Charger le script hCaptcha de Web3Forms
        const hcaptchaScript = document.createElement('script');
        hcaptchaScript.src = 'https://web3forms.com/client/script.js';
        hcaptchaScript.async = true;
        hcaptchaScript.defer = true;
        document.head.appendChild(hcaptchaScript);

        // Injecter le HTML
        const popupWrapper = document.createElement('div');
        popupWrapper.id = 'popupDevisWrapper';
        popupWrapper.innerHTML = createPopupHTML();
        document.body.appendChild(popupWrapper);

        // Événements
        document.getElementById('popupClose').addEventListener('click', closePopup);
        document.getElementById('popupOverlay').addEventListener('click', closePopup);
        document.getElementById('popupForm').addEventListener('submit', handleSubmit);

        // Fermer avec Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closePopup();
            }
        });

        // Afficher après le délai
        setTimeout(showPopup, POPUP_DELAY);
    }

    // Lancer quand le DOM est prêt
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
