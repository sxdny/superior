<?php

# TODO Hacer que esto también funciones con los includes
$root = '/student047/dwes/';

?>

<?php include('../components/header.php') ?>

<section class="container w-25 mt-5">

    <h3 class="mt-5">Insertar habitación <span class="badge bg-secondary">Admin</span></h3>

    <!-- Form -->
    <form class="mt-3" action="../db/db_reservations_select.php" method="POST">

        <p>A continuación, introduzca la fecha de entrada y de salida.</p>

        <div class="mb-3">
            <label for="date-in" class="form-label">Date-in:</label>
            <input type="date" class="form-control" name="date-in" aria-describedby="date-in">
        </div>
        <div class="mb-3">
            <label for="date-out" class="form-label">Date-out:</label>
            <input type="date" class="form-control" name="date-out" aria-describedby="date-out">
        </div>

        <button type="submit" class="btn btn-primary">Enviar</button>

    </form>

</section>

<?php include('../components/footer.php') ?>