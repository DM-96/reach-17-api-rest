// Importa il model delle tipologie.
const tipologieModel = require("../models/tipologieModel");

// Funzione che gestisce la richiesta GET /api/tipologie.
const getAll = async (req, res) => {

    try {
        // Chiama il model.
        // Il model restituisce tutte le tipologie.
        const tipologie = await tipologieModel.getAll();

        // Invia al client una risposta HTTP 200
        // contenente le tipologie in formato JSON.
        res.status(200).json(tipologie);

    } catch (errore) {

        // Scrive l'errore nel terminale.
        console.error(errore);

        // Restituisce un errore HTTP 500.
        res.status(500).json({

            message: "Errore interno del server"

        });

    }
};

// Gestisce la creazione di una nuova tipologia.
const create = async (req, res) => {

    try {

        // Estrae il campo "nome" dal body della richiesta.
        const { nome } = req.body;

        // Controlla che il nome sia stato inviato.
        // Se manca o è una stringa vuota, restituisce errore 400.
        if (!nome || nome.trim() === "") {

            return res.status(400).json({

                message: "Il nome è obbligatorio."

            });

        }

        // Chiama il model per inserire la nuova tipologia.
        const risultato = await tipologieModel.create(nome);

        // Restituisce HTTP 201 Created.
        res.status(201).json({

            message: "Tipologia creata con successo.",

            id: risultato.insertId

        });

    } catch (errore) {

        // Se il database restituisce errore 1062
        // significa che è stato violato un vincolo UNIQUE.
        if (errore.code === "ER_DUP_ENTRY") {

            return res.status(409).json({

                message: "La tipologia esiste già."

            });

        }

        console.error(errore);

        res.status(500).json({

            message: "Errore interno del server."

        });

    }

};

//Gestisce la modifica di una tipologia esistente.
const update = async (req, res) => {
    try {

        // Recupera l'id presente nell'URL.
        const { id } = req.params;

        // Recupera il nuovo nome dal body JSON.
        const { nome } = req.body;

        // Controlla che il nome sia presente.
        if (!nome || nome.trim() === "") {

            return res.status(400).json({

                message: "Il nome è obbligatorio."

            });

        }

        // Chiama il model per eseguire l'UPDATE.
        const risultato = await tipologieModel.update(
            id,
            nome.trim()
        );

        // Se nessuna riga è stata modificata,
        // significa che quell'id non esiste.
        if (risultato.affectedRows === 0) {

            return res.status(404).json({

                message: "Tipologia non trovata."

            });
        }

        // Se tutto è andato bene:
        // restituiamo 200 OK.
        res.status(200).json({

            message: "Tipologia aggiornata con successo."

        });

    } catch (errore) {

        console.error(errore);

        res.status(500).json({

            message: "Errore interno del server."

        });
    }
};

// Gestisce l'eliminazione di una tipologia.
const remove = async (req, res) => {

    try {

        // Recupera l'id dall'URL.
        const { id } = req.params;

        // Chiama il model per eliminare il record.
        const risultato = await tipologieModel.remove(id);

        // Se affectedRows è 0,
        // significa che non esiste nessun record con quell'id.
        if (risultato.affectedRows === 0) {

            return res.status(404).json({

                message: "Tipologia non trovata."

            });

        }

        // Eliminazione completata.
        res.status(200).send({
            message: "Tipologia eliminata con successo."
        });

    } catch (errore) {

    console.error(errore);


    if (errore.code === "ER_ROW_IS_REFERENCED_2") {

        return res.status(409).json({
            message: "Impossibile eliminare la tipologia: è utilizzata da uno o più corsi."
        });
    }
    res.status(500).json({
        message: "Errore interno del server."
    });
       }
}

module.exports = {
    getAll,
    create,
    update,
    remove
};
