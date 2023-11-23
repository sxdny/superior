// get indexedb from various web browsers (Chrome, Mozilla, Safari, etc.)
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

// create the database
var database = "users_db";

const DB_STORE_NAME = 'users';
const DB_VERSION = 1;
var db;
var opened = false;

// acciones que tendremos en la página?
const EDIT_USER = "Edit user";
const SIGN_UP = "Sign up user";

/*
 * openCreateDb
 * opens and/or creates an IndexedDB database
 */

function openCreateDb(onDbCompleted) {

    // close if one is already loaded
    if (opened) {
        db.close();
        opened = false;
    }

    // open db
    // we could open changing version (...open(database, 3))
    var req = indexedDB.open(database, DB_VERSION);

    // when opened correctly...
    req.onsuccess = function (e) {

        opened = true;

        db = this.result;

        console.log("openCreateDb: Databased opened?" + db);

        onDbCompleted(db);

    };

    /* esta función se ejecutará cuando:
        1. Sea la primera vez que se cree la db.
        2. Cuando la versión de la db cambie.
    */
    req.onupgradeneeded = function () {
      
        // como no tenemos la instancia de la db
        // anterior, la recuperamos

        db = req.result;

        // store == tabla
        var store = db.createObjectStore(DB_STORE_NAME, {
            keyPath: "id",
            autoIncrement: true
        })

    }

    req.onerror = function (e) {
        console.error("openCreateDB: error abriendo o creando la base de datos:".e.target.errorCode);
    };

    // función para enviar datos
    function sendData() {

        // abrimos la base de datos con la función "openCreateDb"
        openCreateDb(function (db) {
            var hiddenId = document.getElementById("hiddenId").value;

            if (hiddenId == 0) {

            }
        })

    }

    // función para añadir usuarios desde el HTML
    function addUser(db) {

        var username = document.getElementById("username");
        var email = document.getElementById("email");
        var password = document.getElementById("password");
        var confirmPassword = document.getElementById("confirmPassword");

        // creamos el objeto del usuario a insertar...
        var obj = {
            username: username.value,
            email: email.value,
            password: password.value,
            confirmPassword: confirmPassword.value
        }

        // empezar una nueva transacción
        var tx    = db.transaction(DB_STORE_NAME, "readwrite");
        var store = tx.objectStore(DB_STORE_NAME);

        try {
            req = store.add(obj);
        }
        catch (e) {
            console.log("Catch");
        }

        req.onsuccess = function (e) {
            console.log("addUser: Los datos se han insertado correctamente: Id: ".e.target.result);
            
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

        var tx = db.transaction(DB_STORE_NAME, "readonly");
        var store = tx.objectStore(DB_STORE_NAME);

        // donde vamos a almacenar nuestros usuarios
        var result = [];

        var req = store.openCursor();

        req.onsuccess = function (e) {

            var cursor = e.target.result;

            // si el cursor existe o se ha obtenido un cursor
            if (cursor) {
                result.push(cursor.value);
                cursor.continue(); // pasa al siguiente
            }
            else {
                console.log("No hay más usuarios...");

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

        // obtenemos el ul del HMTL
        let ul = document.getElementById("users-ul");

        // reseteamos el posible contenido que haya en el HTML (por si acaso)
        ul.innerHTML = "";

        // iteramos los usuarios para introducirlo en el ul
        users.forEach(user => {
            ul.innerHTML +=
                `<li> <span> ${user.id} </span> ${user.username} ${user.email} ${user.password}</li> <button id=delete_${user.id} user_id='${user.id}'> Eliminar usuario </button> <button id=edit_${user.id} user_id='${user.id}'> Editar usuario </button>`
        });

        users.forEach(user => {
            document.getElementById(`edit_${user.id}`).addEventListener("click", readUser, false);
            document.getElementById(`delete_${user.id}`).addEventListener("click", deleteUser, false);
        });

    }

    function readUser(e) {
        var user_id = e.target.getAttribute("user_id");

        // abrimos la sesión de la base de datos
        openCreateDb(function (db) {
            var tx = db.transaction(DB_STORE_NAME, "readonly");
            var store = tx.objetcStore(DB_STORE_NAME);

            var req = store.get(parseInt(user_id));

            req.onsuccess = function (e) {
                var record = e.target.result;
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
        var button_id = e.target.id; //<- Porqué al llamar la función, pasamos el botón
        var user_id = document.getElementById(button_id).getAttribute("user_id"); // obtenemos el user id del usuario que queremos eliminar

        // readwrite porqué leeremos el usuario de la base de datos
        // y lo eliminaremos (write +/-)
        openCreateDb((db) => {
            var tx = db.transaction(DB_STORE_NAME, "readwrite");
            var store = tx.objetcStore(DB_STORE_NAME);

            // borramos el usuario
            var req = store.delete(parseInt(user_id));

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

        var idUpdate = document.getElementById("hiddenId");
        var username = document.getElementById("username");
        var email = document.getElementById("email");
        var password = document.getElementById("password");

        var obj // seguir con el ejercicio

    }

    

}