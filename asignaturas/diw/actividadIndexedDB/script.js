// get indexedb from letious web browsers (Chrome, Mozilla, Safari, etc.)
let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

// elementos
let buttonSendData = document.getElementById("sendData");
let idOcult = document.getElementById("idOculta");

// elementos del formulario
let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password")

// creación de la base de datos
let database = "users_db";

// esto es como una tabla
const DB_STORE_NAME = 'users';
const DB_VERSION = 1;

// variable que contiene la instancia de la base de datos
let db;
let opened = false;

// títulos de la página (etiquetas acciones de la base de datos)
const EDIT_USER = "Editar usuarios";
const SIGN_UP = "Registrar un nuevo usuario";

/*
 * Función para abrir / crear la base de datos.
 * Dependiendo del estado de "opened", la abrirá o la cerrará
 * (si ya hay una abierta)
 */

/*
    onDbCompleted es una función pasada por parémetro
    para cuando la función openCreateDb haya creado o
    abierto la base de datos.
*/

function openCreateDb(onDbCompleted) {

    // cerraremos la base de datos si ya hay una abierta
    if (opened) {
        db.close();
        opened = false;
    }

    // abrimos la base de datos
    let req = indexedDB.open(database, DB_VERSION);

    /*
        La función de indexedDB.open() devuelve un estado, dependiendo del estado
        haremos una cosa u otra:
    */

    // Requets handlers

    req.onsuccess = function (e) {

        db = e.target.result;

        console.log("La base de datos ha sido abierta correctamente:" + db);
        opened = true;

        onDbCompleted(db);

    };

 
    /*
        Esta función se ejecutará cuando:
        1. Creamos una nueva base de datos.
        2. Cambiamos la versión de la base de datos.
    */
    req.onupgradeneeded = (e) => {
      
        db = e.target.result;

        // los datos se guardan como objetos de JS y no como tablas.
        const objectStore = db.createObjectStore(DB_STORE_NAME, {
            keyPath: "id",
            autoIncrement: true
        })

        // Creamos los índices / campos de la base de datos.
        // Mejora el rendimiento de las consultas

        // Parémetros de la función:
        // 1. name -> nombre del índice
        // 2. keyPath -> el camino de la clase sobre el que se va a crear
        // 3. option -> para introducir varias opciones: unique, multiEntry o locale.
        objectStore.createIndex("username", "username", { unique: true });
        objectStore.createIndex("email", "email", { unique: false });
        objectStore.createIndex("password", "password", { unique: false });

        // compronar que objectStore está creado antes de introducir datos
        objectStore.transaction.oncomplete = (e) => {
            // almacenar los datos
            const userObjectStore = db.transaction("users", "readwrite").objectStore("users");

            // los datos guardados están guardados todos en un objeto
            // iteramos el objeto con el forEach y los vamos guardando
            // uno a uno.
            usuarios.forEach((user) => {
                userObjectStore.add(user);
            })
        }

    }

    req.onerror = (e) => {
        console.error(`Error abriendo la Database: ${e.target.errorCode}`);
    };

    buttonSendData.addEventListener("click", sendData());

    // función para enviar datos
    function sendData() {

        // abrimos la base de datos con la función "openCreateDb"
        openCreateDb(function (db) {
            let idOculta = document.getElementById("idOculta").value;

            if (idOculta == 0) {
                addUser(db);
            }
            else {
                console.log("Cambiar los valores del usuario.");
                editUser(db);
            }
        })

    }

    // función para añadir usuarios desde el HTML
    function addUser(db) {

        // Creamos el objeto del usuario a insertar.
        // Los datos provienen del documento HTML
        let usuario = {
            username: username.value,
            email: email.value,
            password: password.value,
        }

        // empezar una nueva transacción
        const transaction = db.transaction(DB_STORE_NAME, "readwrite");
        
        let objectStore = transaction.objectStore(DB_STORE_NAME);

        // añadimos el usuario
        req = objectStore.add(usuario);
        
        // handlers
        req.onsuccess = function (e) {
            console.log("Los datos se han insertado correctamente: Id: ".e.target.result);
            
            // al insertar el usuario, queremos leer los datos porqué los tendremos que mostrar abajo (o donde sea)

            readData();
            clearFormInputs(); // <- Para resetear los inputs
        };

        // en caso de error...
        req.onerror = function (e) {
            console.error("Ha habido un error insertando el usuario...", e.target.result);
        };

        // una vez se haya realizado la transacción, cerrar la base de datos
        tx.oncomplete = function () {
            console.log("¡Transacción completada!");
            db.close();
            opened = false; // <- Para que se pueda abrir más adelante
        };

    };

    function readData() {
        openCreateDb(function (db) {
            readUsers(db); // <- Leemos los usuarios
        });
    };

    function readUsers(db) {

        let tx = db.transaction(DB_STORE_NAME, "readonly");
        let objectStore = tx.objectStore(DB_STORE_NAME);

        // donde vamos a almacenar nuestros usuarios
        let result = [];

        // devuelve un objeto
        let req = objectStore.openCursor();

        req.onsuccess = (e) => {

            const cursor = e.target.result;

            // si el cursor existe o se ha obtenido un cursor
            if (cursor) {
                result.push(cursor.value);
                cursor.continue(); // pasa al siguiente
            }
            else {
                console.log("EOF. No hay más usuarios...");

                // añadir los usuarios obtenidos al HTML
                addUsersToHTML(result) // <- Pasamos el objeto que hemos construido
            }

        };

        req.onerror = function (e) {
            console.error("Ha habido un error obteniendo los usuarios...");
        }

        req.oncomplete = function () {
            console.log("¡Acción completada!");

            // cerramos la base de datos
            db.close();
            opened = false;
        };

    }

    function addUsersToHTML(users) {

        console.log("Hello");

        // obtenemos el ul del HMTL
        let ul = document.getElementById("users-ul");

        // reseteamos el posible contenido que haya en el HTML (por si acaso)
        ul.innerHTML = "";

        // iteramos los usuarios para introducirlos en el ul
        users.forEach(user => {
            ul.innerHTML +=
                `<li> ${user.id} </li>`
        });

        users.forEach(user => {
            document.getElementById("edit_" + user.id).addEventListener("click", readUser, false);
            document.getElementById("delete_" + user.id).addEventListener("click", deleteUser, false);
        })

    }

    function readUsers(e) {
        let user_id = e.target.getAttribute("user_id");

        // abrimos la sesión de la base de datos
        openCreateDb(function (db) {
            let tx = db.transaction(DB_STORE_NAME, "readonly");
            let store = tx.objetcStore(DB_STORE_NAME);

            let req = store.get(parseInt(user_id));

            req.onsuccess = function (e) {
                let record = e.target.result;
                console.log(record);

                // insertamos los datos el usuario a editar en las forms
                updateFormInputsToEdit(record);
            };

            req.onerror = function (e) {
                console.error("Error al editar usuarios...", e.target.result);
            };

            tx.oncomplete = function () {
                console.log("Completado.");
                db.close();
                opened = false;
            }
        });
    };

    // función para borrar usuarios
    function deleteUser(e) {
        let button_id = e.target.id; //<- Porqué al llamar la función, pasamos el botón
        let user_id = document.getElementById(button_id).getAttribute("user_id"); // obtenemos el user id del usuario que queremos eliminar

        // readwrite porqué leeremos el usuario de la base de datos
        // y lo eliminaremos (write +/-)
        openCreateDb((db) => {
            let tx = db.transaction(DB_STORE_NAME, "readwrite");
            let store = tx.objetcStore(DB_STORE_NAME);

            // borramos el usuario
            let req = store.delete(parseInt(user_id));

            req.onsucces = (e) => {
                console.log("¡Usuario eliminado correctamente!");
                readData();
            };

            req.onerror = (e) => {
                console.error("Error al eliminar el usuario...", e.target.errorCode);
            };

            tx.oncomplete = () => {
                console.log("Tarea completada.");
                db.close();
                opened = false;
            };
        });
    }

    function editUser(db) {

        let idUpdate = document.getElementById("idOculta");
        let username = document.getElementById("username");
        let email = document.getElementById("email");
        let password = document.getElementById("password");

        let obj = {
            id: parteInt(idUpdate.value),
            username: username.value,
            email: email.value,
            password: password.email
        };

        let tx = db.transaction(DB_STORE_NAME, "readwrite");
        let store = tx.objectStore(DB_STORE_NAME);

        // actualizar los datos
        req = store.put(obj);

        req.onsuccess = (e) => {
            console.log("Datos editados correctamente!");

            // actualizamos los datos después de "editar"
            readData();
            clearFormInputs();
        };

        req.onerror = (e) => {
            console.error("Error editando los datos del usuario...", e.error);
        }

        // completamos la acción y cerramos la base de datos
        tx.oncomplete = () => {
            console.log("Accion completada");
            db.close();
            opened = false
        }

    }

    /*
    Función para que cada vez que insertemos o editemos un usuario,
    los campos del formulario se reseteen / se limpien.
    */
    function clearFormInputs() {
        document.getElementById("idOculta").value = 0;
        document.getElementById("username").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("confirmPassword").value = "";

        // TODO ver que tengo que ponder aquí
        document.getElementById("sendData").innerHTML = SIGN_UP;
        document.getElementById("h1Title").innerHTML = SIGN_UP;
    }

    /*
    Función que al editar el usuario, sus datos se muestren
    en los campos del usuario.
    En este caso, "record" es el objeto del usuario que estamos editando?
    */
    function updateFormInputsToEdit(record) {
        document.getElementById("idOculta").value = record.id;
        document.getElementById("username").value = record.username;
        document.getElementById("email").value = record.email;
        document.getElementById("password").value = record.password;

        document.getElementById("sendData").innerHTML = EDIT_USER;
        document.getElementById("h1Title").innerHTML = EDIT_USER;
    }

    window.addEventListener('load', (event) => {
        readData();
    })

    

}