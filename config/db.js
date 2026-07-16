// Importa il modulo dotenv per leggere le variabili d'ambiente dal file .env
require("dotenv").config();

// Importa il modulo mysql2 nella versione Promise.
// Questo ci permette di usare async/await invece delle callback.
const mysql = require("mysql2");

// Crea un pool di connessioni.
// Un pool mantiene più connessioni aperte e le riutilizza,
// evitando di aprire e chiudere una connessione ad ogni richiesta.
const pool = mysql.createPool({

    // Indirizzo del server MySQL.
    host: process.env.DB_HOST,

    // Nome utente del database.
    user: process.env.DB_USER,

    // Password dell'utente.
    password: process.env.DB_PASSWORD,

    // Nome del database.
    database: process.env.DB_NAME

});

// Esporta il pool.
// In questo modo gli altri file potranno fare:
// const pool = require("../config/db");
module.exports = pool.promise();