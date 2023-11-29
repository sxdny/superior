// declaramos los datos de la base de datos
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

// nombre de la base de datos
var database = "dbUsers";

// esto es como un nombre de tabla
const DB_STORE_NAME = 'users';

// version de la base de datos
const DB_VERSION = 1;

// variable para almacenar la base de datos
var db;

// variable para saber si la base de datos esta abierta o no
var opened = false;

// acciones de la página
const EDITAR_USUARIO = "Editar usuario";
const NUEVO_USUARIO = "Nuevo usuario";
const AGREGAR_USUARIO = "Agregar usuario";

// elementos del formulario
var h1Title = document.getElementById("h1Title");
var form = document.getElementById("form");

var hiddenId = document.getElementById("hiddenId");

// tabla
var usersTable = document.getElementById("usersTable");

// botones
var sendData = document.getElementById("sendData");

/*
* Esta función abrirá la base de datos y creará la tabla si no  
* existe. Si la base de datos ya existe, la abrirá.
*/

function openCreateDb(onDbCompleted) {

    // si la base de datos esta abierta la cerramos
    if (opened) {
        db.close();
        opened = false;
    }

    // abrimos la base de datos y almacenamos el resultado en la variable req
    var req = indexedDB.open(database, DB_VERSION);
    
    req.onsuccess = function (e) {
        db = this.result; // Or event.target.result
        console.log("openCreateDb: Databased opened " + db);
        opened = true;
    
        onDbCompleted(db);
    
    };
    
    // esta función se ejecuta cuando se crea la base de datos.
    req.onupgradeneeded = function () {
    
        db = req.result;
    
        console.log("openCreateDb: upgrade needed " + db);
        var store = db.createObjectStore(DB_STORE_NAME, { keyPath: "id", autoIncrement: true });
        console.log("openCreateDb: Object store created");
    
        // creamos los indices (columnas) de la tabla
        store.createIndex('fname', 'fname', { unique: false });
        console.log("openCreateDb: Index created on fname");
        store.createIndex('lname', 'lname', { unique: false });
        console.log("openCreateDb: Index created on lname");
        store.createIndex('dni', 'dni', { unique: false });
        console.log("openCreateDb: Index created on dni");
    };
    
    req.onerror = function (e) {
        console.error("openCreateDb: error opening or creating DB:", e.target.errorCode);
    };

}

// añadir addEventListener al botón sendData
sendData.addEventListener("click", function () {
    addUser(db);
});

// función para añadir un usuario a la base de datos
function addUser(db) {

    // obtenemos los datos del formulario
    var username = document.getElementById("username");
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    // creamos un objeto usuario con los datos del formulario
    var user = {
        username: username.value,
        email: email.value,
        password: password.value
    };

    // abrimos la transacción
    var transaction = db.transaction(DB_STORE_NAME, "readwrite");
    var objectStore = transaction.objectStore(DB_STORE_NAME);

    // añadimos el usuario a la base de datos
    console.log("addUser: Adding user: " + user);
    var request = objectStore.add(user);

    // si la petición se ha realizado correctamente
    request.onsuccess = () => {
        console.log("Usuario añadido correctamente");
    };

    // si la petición ha fallado
    request.onerror = function (e) {
        console.log("Error al añadir el usuario:", e.target.errorCode);
    };

}

// función para eliminar un usuario
function deleteUser(id) {

    // abrimos la transacción
    var transaction = db.transaction(DB_STORE_NAME, "readwrite");
    var objectStore = transaction.objectStore(DB_STORE_NAME);

    // eliminamos el usuario de la base de datos
    var request = objectStore.delete(id);

    // si la petición se ha realizado correctamente
    request.onsuccess = () => {
        console.log("Usuario eliminado correctamente");
    };

    // si la petición ha fallado
    request.onerror = function (e) {
        console.log("Error al eliminar el usuario:", e.target.errorCode);
    };

    // recargamos la página
    location.reload();

}

// función para editar un usuario
// esta función obtiene el usuario de la base de datos y lo añade en el formulario para después editarlo
function editUser(id) {

    // cambiamos el título del formulario
    h1Title.innerHTML = EDITAR_USUARIO;

    // cambiamos el texto del botón
    sendData.innerHTML = EDITAR_USUARIO;

    // abrimos la transacción
    var transaction = db.transaction(DB_STORE_NAME, "readwrite");
    var objectStore = transaction.objectStore(DB_STORE_NAME);

    // obtenemos el usuario de la base de datos
    var request = objectStore.get(id);

    // si la petición se ha realizado correctamente
    request.onsuccess = function (e) {

        // obtenemos el usuario
        var user = e.target.result;

        // añadimos los datos del usuario en el formulario
        hiddenId.value = user.id;
        username.value = user.username;
        email.value = user.email;
        password.value = user.password;

        // cambiamos el addEventListener del botón sendData
        sendData.removeEventListener("click", addUser);
        sendData.addEventListener("click", function () {
            updateUser(db);
        });

    };

    // si la petición ha fallado
    request.onerror = function (e) {
        console.log("Error al obtener el usuario:", e.target.errorCode);
    };

}

// función para actualizar un usuario	
function updateUser(db) {

    // obtenemos los datos del formulario
    var id = document.getElementById("hiddenId");
    var username = document.getElementById("username");
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    // creamos un objeto usuario con los datos del formulario
    var user = {
        id: id.value,
        username: username.value,
        email: email.value,
        password: password.value
    };

    // abrimos la transacción
    var transaction = db.transaction(DB_STORE_NAME, "readwrite");
    var objectStore = transaction.objectStore(DB_STORE_NAME);

    // actualizamos el usuario de la base de datos
    var request = objectStore.put(user);

    // si la petición se ha realizado correctamente
    request.onsuccess = () => {
        console.log("Usuario actualizado correctamente");
    };

    // si la petición ha fallado
    request.onerror = function (e) {
        console.log("Error al actualizar el usuario:", e.target.errorCode);
    };

    // recargamos la página
    location.reload();

}

// función para mostrar los usuarios en la tabla de la página
function readData() {
    openCreateDb(function (db) {
        readUsers(db);
    });
}

// función para leer los usuarios de la base de datos
function readUsers(db) {

    // abrimos la transacción
    var transaction = db.transaction([DB_STORE_NAME], "readonly");

    // obtenemos el objeto store
    var objectStore = transaction.objectStore(DB_STORE_NAME);

    // abrimos el cursor
    var request = objectStore.openCursor();

    // si la petición se ha realizado correctamente
    request.onsuccess = function (e) {

        // obtenemos el cursor
        var cursor = e.target.result;

        // si el cursor no es nulo
        if (cursor) {

            // añadimos los usuarios en la tabla junto con los botones
            usersTable.innerHTML += "<tr><td>" + cursor.value.username + "</td><td>" + cursor.value.email + "</td><td>" + cursor.value.password + "</td><td><button onclick='editUser(" + cursor.value.id + ")'>Editar</button></td><td><button onclick='deleteUser(" + cursor.value.id + ")'>Eliminar</button></td></tr>";
            

            // obtenemos el siguiente usuario
            cursor.continue();

        } else {
            console.log("No hay más usuarios");
        }

    };

    // si la petición ha fallado
    request.onerror = function (e) {
        console.log("Error al leer los usuarios:", e.target.errorCode);
    };

}

window.onload = () => {
    readData();
}
