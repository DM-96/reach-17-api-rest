// Importa Express.
const express = require("express");

// Crea un router dedicato ai corsi.
const router = express.Router();

// Importa il controller dei corsi.
const corsiController = require("../controllers/corsiController");

// GET /api/corsi
// Recupera tutti i corsi.
router.get("/", corsiController.getAll);

// POST /api/corsi
// Crea un nuovo corso.
router.post("/", corsiController.create);

// Modifica un corso.
router.put("/:id", corsiController.update);

// Elimina un corso.
router.delete("/:id", corsiController.remove);

// Associa un corso ad un ateneo.
// Esempio:
// POST /api/corsi/3/atenei
router.post("/:id/atenei", corsiController.associaAteneo);

// Esporta il router.
module.exports = router;