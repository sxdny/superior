<?php

// datos para la conexión a la base de datos
$server = "localhost";
$usuario = "root";
$contra = "";
$baseDeDatos = "hotel";

$conn = mysqli_connect($server, $usuario, $contra, $baseDeDatos);

// mensaje si ha funcionado o no la conexión a la base de datos
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// data de entrada y de salida
$dateIn = $_POST['date-in'];
$dateOut = $_POST['date-out'];

// hacer SELECT de habitaciones
// la date-in y la date-out me las guardo

$sql = "SELECT * FROM habitaciones;";
$result = mysqli_query($conn, $sql);
$habitaciones = mysqli_fetch_all($result, MYSQLI_ASSOC);

mysqli_close($conn);

?>

<?php include('components/header.php') ?>

<section class="container-fluid my-5 d-flex row row-cols-2 gap-4 justify-content-center">

    <?php
        foreach ($habitaciones as $habitacion) {
            echo '
            <div class="card col" style="width: 24rem;">
                <img src="./images/card-image.jpeg" class="card-img-top" alt="Preview habitación.">
                <div class="card-body">
                    <h5 class="card-title">'.$habitacion['nombre'].'</h5>
                    <p class="card-text">'.$habitacion['descripcion'].'</p>
                    <a href="#" class="btn btn-primary">Book</a>
                </div>
            </div>
            ';
        }
    ?>

</section>

<?php include('components/footer.php') ?>