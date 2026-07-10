// Importa il model dei corsi.
// Il controller userà le funzioni del model
// per comunicare con il database.
const corsiModel = require("../models/corsiModel");

// Funzione che gestisce la richiesta GET /api/corsi.
const getAll = async (req, res) => {

    try {

        const { nome, tipologia } = req.query;

        const corsi = await corsiModel.getAll(
            nome,
            tipologia
        );

        res.status(200).json(corsi);

    } catch (errore) {

        console.error(errore);

        res.status(500).json({

            message: "Errore interno del server."

        });

    }

};

// Gestisce la creazione di un nuovo corso..
const create = async (req, res) => {

    try {

        // Recupera i dati inviati dal client.
        const { nome, tipologia_id } = req.body;

        // Controlla che il nome sia presente.
        if (!nome || nome.trim() === "") {

            return res.status(400).json({

                message:"Il nome del corso è obbligatorio."

            });

        }

        // Controlla che tipologia_id sia stato inviato.
        if (!tipologia_id) {

            return res.status(400).json({

                message:"La tipologia è obbligatoria."

            });

        }

        // Chiama il model per inserire il corso.
        const risultato = await corsiModel.create(

            nome.trim(),

            tipologia_id

        );

        // 201 significa:
        // risorsa creata correttamente.
        res.status(201).json({

            message:"Corso creato con successo.",

            id: risultato.insertId

        });

    } catch (errore) {

        console.error(errore);

        // Errore della foreign key.
        // Significa che tipologia_id
        // non esiste nella tabella tipologie.
        if (errore.code === "ER_NO_REFERENCED_ROW_2") {

            return res.status(400).json({

                message:"La tipologia indicata non esiste."

            });

        }

        // Errore generico.
        res.status(500).json({

            message:"Errore interno del server."

        });
    }
};

// Modifica un corso esistente.
const update = async (req, res) => {
    try {

        // Recupera l'id dall'URL.
        // Esempio:
        // PUT /api/corsi/1
        const { id } = req.params;

        // Recupera i dati dal body.
        const { nome, tipologia_id } = req.body;

        // Controlla il nome.
        if (!nome || nome.trim() === "") {

            return res.status(400).json({

                message:"Il nome del corso è obbligatorio."

            });

        }

        // Controlla la tipologia.
        if (!tipologia_id) {

            return res.status(400).json({

                message:"La tipologia è obbligatoria."

            });

        }

        // Chiama il model.
        const risultato = await corsiModel.update(

            id,

            nome.trim(),

            tipologia_id

        );

        // Se non è stata modificata nessuna riga,
        // l'id del corso non esiste.
        if (risultato.affectedRows === 0) {

            return res.status(404).json({

                message:"Corso non trovato."

            });

        }

        // Aggiornamento completato.
        res.status(200).json({

            message:"Corso aggiornato con successo."

        });

    } catch (errore) {

        console.error(errore);

        // Foreign key non valida.
        if (errore.code === "ER_NO_REFERENCED_ROW_2") {

            return res.status(400).json({

                message:"La tipologia indicata non esiste."

            });

        }

        res.status(500).json({

            message:"Errore interno del server."

        });
    }
};

// Elimina un corso.
const remove = async (req, res) => {
    try {

        // Recupera l'id dall'URL.
        const { id } = req.params;

        // Chiama il model.
        const risultato = await corsiModel.remove(id);

        // Nessun record eliminato.
        if (risultato.affectedRows === 0) {

            return res.status(404).json({

                message:"Corso non trovato."

            });

        }

        // Eliminazione riuscita.
        // 204 non restituisce contenuto.
        res.status(200).send({
            message: "Corso eliminato con successo."
        });


    } catch (errore) {

        console.error(errore);

        res.status(500).json({

            message:"Errore interno del server."
        });
    }
};

const associaAteneo = async (req, res) => {

    try {

        // Recupera l'id del corso dall'URL.
        const { id } = req.params;

        // Recupera l'id dell'ateneo dal body.
        const { ateneo_id } = req.body;

        // Controlla che l'ateneo sia stato inviato.
        if (!ateneo_id) {

            return res.status(400).json({

                message: "L'id dell'ateneo è obbligatorio."

            });

        }

        // Qui chiameremo il model per associare il corso all'ateneo.
        const risultato = await corsiModel.associaAteneo(id, ateneo_id);

        res.status(201).json({

        message: "Corso associato all'ateneo con successo."

        });

    } catch (errore) {

    if (errore.code === "ER_DUP_ENTRY") {

        return res.status(409).json({

            message:"Il corso è già associato a questo ateneo."

        });

    }

    if (errore.code === "ER_NO_REFERENCED_ROW_2") {

        return res.status(400).json({

            message:"Il corso o l'ateneo indicato non esiste."

        });

    }

    console.error(errore);

    return res.status(500).json({

        message:"Errore interno del server."

    });
    }
}

module.exports = {
    getAll,
    create,
    update,
    remove,
    associaAteneo
};
