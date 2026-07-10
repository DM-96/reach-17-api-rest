// Importa Express.
// Ci serve per creare un Router dedicato alle tipologie.
const express = require("express");

// Crea un Router.
// Un Router è come una mini-applicazione che gestisce
// solo alcune rotte, in questo caso quelle delle tipologie.
const router = express.Router();

// Importa il controller delle tipologie.
// Più avanti creeremo questo file.
const tipologieController = require("../controllers/tipologieController");

// Quando arriva una richiesta GET su /api/tipologie
// verrà eseguita la funzione getAll presente nel controller.
router.get("/", tipologieController.getAll);

// Quando arriva una richiesta POST su /api/tipologie
// viene eseguita la funzione create del controller.
router.post("/", tipologieController.create);

// Modifica una tipologia tramite il suo id.
router.put("/:id", tipologieController.update);

// Elimina una tipologia tramite id.
router.delete("/:id", tipologieController.remove);

// Esporta il router.
// Così server.js potrà importarlo.
module.exports = router;