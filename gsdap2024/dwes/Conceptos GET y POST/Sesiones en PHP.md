# Sesiones en PHP.

Esto sirve para ***transportar datos de una página a otra***.

Para ver el ejemplo, crearemos un nuevo archivo llamado `sesiones.php`. Dentro de él, pondremos lo siguiente:

```php
<?php
session_start() # Importante para empezar la sesión
$_SESSION['nombre_sesion'] = "VALORES A GUARDAR"
# Esto es una array donde se guardarán todos los valores que le pongamos.
>
# Después para dirigirnos a otra página:
<html>
	<body>
		<a href="session2.php"> Link a otra página. </a>
	</body>
</html>
```

Creamos otro archivo, en este caso será `sesion2.php` y en este archivo, recogeremos el valor de la `nombre_sesion`:

```php
...
echo ($_SESSION['nombre_sesion'])
# Esto nos devolverá todos los valores que habremos guardado en la anterior página.
```

También podremos usar un método llamado `session_id()` para crear un id único para cada vez que lo ejecutemos. Puede ser útil para una id de sesión (como el mismo nombre lo dice).