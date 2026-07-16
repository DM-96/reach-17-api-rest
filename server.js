require("dotenv").config();

const PORT = process.env.PORT || 3000;

// Importa il pool di connessioni al database.
const pool = require("./config/db");

// Importa il router delle tipologie.
const tipologieRoutes = require("./routes/tipologieRoutes");

// Importa il router dei corsi.
const corsiRoutes = require("./routes/corsiRoutes");

// Importa il router degli atenei.
const ateneiRoutes = require("./routes/ateneiRoutes");

// Importa la libreria Express installata con npm.
// require() permette di utilizzare un modulo all'interno del progetto.
const express = require("express");

// Crea un'applicazione Express.
// Tutte le richieste HTTP passeranno attraverso questo oggetto.
const app = express();

// Middleware che dice ad Express di leggere automaticamente
// il body delle richieste in formato JSON.
// Senza questa riga, req.body sarebbe undefined.
app.use(express.json());

// Tutte le richieste che iniziano con "/api/tipologie"
// verranno gestite dal router delle tipologie.
app.use("/api/tipologie", tipologieRoutes);

// Tutte le richieste che iniziano con "/api/corsi"
// verranno gestite dal router dei corsi.
app.use("/api/corsi", corsiRoutes);

// Tutte le richieste che iniziano con "/api/atenei"
// verranno gestite dal router degli atenei.
app.use("/api/atenei", ateneiRoutes);

// Definisce una route GET sulla radice "/".
// Quando un client visita http://localhost:3000/
// viene eseguita questa funzione.
app.get("/", (req, res) => {

    // Invia una risposta in formato JSON.
    res.json({
        messaggio: "API Reach17 avviata correttamente!"
    });

});

// Funzione asincrona che verifica se la connessione al database funziona.
async function testConnessione() {

    try {

        await pool.execute("SELECT 1");

        console.log("Connessione a MySQL riuscita.");

    } catch (errore) {

        console.error(errore);

    }
}

// Esegue il test appena il server viene avviato.
testConnessione();

// Avvia il server sulla porta 3000.
// Il callback viene eseguito una sola volta quando il server parte.
app.listen(3000, () => {

    // Scrive un messaggio nel terminale.
    console.log("Server avviato sulla porta 3000");

});

const errorHandler = require("./middlewares/errorHandler");

app.use(errorHandler);