<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
//use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];

//Load Composer's autoloader
//require 'vendor/autoload.php';
require 'vendor/phpmailer/phpmailer/src/Exception.php';
require 'vendor/phpmailer/phpmailer/src/PHPMailer.php';
require 'vendor/phpmailer/phpmailer/src/SMTP.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);


//Server settings
//$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
$mail->isSMTP(); //Send using SMTP
$mail->Host = 'ssl://smtp.mail.ru'; //Set the SMTP server to send through
$mail->SMTPAuth = true; //Enable SMTP authentication
$mail->Username = 'lubosvet108@mail.ru'; //SMTP username
$mail->Password = 'uqcUmVb1HCm0sD9pisBa'; //SMTP password
$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; //Enable implicit TLS encryption
$mail->Port = 465; //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

//Recipients
$mail->setFrom('lubosvet108@mail.ru', 'PULSE');
$mail->addAddress('vrbdas@gmail.com', 'Admin'); //Add a recipient
//$mail->addAddress('ellen@example.com'); //Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');

//Attachments
//$mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

//Content
$mail->CharSet = 'UTF-8';
$mail->Encoding = 'base64';
$mail->isHTML(true); //Set email format to HTML
$mail->Subject = 'Данные';
$mail->Body = '
    Пользователь оставил данные <br> 
    Имя: ' . $name . ' <br>
    Номер телефона: ' . $phone . '<br>
    E-mail: ' . $email . '';

if(!$mail->send()) {
    return false;
} else {
    return true;
}


?>