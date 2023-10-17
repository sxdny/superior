<?php

# TODO Hacer que esto también funciones con los includes
$root = '/student047/dwes/';

?>

<?php include('../components/header.php') ?>

<section class="container-fluid w-50 h-100">

    <h3 class="mt-3">Insertar cliente <span class="badge bg-secondary">Admin</span></h3>

    <!-- Form -->
    <form class="" action="../db/db_client_insert.php" method="POST">
        <p>Introduzca los datos de la habitación:</p>
        <div class="mb-3">
            <label class="form-label">Nombre completo:</label>
            <input type="text" class="form-control" name="nombre" aria-describedby="nombre" required>
        </div>
        <div class="mb-3">
            <label class="form-label">DNI / NIE / NIF:</label>
            <input type="text" class="form-control" name="dni" aria-describedby="nombre" placeholder="12345678X" required>
        </div>
        <div class="mb-3">
            <label class="form-label">Email:</label>
            <input type="text" class="form-control" name="email" aria-describedby="capacidad" placeholder="nombre@correo.com" required>
        </div>
        <div class="mb-3">
            <label class="form-label">Teléfono:</label>
            <input type="number" class="form-control" name="telefono" aria-describedby="precio" required>
        </div>

        <button type="submit" class="btn btn-primary">Insertar</button>

    </form>

</section>

<?php include('../components/footer.php') ?>