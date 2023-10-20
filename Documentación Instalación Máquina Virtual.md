**Documentación Instalación MV y Ubuntu Deskrop** | Sidney Silva 2º DAW

# Instalación de VirtualBox
---

Para realizar la instalación de VirtualBox, seguiremos los siguientes pasos:

1. Ir a la página oficial de [VirtualBox](https://www.virtualbox.org/)

2. Una vez dentro de la página, iremos al apartado **Downloads**, en la parte izquierda de la página.

![[Pasted image 20231019141741.png|300]]

3. Ahora, tendremos que descargar la versión adecuada a nuestro sistema operativo. En mi caso es **Windows**, por lo que pulsaré en el enlace **Windows hosts.**

![[Pasted image 20231019142040.png]]

Al pulsar en el enlace, se nos comenzará a descargar automáticamente el archivo `.exe` en mi caso.

![[Pasted image 20231019142222.png|500]]

4. Cuando se nos acabe de descargar el archivo, se guardará de manera automática en `Descargas`. Abrimos esa carpeta con el Explorador de archivos y ejecutamos el archivo.

![[Pasted image 20231019142453.png|600]]

5. Al abrir el archivo, nos aparecerá una ventana, donde le tendremos que dar a `Next` para continuar.

![[Pasted image 20231019142707.png|500]]

6. En la siguiente ventana, lo dejaremos todo por defecto y le daremos a `Next`.

![[Pasted image 20231019143126.png|500]]

7. En la próxima ventana, se nos advierte que las interfaces de red se desconectarán para completar la instalación. Le daremos a `Yes`.

![[Pasted image 20231019143257.png|500]]

8. El programa necesitará instalar unas dependencias. Le daremos a `Yes` para instalarlas, porqué sino no podremos continuar con la instalación.

![[Pasted image 20231019143438.png|500]]

9. Finalmente, le daremos a `Install` para definitivamente instalar el programa.

![[Pasted image 20231019143512.png|500]]

Una vez finalizada la instalación, le daremos al botón `Finish` para cerrar la ventana.

![[Pasted image 20231019143734.png|500]]

# Instalación de un sistema operativo: Ubuntu Desktop
---

Pasos a seguir para instalar Ubuntu Desktop en VirtualBox:

1. Lo primero que tendremos que hacer será dirigirnos a la página oficial de [Ubuntu](https://ubuntu.com/)

2. Una vez dentro, abriremos el menú de **Downloads** y haremos clic sobre el botón de **Get Ubuntu Desktop.**

![[Pasted image 20231019144317.png]]

3. El enlace nos llevará a una página de descarga. Tendremos que bajar un poco y darle al botón de **Download 22.04.3**

![[Pasted image 20231019144524.png]]

Al darle al botón, se nos descargará automaticamente el archivo:

![[Pasted image 20231019144622.png]]

4. Cuando se haya descargado el archivo, abriremos el **VirtualBox** y le daremos al botón de `Nueva`.

![[Pasted image 20231019144757.png]]

5. Después de haberle dado al botón, nos aparecerá otra ventana. Dentro, tendremos que darle un nombre a la máquina virtual (donde diga `Nombre`) y seleccionar el archivo (en la opción `Imagen ISO`) que hemos descargado anteriormente.

![[Pasted image 20231019144932.png]]

==Importante== marcar la casilla `Omitir instalación desatentida`, para que no se nos instale solo el sistema operativo.

![[Pasted image 20231019145140.png]]

Cuando lo tengamos todo, le daremos a `Siguiente`.

6. A continuación, configuraremos las especificaciones de nuestra máquina virtual. Recomiendo al menos poner `4192MB` de RAM y `2CPUs` para un correcto funcionamiento de la máquina. Una vez hecho esto, le daremos a `Siguiente`.

![[Pasted image 20231019145329.png]]

7. Después, tendremos que configurar el espacio que ocupará la máquina virtual. Le daremos a la opción de `Crear un disco virtual ahora`. Como mínimo, Ubuntu necesita 5GB para instalarse, pero recomiendo ponerle más espacio (25GB por ejemplo). Cuando tengamos esto configurado, le damos a `Siguiente`.

![[Pasted image 20231019145558.png]]

8. En la siguiente ventana nos aparecerá una ventana resumiento las características de nuestra máquina virtual. Le daremos a `Terminar`.

![[Pasted image 20231019150733.png]]

9. Al abrir la máquina virtual, lo primero que nos aparecerá será una ventana de bienvenida donde tendremos que escoger nuestro idioma preferido y darle a `Siguiente`.

![[Pasted image 20231019151200.png]]

10. A continuación, marcamos la casilla de `Instalar Ubuntu` y le daremos a `Siguiente`.

![[Pasted image 20231019151243.png]]

11. Después, elegiremos la distribución del teclado (en mi caso el Español) y le daremos a `Siguiente`.

![[Pasted image 20231019151328.png]]

12. En la siguiente ventana, no tocaremos nada y le daremos a `Siguiente` para que la conexión funcione correctamente.

![[Pasted image 20231019151442.png]]

13. Saltaremos la siguiente ventana, ya que no es necesário actualizar el instalador. Le daremos a `Saltar`.

![[Pasted image 20231019151522.png]]

14. Dejaremos por defecto marcada solo la casilla de `Instalación predeterminada` y le daremos a `Siguiente`.

![[Pasted image 20231019151629.png]]

15. A continuación, dejaremos marcada la casilla de `Borrar disco e Instalar Ubuntu`.

![[Pasted image 20231019151718.png]]

16. En la siguiente ventana, nos hace un pequeño resúmen de las particiones que se crearán y sobre las cuáles se instalará el sistema operativo. La daremos a `Instalar`.

![[Pasted image 20231019151841.png]]

17. Después seleccionaremos nuestra localización (pulsando en el país o con el menú) y le daremos a `Siguiente`.

![[Pasted image 20231019151931.png]]

18. En la siguiente ventana, pondremos nuestro nombre completo, nombre del equipo, nombre de usuario y contraseña. Al acabar, le daremos a `Siguiente`.

![[Pasted image 20231019152144.png]]

19. Elegimos nuestro tema preferido y le damos a `Siguiente`.

![[Pasted image 20231019152219.png]]

20. Finalmente, le daremos a `Reiniciar ahora` para definitivamente completar la instalación.

![[Pasted image 20231019152406.png]]