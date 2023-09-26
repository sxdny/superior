# Cómo subir archivos al servidor.

Esto solo se puede hacer con `POST`, ya que `GET` no permite recibir datos muy grandes.

Lo primero y más importante que tendremos que hacer, será modificar los atributos de la etiqueta `<form>` para que puede permitir subir archivos al servidor. Para ello, la modificaremos de la siguiente manera:

```php
<form method="get" action="get_post.php" enctype="multipost/form-data">
```

Tendremos que introducir el `enctype` para que funcione.

Después, crearemos en el `index.php` un nuevo `<input>` en el formulario:

```php
Fichero: <input type="file" name="fichero">
```

Finalmente, para recoger los datos del fichero, utilizaremos la variable `$_FILES`:

```php
print_r($_FILES)
# Con esto, se nos mostrará todos los datos del fichero.
```