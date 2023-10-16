<?php

// datos para la conexión a la base de datos
$server = "localhost";
$usuario = "root";
$contra = "";
$baseDeDatos = "hotel";

// para tener la ruta principal del proyecto (desde donde se ejecuta)
// echo $_SERVER['DOCUMENT_ROOT'];

$conn = mysqli_connect($server, $usuario, $contra, $baseDeDatos);

// mensaje si ha funcionado o no la conexión a la base de datos
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// data de entrada y de salida

session_start();

$dateIn = $_POST['date-in'];
$_SESSION['date-in'] = $dateIn;
$dateOut = $_POST['date-out'];
$_SESSION['date-out'] = $dateOut;

// hacer SELECT de habitaciones
// la date-in y la date-out me las guardo

$sql = "SELECT * FROM habitaciones;";
$result = mysqli_query($conn, $sql);
$habitaciones = mysqli_fetch_all($result, MYSQLI_ASSOC);

mysqli_close($conn);

?>

<?php include('../components/header.php') ?>

<section class="container-fluid my-5 d-flex row gap-3 justify-content-center">
<!-- Mostrar cada una de las habitaciones disponibles. -->
        <?php
        foreach ($habitaciones as $habitacion) {
            # FIXME Arreglar el INSERT a hacer reservas.
            echo '
            <form class="col" action="db_reservations_insert.php" method="POST">
            <div class="card" style="width: 20rem;">
                <img src="../images/card-image.jpeg" class="card-img-top" alt="Preview habitación.">
                <div class="card-body">
                    <h5 class="card-title">' . $habitacion['nombre'] . '</h5>
                    <p class="card-text">' . $habitacion['descripcion'] . '</p>
                    <input type="text" name="habitacion_id" value="'. $habitacion['id']. '" hidden>

                    <button type="submit" class="btn btn-primary">Reservar</button>
                </div>
            </div>
            </form>
            ';
        }
        ?>
</section>

<?php include('../components/footer.php') ?>