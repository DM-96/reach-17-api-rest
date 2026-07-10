const pool = require("../config/db");

const getAll = async () => {

   
    const [rows] = await pool.execute(
        `
        SELECT 
            atenei.id,
            atenei.nome
        FROM atenei 
        `
    );

    return rows;

};

const create = async (nome) => {

    const [result] =await pool.execute(
        "INSERT INTO atenei (nome) VALUES (?)",
        [
            nome
        ]
    );

    return result;
};

const update = async (id, nome) => {

    const [result] =await pool.execute(
        "UPDATE atenei SET nome = ? WHERE id = ?",
        [
            nome,
            id
        ]
    );
    return result;
};

const remove = async (id) => {

    const [result] = await pool.execute(
        "DELETE FROM atenei WHERE id = ?",
        [
            id
        ]
    );
    return result;
;}

module.exports = {
    getAll,
    create,
    update,
    remove
};