<?php include('components/header.php') ?>


<?php

session_start();

$habitacion_id = $_POST['habitacion_id'];

echo $habitacion_id;
echo '<br>';
echo $_SESSION['date-in'];
echo '<br>';
echo $_SESSION['date-out'];

?>

<?php include('components/footer.php') ?>