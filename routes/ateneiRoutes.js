// Importa Express.
const express = require("express");

// Crea un router Express.
const router = express.Router();

// Importa il controller degli atenei.
const ateneiController = require("../controllers/ateneiController");


// Recupera tutti gli atenei.
// GET /api/atenei
router.get("/", ateneiController.getAll);


// Crea un nuovo ateneo.
// POST /api/atenei
router.post("/", ateneiController.create);


// Modifica un ateneo esistente.
// PUT /api/atenei/:id
router.put("/:id", ateneiController.update);


// Elimina un ateneo.
// DELETE /api/atenei/:id
router.delete("/:id", ateneiController.remove);


// Esporta il router.
module.exports = router;