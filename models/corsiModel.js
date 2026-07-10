// Importa il pool di connessioni al database.
// Serve per poter eseguire le query SQL.
const pool = require("../config/db");

// Funzione che recupera tutti i corsi.
const getAll = async (nome, tipologia) => {

    // Creiamo la query base.
    // Inizialmente prendiamo:
    // - id del corso
    // - nome del corso
    // - nome della tipologia
    // - elenco degli atenei associati
      // Colleghiamo ogni corso alla sua tipologia.
        // INNER JOIN perché ogni corso deve avere una tipologia.
         // Colleghiamo il corso alla tabella ponte.
        // LEFT JOIN perché vogliamo vedere anche corsi
        // che ancora non hanno un ateneo associato.
         // Colleghiamo la tabella ponte agli atenei.
        // In questo modo possiamo recuperare il nome dell'ateneo.
    let query = `

        SELECT

            c.id,

            c.nome AS corso,

            t.nome AS tipologia,

            GROUP_CONCAT(a.nome SEPARATOR ', ') AS atenei

        FROM corsi c

        INNER JOIN tipologie t

        ON c.tipologia_id = t.id

       
        LEFT JOIN corso_ateneo ca

        ON c.id = ca.corso_id

       
        LEFT JOIN atenei a

        ON ca.ateneo_id = a.id
    `;

    // Crea un array che conterrà i valori
    // da passare ai prepared statement.
    const valori = [];

    // Crea un array che conterrà le condizioni
    const condizioni = [];

    // Controlla se l'utente ha inviato
    // un filtro per il nome del corso.
    if (nome) {

        // Aggiunge una condizione alla query.
        // Il ? verrà sostituito dal valore
        // presente nell'array valori.
        condizioni.push("c.nome LIKE ?");

        // Inserisce il valore del filtro.
        valori.push(`%${nome}%`);
    }
    // Controlla se l'utente ha inviato
    // un filtro per la tipologia.
    if (tipologia) {

        // Aggiunge il filtro sulla tipologia.
        condizioni.push("t.nome = ?");

        // Inserisce il valore che sostituirà
        // il secondo ? della query.
        valori.push(tipologia);
    }
    // Controlla se esiste almeno una condizione.
    if (condizioni.length > 0) {

        // Aggiunge il WHERE alla query.
        query += " WHERE " + condizioni.join(" AND ");
    }

    // GROUP_CONCAT raggruppa gli atenei
    // appartenenti allo stesso corso.
    // Senza GROUP BY avremmo più righe
    // per lo stesso corso.
    query += " GROUP BY c.id ";

    const [rows] = await pool.execute(
        query,
        valori
    );
    
    return rows;
};

// Inserisce un nuovo corso.
const create = async (nome, tipologia_id) => {

    // Esegue una INSERT utilizzando prepared statement.
    const [result] = await pool.execute(

        "INSERT INTO corsi(nome, tipologia_id) VALUES (?, ?)",
        [
            nome,
            tipologia_id
        ]
    );

    return result;

};

// Modifica un corso esistente.
const update = async (id, nome, tipologia_id) => {

    // Esegue una query UPDATE con prepared statement.
    const [result] = await pool.execute(
        `
        UPDATE corsi
        SET nome = ?, tipologia_id = ?
        WHERE id = ?
        `,
        [
            nome,
            tipologia_id,
            id
        ]
    );
    return result;
};

// Elimina un corso tramite il suo id.
const remove = async (id) => {

    // Esegue una DELETE con prepared statement.
    const [result] = await pool.execute(

        "DELETE FROM corsi WHERE id = ?",

        [id]

    );

    return result;
};

// Associa un corso ad un ateneo.
const associaAteneo = async (corsoId, ateneoId) => {

    // Inserisce un nuovo collegamento nella tabella ponte.
    // Utilizziamo un prepared statement per evitare SQL Injection.
    const [result] = await pool.execute(

        `
        INSERT INTO corso_ateneo(corso_id, ateneo_id)
        VALUES(?, ?)
        `,

        // Il primo ? verrà sostituito dall'id del corso.
        // Il secondo ? verrà sostituito dall'id dell'ateneo.
        [
            corsoId,
            ateneoId
        ]

    );

    return result;

};

module.exports = {
    getAll,
    create,
    update,
    remove,
    associaAteneo
};