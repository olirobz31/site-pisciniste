<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

$config = require 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Récupération des données du formulaire
    $nom = htmlspecialchars(trim($_POST['nom']));
    $prenom = htmlspecialchars(trim($_POST['prenom']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));

    $mail = new PHPMailer(true);

    try {
        // Configuration du serveur SMTP
        $mail->isSMTP();
        $mail->SMTPOptions = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    )
);
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'votre-mail@gmail.com';        // ⚠️ Remplace par ton Gmail
        $mail->Password   = 'votre-mot-de-passe';        // ⚠️ Remplace par ton mot de passe 16 caractères
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;
        $mail->CharSet    = 'UTF-8';

        // Destinataire et expéditeur
        $mail->setFrom('votre-mail@gmail.com', 'Formulaire Contact');  // ⚠️ Remplace par ton Gmail
        $mail->addAddress('votre-mail@gmail.com');                      // ⚠️ Remplace par ton Gmail
        $mail->addReplyTo($email, "$prenom $nom");

        // Contenu de l'email
        $mail->isHTML(true);
        $mail->Subject = "Nouveau message de $prenom $nom";
        $mail->Body    = "
            <h2>Nouveau message depuis le site</h2>
            <p><strong>Nom :</strong> $nom</p>
            <p><strong>Prénom :</strong> $prenom</p>
            <p><strong>Email :</strong> $email</p>
            <p><strong>Message :</strong></p>
            <p>$message</p>
        ";

        $mail->send();
        echo "<h2>Merci $prenom ! Votre message a bien été envoyé.</h2>";
        echo "<p><a href='contact.html'>Retour au formulaire</a></p>";

    } catch (Exception $e) {
        echo "Erreur lors de l'envoi : {$mail->ErrorInfo}";
    }

} else {
    echo "Accès non autorisé.";
}
?>
