// get indexedb from letious web browsers (Chrome, Mozilla, Safari, etc.)
let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

// elementos
let buttonSendData = document.getElementById("sendData");
let idOcult = document.getElementById("idOculta");

// elementos del formulario
let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password")

// lista de usuarios
let usersList = document.getElementById("users-ul");

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
function addUser(username, email, password) {

    // abrimos la base de datos
    openCreateDb(function () {

        // creamos una transacción para añadir un usuario
        let transaction = db.transaction(DB_STORE_NAME, "readwrite");

        // obtenemos el objeto de la transacción
        let objectStore = transaction.objectStore(DB_STORE_NAME);

        // creamos un objeto con los datos del usuario
        let user = {
            username: username,
            email: email,
            password: password
        };

        // añadimos el usuario a la base de datos
        let request = objectStore.add(user);

        // si se ha añadido correctamente
        request.onsuccess = function (event) {
            alert("Usuario añadido correctamente");

            // limpiamos los campos
            clearFields();
            // mostramos los usuarios
            showUsers();
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

        // creamos una petición para obtener todos los usuarios
        let request = objectStore.getAll();

        // si se ha obtenido correctamente
        request.onsuccess = function (event) {

            alert("Usuarios obtenidos correctamente");

            // obtenemos los usuarios
            let users = event.target.result;

            // creamos una variable para guardar el html
            let html = "";

            // recorremos los usuarios
            for (let i = 0; i < users.length; i++) {

                // añadimos el html
                html += "<ul>";
                html += "<li>" + users[i].username + "</li>";
                html += "<li>" + users[i].email + "</li>";
                html += "<li>" + users[i].password + "</li>";
                html += "<li><button class='btn btn-warning' onclick='editUser(" + users[i].id + ")'>Editar</button></li>";
                html += "<li><button class='btn btn-danger' onclick='deleteUser(" + users[i].id + ")'>Eliminar</button></li>";
                html += "</ul>";

            }

            // mostramos los usuarios
            usersList.children.innerHTML = html;

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