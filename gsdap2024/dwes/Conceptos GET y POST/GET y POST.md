# Métodos GET y POST.

Estos se utilizan en formularios para enviar y obtener información. El método `GET` **los envía a través de la URL** (podemos ver los datos enviados desde la URL) y ==es más limitado== mientras que `POST` los envía de manera oculta (se envían por detrás digamos) y ==permite incluso enviar archivos e imágenes==.

Ejemplo de uso del método `GET`:

Archivo `index.php`:
```php
<form method="get" action="get_post.php">
<!-- el *action* es el archivo destino de los datos enviados. -->
	Nombre: <input type="text" name="usuario">
	<input type="submit" name="enviar" value="enviar">
```

Archivo `get_post.php`:
```php
print_r ($_GET)
# Enviará toda la array
print_r ($_GET['usuario'])
# Enviará solo el usuario introducido por el cliente. Tiene que ser el valor de "name" del <input>.
```

Para hacerlo con post, solo tendremos que reemplazar `$_GET` con `$_POST`