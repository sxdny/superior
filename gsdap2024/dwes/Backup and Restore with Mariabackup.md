# Hacer copias de seguridad con Mariabackup.

## Procedimiento con XAMPP.

### Hacer la copia de seguridad.

1. Abrimos la CMD en el directorio del mysql del XAMPP.
![[Pasted image 20230925172352.png]]

2. Escribimos en la CMD el siguiente comando:
```mysql
mysqldump -u root -p "nombre-db" > "archivo_copia.sql"
-- Importante el .sql al final del archivo

-- Ejemplo
mysqldump -u root -p employees > "C:\xampp\mysql\backup\employees_backup.sql"

Enter password: Dejalo en blanco.
```

3. Comprobamos que se haya hecho la copia de seguridad: 
 ![[Pasted image 20230925171827.png]]
*La copia se ha hecho correctamente.*
### Recuperar la copia de seguridad.

1. Creamos la base de datos en el XAMPP.
![[Pasted image 20230925172228.png]]

2. Abrimos la CMD dentro de la carpeta `C:\xampp\mysql\bin`
![[Pasted image 20230925172407.png]]

3. Escribimos en la CMD el siguiente comando:
```mysql
mysql -u root -p "nombre_db" < "ubicacion_archivo_recu.sql"

-- Ejemplo
mysql -u root -p "employees" < "C:\xampp\mysql\backup\employees_backup.sql"

Enter password: Dejalo en blanco.
```

4. Comprobamos que hayamos recuperado toda la información.
![[Pasted image 20230925172329.png]]
*Hemos recuperado toda la información.*