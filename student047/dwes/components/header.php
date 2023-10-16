<?php

$root = '/student047/dwes/';

?>

<!doctype html>
<html lang="es" data-bs-theme="dark">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Proyecto Hotel</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
</head>

<body>

    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <a class="navbar-brand" href=<?php echo '"'. $root.'index.php'.'"';?>>Proyecto Hotel</a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href=<?php echo '"'. $root.'/forms/form_select_reservations.php'.'"';?>>Reservar</a>
                    </li>
                    <!-- Drodown menu -->
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Habitaciones (Administrador)
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href=<?php echo '"'. $root.'/forms/form_insert_room.php'.'"';?>>Insertar</a></li>

                            <li><a class="dropdown-item" href="#">Editar</a></li>

                            <li><a class="dropdown-item" href="#">Ver</a></li>

                            <li><a class="dropdown-item" href="#">Borrar / ocultar</a></li>

                            <li>
                                <hr class="dropdown-divider">
                            </li>

                            <li><a class="dropdown-item" href="#">Ayuda</a></li>
                        </ul>
                    </li>
                </ul>
            </div>

            <!-- TODO Hacer el menú de administrador. -->
        </div>
    </nav>