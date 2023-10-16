<?php

# Get variables
$nombre = $_POST['nombre'];
$descripcion = $_POST['descripcion'];
$capacidad = $_POST['capacidad'];
$tipo = $_POST['tipo'];
$precio = $_POST['precio'];

# Connect to database

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

# Querys

$sql =
"
INSERT INTO habitaciones (id, nombre, descripcion, capacidad, tipo, precio)
VALUES (DEFAULT,".$nombre.",".$descripcion.",".$capacidad.",".$tipo.",".$precio.")
";
mysqli_query($conn, $sql);

?>

<?php include('../components/header.php') ?>

<?php

print_r ($_POST);

?>

<?php include('../components/footer.php') ?>


