<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hotel Project</title>
    <!-- UIkit CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.17.0/dist/css/uikit.min.css" />
</head>

<body>

    <!-- Navbar -->
    <div class="uk-section-secondary uk-background-cover uk-preserve-color">

        <div
            uk-sticky="start: 170; animation: uk-animation-slide-top; sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky; cls-inactive: uk-navbar-transparent uk-light;">

            <nav class="uk-navbar-container">
                <div class="uk-container">
                    <div
                        uk-navbar="dropbar: true; dropbar-transparent-mode: remove; dropbar-anchor: !.uk-navbar-container; target-y: !.uk-navbar-container">

                        <div class="uk-navbar-left">

                            <ul class="uk-navbar-nav">
                                <li class="uk-active"><a href="index.php">Home</a></li>
                                <li class="uk-active"><a href="search.php">Reservations</a></li>
                                <li class="uk-active"><a href="#">Log In</a></li>
                            </ul>

                        </div>

                    </div>
                </div>
            </nav>
        </div>
    </div>