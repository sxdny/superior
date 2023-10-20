<?php

# TODO Hacer que esto también funciones con los includes
$root = '/student047/dwes/';

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

// hacer SELECT de habitaciones

// Captura valor de las variables

// Menú de filtrado

// if (isset($_POST['filtro'])) {
//     $filtro = $_POST['filtro'];

//     // Cambio del SQL

//     if ($filtro == 'All') {
//         $sql =
//             "SELECT * FROM clients;";
//     } else {
//         $sql =
//             "SELECT * FROM habitaciones
//         WHERE estado = '" . $filtro . "';";
//     }

//     $result = mysqli_query($conn, $sql);
//     $habitaciones = mysqli_fetch_all($result, MYSQLI_ASSOC);

//     mysqli_close($conn);

// } else {
//     $sql = "SELECT * FROM habitaciones;";
//     $result = mysqli_query($conn, $sql);
//     $habitaciones = mysqli_fetch_all($result, MYSQLI_ASSOC);

//     mysqli_close($conn);
// }

$sql = "SELECT * FROM clientes;";
$result = mysqli_query($conn, $sql);
$clients = mysqli_fetch_all($result, MYSQLI_ASSOC);

mysqli_close($conn);

?>

<?php include('../components/header.php') ?>

<section class="pt-5 m-5">

    <!-- Buscador -->

    <div class="d-flex justify-content-between">
        <div class="heading">
            <h3 class="mt-3">Ver clientes <span class="badge bg-secondary">Admin</span></h3>
        </div>
        <div class="filter">
            <div class="dropdown">
                <form class="d-flex" action="form_select_room.php" method="POST">
                    <select disabled class="form-select" aria-label="Default select example" name="filtro" required>
                        <option value="" selected>Filtrar por</option>
                        <!-- TODO Hacer submenús -->
                        <!-- En vez de Filtrar por, separarlo y ya -->
                        <option value="All">Todas las habitaciones</option>
                        <option value="Available">Disponibles</option>
                        <option value="Booked">Reservadas</option>
                    </select>
                    <button disabled class="btn btn-primary ms-4" type="submit">Buscar</button>
                </form>
            </div>
        </div>
    </div>

    <div class="info">
        <?php
        // if (isset($_POST['filtro'])) {
        //     if ($filtro == 'All') {
        //         echo
        //             "<p> Viendo: <span class='badge text-bg-info'>Todas las habitaciones</span></p>";
        //     }
        //     if ($filtro == 'Available') {
        //         echo
        //             "<p> Viendo: <span class='badge text-bg-info'>Todas las habitaciones disponibles</span></p>";
        //     }
        //     if ($filtro == 'Booked') {
        //         echo
        //             "<p> Viendo: <span class='badge text-bg-info'>Todas las habitaciones reservadas</span></p>";
        //     }
        // } else {
        //     echo
        //         "<p> Viendo: <span class='badge text-bg-info'>Todas las habitaciones</span></p>";
        // }
        ?>
    </div>

    <!-- Filtrar por... y Ver -->
    <!-- Menú de búsqueda personalizada -->

    <!-- Resultados -->

    <div class="container-fluid my-5 d-flex row gap-3">
        <!-- Mostrar cada una de las habitaciones disponibles. -->
        <?php
        foreach ($clients as $client) {
            # FIXME Arreglar el INSERT al hacer reservas (date-in, date-out).
            echo '
            <form class="col" action="form_update_client.php" method="POST">
            <div class="card" style="min-width: 16rem;">
                <img src="../images/asap_rocky.jpg" class="card-img-top img-fluid" alt="Preview habitación.">
                <div class="card-body">
                    <h5 class="card-title">' . $client['nombre'] . '</h5>
                    <p class="card-text">' . $client['email'] . '</p>
                    <!-- TODO If para mostrar otros colores -->
                    <hr>
                    <p> <b> Características avanzadas: </b> </p>
                    <p> Id: ' . $client['id'] . ' </p>
                    <p> DNI: ' . $client['DNI'] . ' </p>
                    <p> Telefono: ' . $client['telefono'] . ' </p>
                    <p> Método de pago: ' . $client['metodo_pago'] . '</p>
                    <input type="text" hidden value="'.$client['id'].'" name="client_id_update">
                    
                    <button type="submit" class="btn btn-secondary">Editar</button>

                </div>
            </div>
            </form>
            ';
        }
        ?>
    </div>

</section>

<?php include('../components/footer.php') ?>