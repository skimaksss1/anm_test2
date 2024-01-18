<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['plhName'];
    $email = $_POST['inEmail'];
    $message = $_POST['plhQues'];
    $num = $_POST['numPhone'];

    $to = 'beketovekb@gmail.com'; // Укажите адрес получателя
    $subject = 'Форма обратной связи';
    $body = "Имя: $name\nEmail: $email\nНомер телефона:$num\nСообщение:\n$message";
    $headers = "From: info@firdaws.kz"; // Укажите вашу почту

    if (mail($to, $subject, $body, $headers)) {
        http_response_code(200);
        echo "Сообщение успешно отправлено!";
    } else {
        http_response_code(500);
        echo "Ошибка при отправке сообщения.";
    }
} else {
    http_response_code(403);
    echo "Доступ запрещен.";
}
?>
