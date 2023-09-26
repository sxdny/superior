# Redirección de páginas.

Se puede hacer tanto con HTML como con PHP.

Para hacerlo con HTML escribiremos lo siguiente:

```php
<a href="pagina2.php"> # Esto nos llevará a la pagina2.php

# Esto pasará el parámetro name con su valor correspondiente.
<a href="pagina2.php?name=Sidney">

```

Si queremos hacerlo con PHP, lo haremos de la siguiente manera:

```php
header ("location: pagina2.php")

# Con parámetros
header ("location: pagina3.php" . $_GET['name']);
# El GET cojerá el valor de name (que es Sidney) y lo llevará a la otra página.
```

Recordemos, que para mostrar los valores enviados es con:

```php
print_r($_GET);
```