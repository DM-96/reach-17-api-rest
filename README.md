# Reach17 API REST

API REST sviluppata con **Node.js**, **Express** e **MySQL** per la gestione di corsi, tipologie e atenei.

Il progetto permette di creare, modificare, eliminare e visualizzare le informazioni relative ai corsi formativi, gestendo le relazioni tra tipologie di corso e atenei tramite API REST.

---

## Configurazione

Il progetto utilizza variabili d'ambiente per gestire la configurazione del database e della porta del server.

Dopo aver clonato il repository, crea un file `.env` nella cartella principale del progetto prendendo come riferimento il file `.env.example`.


## Installazione e avvio

1. Clonare il repository:

```bash
git clone https://github.com/DM-96/reach-17-api-rest.git
```

2. Accedere alla cartella del progetto:

```bash
cd reach-17-api-rest
```

3. Installare le dipendenze:

```bash
npm install
```

4. Creare il file `.env` utilizzando il file `.env.example` come riferimento.

5. Importare il file `migration.sql` nel proprio server MySQL. Lo script creerà automaticamente il database `reach17` e tutte le tabelle necessarie.

6. Avviare il server in modalità sviluppo:

```bash
npm run dev
```

Oppure avviare il server in modalità standard:

```bash
npm start
```

Una volta avviato, l'API sarà disponibile all'indirizzo:

```text
http://localhost:3000
```

## 🚀 Tecnologie utilizzate

- Node.js
- Express.js
- MySQL
- mysql2
- JavaScript
- Postman (per il testing delle API)

---

# 📌 Funzionalità principali

Il progetto implementa:

- CRUD completo delle tipologie di corso
- CRUD completo dei corsi
- CRUD completo degli atenei
- Associazione tra corsi e atenei
- Filtri sui corsi
- Validazione degli input
- Gestione degli errori HTTP
- Query SQL con JOIN
- Relazioni tra tabelle tramite Foreign Key
- Prepared Statement per una gestione sicura delle query

---

# 🏗️ Struttura del progetto

reach17/
│
├── config/
│ └── db.js
│
├── controllers/
│
├── models/
│
├── routes/
│
├── migration.sql
├── server.js
├── package.json
└── README.md

---

# 🗄️ Database

Il database utilizza quattro tabelle principali:

## Tipologie

Contiene le categorie dei corsi.

Relazione:

tipologie 1 ---- N corsi

---

## Corsi

Contiene le informazioni relative ai corsi.

Ogni corso appartiene ad una tipologia.

---

## Atenei

Contiene l'elenco degli atenei disponibili.

---

## Corso_Atenei

Tabella ponte utilizzata per gestire la relazione molti-a-molti:

corsi N ---- N atenei

---

---

## Endpoint API

## Tipologie

GET /api/tipologie **Recupera tutte le tipologie** <br>
POST /api/tipologie **Crea una tipologia**<br>
PUT /api/tipologie/:id **Modifica una tipologia**<br>
DELETE /api/tipologie/:id **Elimina una tipologia**<br>

## Corsi

GET /api/corsi **Recupera tutti i corsi**<br>
POST /api/corsi **Crea un corso**<br>
PUT /api/corsi/:id **Modifica un corso**<br>
DELETE /api/corsi/:id **Elimina un corso**<br>
POST /api/corsi/:id/atenei **Associa un corso ad un ateneo**<br>

## Atenei

GET /api/atenei **Recupera tutti gli atenei**<br>
POST /api/atenei **Crea un ateneo**<br>
PUT /api/atenei/:id **Modifica un ateneo**<br>
DELETE /api/atenei/:id **Elimina un ateneo**<br>

## 🔎 Filtri disponibili

Ricerca per nome = GET /api/corsi?nome=(nome inserito).

Ricerca per tipologia = GET /api/corsi?tipologia_id=(id)

Ricerca combinata = GET /api/corsi?nome=(nome)&tipologia_id=(id)
