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

// Get client id to update
$client_id = $_POST['client_id_update'];

// Obtener información del cliente a editar
$sql = "SELECT * FROM clientes WHERE id = " . $client_id . ";";
$result = mysqli_query($conn, $sql);
$clients = mysqli_fetch_all($result, MYSQLI_ASSOC);

$client = $clients[0];

mysqli_close($conn);

?>

<?php include('../components/header.php') ?>

<section class="pt-5 m-5">

    <h3 class="mt-3">Editar datos cliente <span class="badge bg-secondary">Admin</span></h3>

    <form class="" action="../db/db_room_insert.php" method="POST">
        <div class="mb-3">
            <label class="form-label">Nombre</label>
            <input type="text" class="form-control" name="nombre" aria-describedby="nombre" value=<?php echo "'" . $client['nombre'] . "'" ?> required>
        </div>
        <div class="mb-3">
            <label class="form-label">DNI / NIF / NIE</label>
            <input type="text" class="form-control" name="dni" aria-describedby="dni" value=<?php echo "'" . $client['DNI'] . "'" ?> required>
        </div>
        <div class="mb-3">
            <label class="form-label">Email</label>
            <input type="text" class="form-control" name="email" aria-describedby="email" value=<?php echo "'" . $client['email'] . "'" ?> required>
        </div>
        <div class="mb-3">
            <label class="form-label">Teléfono</label>
            <input type="number" class="form-control" name="telefono" aria-describedby="telefono" value=<?php echo "'" . $client['telefono'] . "'" ?> required>
        </div>
        <div class="mb-3 d-flex flex-column">
            <label class="form-label">Método de pago</label>
            <!-- TODO If para determinar cuál tengo ya elegido -->
            <?php 

            if($client['metodo_pago'] == 'tarjeta' || $client['metodo_pago'] == 'Tarjeta' || $client['metodo_pago'] == 'Transferencia') {
                echo 
                '
                <select class="form-label form-select" name="metodo-de-pago" required>
                    <option value selected="tarjeta">Tarjeta</option>
                    <option value="paypal">PayPal</option>
                    <option value="efectivo">Efectivo</option>
                </select>
                ';
            }
            if($client['metodo_pago'] == 'paypal'|| $client['metodo_pago'] == 'PayPal') {
                echo 
                '
                <select class="form-label form-select" name="metodo-de-pago" required>
                    <option value="tarjeta">Tarjeta</option>
                    <option value selected="paypal">PayPal</option>
                    <option value="efectivo">Efectivo</option>
                </select>
                ';
            }
            if($client['metodo_pago'] == 'efectivo' || $client['metodo_pago'] == 'Efectivo') {
                echo 
                '
                <select class="form-label form-select" name="metodo-de-pago" required>
                    <option value="tarjeta">Tarjeta</option>
                    <option value="paypal">PayPal</option>
                    <option value selected="efectivo">Efectivo</option>
                </select>
                ';
            }

            ?>
        </div>

        <button type="submit" class="btn btn-primary">Actualizar</button>

    </form>

</section>

<?php include('../components/footer.php') ?>