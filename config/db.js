// Importa il modulo mysql2 nella versione Promise.
// Questo ci permette di usare async/await invece delle callback.
const mysql = require("mysql2/promise");

// Crea un pool di connessioni.
// Un pool mantiene più connessioni aperte e le riutilizza,
// evitando di aprire e chiudere una connessione ad ogni richiesta.
const pool = mysql.createPool({

    // Indirizzo del server MySQL.
    host: "localhost",

    // Nome utente del database.
    user: "root",

    // Password dell'utente.
    password: "",

    // Nome del database.
    database: "reach17"

});

// Esporta il pool.
// In questo modo gli altri file potranno fare:
// const pool = require("../config/db");
module.exports = pool;