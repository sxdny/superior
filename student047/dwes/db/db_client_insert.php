<?php

# Root directoty
$root = '/student047/dwes/';

# Get variables
$nombre = $_POST['nombre'];
$dni = $_POST['dni'];
$email = $_POST['email'];
$telefono = $_POST['telefono'];

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
    "INSERT INTO clientes (id, nombre, DNI, email, telefono) VALUES (DEFAULT, '" . $nombre . "', '" . $dni . "', '" .$email . "', " . $telefono . ")";
?>

<?php include('../components/header.php') ?>

<div class="m-3">

<?php

# Ejecutar query con mensaje dependiendo del estado
if ($conn->query($sql) === TRUE) {
    echo '
    <div class="alert alert-success mt-2" role="alert">
        Cliente insertado correctamente!
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

<a class="btn btn-primary" href=<?php echo '"'. $root.'/forms/form_select_client.php'.'"';?>>Ver clientes</a>

<a class="btn btn-primary" href=<?php echo '"'. $root.'/forms/form_insert_client.php'.'"';?>>Volver a INSERTAR</a>

</div>



<?php include('../components/footer.php') ?>