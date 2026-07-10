const pool = require("../config/db");

// Crea una funzione asincrona chiamata getAll.
// Verrà utilizzata per recuperare tutte le tipologie dal database.
const getAll = async () => {

    const [rows] = await pool.execute(" SELECT * FROM tipologie ");

    return rows;
};

// Inserisce una nuova tipologia nel database.
const create = async (nome) => {

    const [result] = await pool.execute(

        "INSERT INTO tipologie(nome) VALUES (?)",
       
        [nome]
    );

    return result;
};

// Gestisce la modifica di una tipologia esistente.
const update = async (id, nome) => {

    const [result] = await pool.execute(

        "UPDATE tipologie SET nome = ? WHERE id = ?",

        [nome, id]

    );
    return result;

};

// Elimina una tipologia dal database tramite il suo id.
const remove = async (id) => {

    const [result] = await pool.execute(

        "DELETE FROM tipologie WHERE id = ?",

        [id]

    );
    
    return result;

};


module.exports = {
    getAll,
    create,
    update,
    remove
};