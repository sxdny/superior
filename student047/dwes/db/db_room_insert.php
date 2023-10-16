<?php

# Get variables

# Connect to database

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

# Querys

# Hacer todo el resto

?>


