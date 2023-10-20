<?php

$root = '/student047/dwes/';

?>

<!doctype html>
<html lang="es" data-bs-theme="light">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Internazionale</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
</head>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');

    * {
        font-family: 'Inter', sans-serif !important;
    }

    body,
    html {
        height: 100%;
        width: 100%;
        margin: 0;
    }

    .full-screen-div {

        min-height: 100%;
        min-height: 100%;
        box-sizing: border-box;
        overflow-x: hidden;
        overflow-y: hidden;
    }

    .navbar {
        background-color: rgba(255, 255, 255, 0.61) !important;
        backdrop-filter: blur(15px) !important;
        border-bottom: 1px solid white !important;
    }
</style>

<body>

    <!-- Navbar -->
    <nav class="navbar fixed-top navbar-expand-lg bg-light px-4">
        <div class="container-fluid">
            <a class="navbar-brand" href=<?php echo '"' . $root . 'index.php' . '"'; ?>>Internazionale</a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse justify-content-end navbar-collapse" id="navbarNav">
                <ul class="navbar-nav gap-2">
                    <!-- TODO Juntar los dropdown con los droprights o lo que sea. -->
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Clientes (Administrador)
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href=<?php echo '"' . $root . '/forms/form_insert_client.php' . '"'; ?>>Insertar</a></li>

                            <li><a class="dropdown-item disabled" href="#" disabled>Editar</a></li>

                            <li><a class="dropdown-item" href=<?php echo '"' . $root . '/forms/form_select_client.php' . '"'; ?>>Ver</a></li>

                            <li><a class="dropdown-item disabled" href="#">Borrar / ocultar</a></li>

                            <li>
                                <hr class="dropdown-divider">
                            </li>

                            <li><a class="dropdown-item" href="#">Ayuda</a></li>
                        </ul>
                    </li>
                    <!-- Drodown menu -->
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Habitaciones (Administrador)
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href=<?php echo '"' . $root . '/forms/form_insert_room.php' . '"'; ?>>Insertar</a></li>

                            <li><a class="dropdown-item disabled" href="#" disabled>Editar</a></li>

                            <li><a class="dropdown-item" href=<?php echo '"' . $root . '/forms/form_select_room.php' . '"'; ?>>Ver</a></li>

                            <li><a class="dropdown-item disabled" href="#">Borrar / ocultar</a></li>

                            <li>
                                <hr class="dropdown-divider">
                            </li>

                            <li><a class="dropdown-item" href="#">Ayuda</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href=<?php echo '"' . $root . '/forms/form_select_reservations.php' . '"'; ?>>Reservar</a>
                    </li>
                    <li class="nav-item">
                        <a class="btn btn-primary disabled" role="button" href=<?php echo '"' . $root . '/forms/form_select_reservations.php' . '"'; ?>>Iniciar Sesión</a>
                    </li>
                </ul>
            </div>
            
        </div>
    </nav>