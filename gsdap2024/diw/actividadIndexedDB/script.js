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

    }

    

}