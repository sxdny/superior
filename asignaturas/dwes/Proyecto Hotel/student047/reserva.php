<?php

?>

<?php include('components/header.php') ?>

<section class="container w-25 mt-5">

    <h2 class="mt-5">Hagamos una reserva!</h2>

    <!-- Form -->
    <form class="mt-3" action="view_reservations.php" method="POST">

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

<?php include('components/footer.php') ?>