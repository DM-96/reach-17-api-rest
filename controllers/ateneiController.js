
const ateneiModel = require("../models/ateneiModel");

const getAll = async (req, res,next) => {
    try {

        const atenei = await ateneiModel.getAll();

        res.status(200).json(atenei);

    } catch (errore) {
       next(errore);
    }
};

const create = async (req, res,next) => {
   
    try {
        const {nome} = req.body;

        if (!nome ||nome.trim() === ""){
            return res.status(400).json({
                message: "Il nome è obbligatorio."
            });
        }
        
        const risultato = await ateneiModel.create(nome.trim());

        res.status(201).json({

            message: "Ateneo creato correttamente.",
            id: risultato.insertId
        });
       } catch (errore) {
        next(errore);
       }      
};

const update = async (req,res,next) => {
    try {

         const id = Number(req.params.id);

        if (!Number.isInteger(id)){
            return res.status(400).json({
                message: "ID non valido"
            });
        }

        const {nome} =req.body;

        if (!nome || nome.trim() === ""){
            return res.status(400).json({
                message: "Il nome è obbligatorio."
            });
        }

        const risultato = await ateneiModel.update(
            id,
            nome.trim()
        );

        if (risultato.affectedRows === 0) {

            return res.status(404).json({

                message:"Ateneo non trovato."

            });
        }

        res.status(200).json({

            message:"Ateneo aggiornato con successo."

        });
    } catch (errore) {
        next(errore);
}
};

const remove = async (req, res, next) => {
    try {

        const id = Number(req.params.id);

           if (!Number.isInteger(id)){
            return res.status(400).json({
                message: "ID non valido"
            });
        }

        const risultato = await ateneiModel.remove(id);

        if (risultato.affectedRows === 0) {

            return res.status(404).json({
                message:"Ateneo non trovato."
            });
        }

         res.status(200).send({
            message: "Ateneo eliminato con successo."
        });


    }catch (errore) {
        next(errore);
    }
}

module.exports = {
    getAll,
    create,
    update,
    remove,
};