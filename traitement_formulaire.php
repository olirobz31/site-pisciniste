<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

// On récupère les secrets depuis le fichier config.php
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
        $mail->SMTPOptions = [
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            ]
        ];
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = $config['smtp_user'];   // depuis config.php
        $mail->Password   = $config['smtp_pass'];   // depuis config.php
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;
        $mail->CharSet    = 'UTF-8';

        // Destinataire et expéditeur
        $mail->setFrom($config['smtp_user'], 'Formulaire Contact');
        $mail->addAddress($config['smtp_user']);
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
