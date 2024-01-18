<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $position = $_POST['list'];

    $file = $_FILES['chooseFile'];
    $fileTmpPath = $file['tmp_name'];
    $fileName = $file['name'];
    $fileType = $file['type'];
    $fileSize = $file['size'];

    $to = 'beketovekb@gmail.com';
    $subject = 'Job Application';
    $headers = 'From: beketovekb@gmail.com' . "\r\n" .
               'Content-Type: text/plain; charset=utf-8' . "\r\n";

    $uploadDir = 'resumes/';
    $uploadedFilePath = $uploadDir . $fileName;

    if (move_uploaded_file($fileTmpPath, $uploadedFilePath)) {
        $body = "Name: $name\nPosition: $position";

        $multipartBoundary = md5(time());
        $headers .= 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-Type: multipart/mixed; boundary="' . $multipartBoundary . '"';

        $fileContent = file_get_contents($uploadedFilePath);
        $fileAttachment = chunk_split(base64_encode($fileContent));

        $multipartMessage = "--" . $multipartBoundary . "\r\n" .
                            "Content-Type: text/plain; charset=utf-8\r\n" .
                            "Content-Transfer-Encoding: 8bit\r\n\r\n" .
                            $body . "\r\n\r\n" .
                            "--" . $multipartBoundary . "\r\n" .
                            "Content-Type: application/octet-stream\r\n" .
                            "Content-Transfer-Encoding: base64\r\n" .
                            "Content-Disposition: attachment; filename=\"" . $fileName . "\"\r\n\r\n" .
                            $fileAttachment . "\r\n\r\n" .
                            "--" . $multipartBoundary . "--";

        if (mail($to, $subject, $multipartMessage, $headers)) {
            echo 'Application submitted successfully';
        } else {
            echo 'An error occurred while submitting the application.';
        }
    } else {
        echo 'Failed to move the uploaded file.';
    }
}
?>
