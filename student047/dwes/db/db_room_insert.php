<?php

# Root directoty
$root = '/student047/dwes/';

# Get variables
$nombre = $_POST['nombre'];
$descripcion = $_POST['descripcion'];
$capacidad = $_POST['capacidad'];
$tipo = $_POST['tipo'];
$estado = $_POST['estado'];
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

# TODO Poner el 'estado'?
$sql =
    "INSERT INTO habitaciones (id, nombre, descripcion, capacidad, tipo, estado, precio) VALUES (DEFAULT, '" . $nombre . "', '" . $descripcion . "', " . $capacidad . ", '" . $tipo . "', '" . $estado . "', ".$precio . ")";
?>

<?php include('../components/header.php') ?>

<div class="m-3">

<?php
# Ejecutar query
if ($conn->query($sql) === TRUE) {
    echo '
    <div class="alert alert-success mt-2" role="alert">
        Habitación insertada correctamente!
    </div>
    ';
} else {
    echo
    '
    <div class="alert alert-danger mt-2" role="alert">'
        .'Error: ' . $sql . '<br>' . $conn->error.'
    </div>
    ';    
}

?>

<a class="btn btn-primary" href=<?php echo '"'. $root.'/index.php'.'"';?>>Inicio</a>

<a class="btn btn-primary" href=<?php echo '"'. $root.'/forms/form_select_room.php'.'"';?>>Ver habitaciones</a>

<a class="btn btn-primary" href=<?php echo '"'. $root.'/forms/form_insert_room.php'.'"';?>>Volver a INSERTAR</a>

</div>



<?php include('../components/footer.php') ?>