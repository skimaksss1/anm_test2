<?php
if (isset ($_POST['contactFF'])) {
  $to = "beketov@gmail.com";
  $from = "beketov@gmail.com";
  $subject = "Заполнена контактная форма вакансий на сайте ";
  $message = "Имя: ".$_POST['name']."\nEmail: ".$from."\nIP: ".$_SERVER['REMOTE_ADDR'];
 
  $boundary = md5(date('r', time()));
  $filesize = '';
  $headers = "MIME-Version: 1.0\r\n";
  $headers .= "From: " . $from . "\r\n";
  $headers .= "Reply-To: " . $from . "\r\n";
  $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";
  $message="
Content-Type: multipart/mixed; boundary=\"$boundary\"
 
--$boundary
Content-Type: text/plain; charset=\"utf-8\"
Content-Transfer-Encoding: 7bit
 
$message";
     if(is_uploaded_file($_FILES['chooseFile']['tmp_name'])) {
         $attachment = chunk_split(base64_encode(file_get_contents($_FILES['chooseFile']['tmp_name'])));
         $filename = $_FILES['chooseFile']['name'];
         $filetype = $_FILES['chooseFile']['type'];
         $filesize = $_FILES['chooseFile']['size'];
         $message.="
 
--$boundary
Content-Type: \"$filetype\"; name=\"$filename\"
Content-Transfer-Encoding: base64
Content-Disposition: attachment; filename=\"$filename\"
 
$attachment";
     }
   $message.="
--$boundary--";
 
  if ($filesize < 10000000) { // проверка на общий размер всех файлов. Многие почтовые сервисы не принимают вложения больше 10 МБ
    mail($to, $subject, $message, $headers);
    echo ', Ваше сообщение отправлено, спасибо!';
  } else {
    echo 'Извините, письмо не отправлено. Размер всех файлов превышает 10 МБ.';
  }
}
?>
