// get indexedb from letious web browsers (Chrome, Mozilla, Safari, etc.)
let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

// elementos
let buttonSendData = document.getElementById("sendData");
let idOcult = document.getElementById("idOculta");

// elementos del formulario
let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password")

// botones
let deleteUserButton;
let editUserButton;

// lista de usuarios
let usersList = document.getElementById("users-table");

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

    // si la base de datos ya está abierta, la cerramos
    if (opened) {
        db.close();
        opened = false;
    }

    // abrimos la base de datos
    let request = indexedDB.open(database, DB_VERSION);

    // si la base de datos se abre correctamente
    request.onsuccess = function (event) {
        db = event.target.result;
        opened = true;
        onDbCompleted();
    }

    // si la base de datos no se ha podido abrir
    request.onerror = function (event) {
        alert("Error al abrir la base de datos:", event.target.errorCode);
    }

    // si la base de datos no existe, la creamos
    request.onupgradeneeded = function (event) {
        db = event.target.result;
        let objectStore = db.createObjectStore(DB_STORE_NAME, { keyPath: "id", autoIncrement: true });
        objectStore.createIndex("username", "username", { unique: true });
        objectStore.createIndex("email", "email", { unique: true });
        objectStore.createIndex("password", "password", { unique: false });
    }

};

// función para añadir un usuario
sendData.addEventListener("click", addUser);

// función para añadir un usuario a la base de datos
function addUser() {

    // abrimos la base de datos
    openCreateDb(function () {

        // creamos una transacción para añadir un usuario
        let transaction = db.transaction(DB_STORE_NAME, "readwrite");

        // obtenemos el objeto de la transacción
        let objectStore = transaction.objectStore(DB_STORE_NAME);

        // creamos un objeto con los datos del usuario
        let user = {
            username: username.value,
            email: email.value,
            password: password.value
        };

        console.log("Usuario añadido:", user);

        // añadimos el usuario a la base de datos
        let request = objectStore.add(user);

        // si se ha añadido correctamente
        request.onsuccess = function (event) {
            console.log("Usuario añadido correctamente");

            // mostramos los usuarios
            showUsers();
            // limpiamos los campos
            clearFields();
        }

        // si no se ha podido añadir
        request.onerror = function (event) {
            alert("Error al añadir el usuario", event.target.errorCode);
        }

    });

}

// función para mostrar los usuarios	
function showUsers() {

    // abrimos la base de datos
    openCreateDb(function () {

        // creamos una transacción para leer los usuarios
        let transaction = db.transaction(DB_STORE_NAME, "readonly");

        // obtenemos el objeto de la transacción
        let objectStore = transaction.objectStore(DB_STORE_NAME);

        // obtener los usuarios
        let request = objectStore.getAll();

        // si se ha obtenido correctamente
        request.onsuccess = function (event) {

            console.log("Usuarios obtenidos correctamente");

            // obtenemos los usuarios
            let users = request.result;

            usersList.innerHTML += "<tr><th>Nombre de usuario</th><th>Email</th><th>Contraseña</th><th>Editar</th><th>Eliminar</th></tr>";

            users.forEach(user => {
                // tabla para mostrar los usuarios
                usersList.innerHTML += "<tr><td>" + user.username + "</td><td>" + user.email + "</td><td>" + user.password + "</td><td><button class='btn btn-warning' onclick='editUser(" + user.id + ")'>Editar</button></td><td><button class='btn btn-danger' onclick='deleteUser(" + user.id + ")'>Eliminar</button></td></tr>";
            });

            console.log(usersList.children);

        }

        // si no se ha podido obtener
        request.onerror = function (event) {
            alert("Error al obtener los usuarios", event.target.errorCode);
        }

    });

}

// función para eliminar los campos de los formularios
function clearFields() {
    username.value = "";
    email.value = "";
    password.value = "";
}


// función para eliminar un usuario	
function deleteUser(id) {

    // abrimos la base de datos
    openCreateDb(function () {

        // creamos una transacción para leer los usuarios
        let transaction = db.transaction(DB_STORE_NAME, "readwrite");

        // obtenemos el objeto de la transacción
        let objectStore = transaction.objectStore(DB_STORE_NAME);

        // eliminamos el usuario
        let request = objectStore.delete(id);

        // si se ha eliminado correctamente
        request.onsuccess = function (event) {
            console.log("Usuario eliminado correctamente");

            // mostramos los usuarios
            showUsers();
        }

        // si no se ha podido eliminar
        request.onerror = function (event) {
            alert("Error al eliminar el usuario", event.target.errorCode);
        }

    });

}

window.onload = function () {
    showUsers();
}