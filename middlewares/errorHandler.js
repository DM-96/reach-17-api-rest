function errorHandler(err, req, res, next) {
    console.error(err);

    switch (err.code) {
        case "ER_DUP_ENTRY":
            return res.status(409).json({
                message: "Risorsa già esistente."
            });

        case "ER_NO_REFERENCED_ROW_2":
            return res.status(400).json({
                message: "Riferimento non valido."
            });

        case "ER_ROW_IS_REFERENCED_2":
            return res.status(409).json({
                message: "Impossibile eliminare la risorsa perché è collegata ad altri dati."
            });

        default:
            return res.status(500).json({
                message: "Errore interno del server."
            });
    }
}

module.exports = errorHandler;