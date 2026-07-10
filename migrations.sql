-- Creazione del database
CREATE DATABASE IF NOT EXISTS reach17;

-- Selezione del database
USE reach17;

-- Crea la tabella che conterrà le tipologie dei corsi.
CREATE TABLE tipologie (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nome VARCHAR(100) NOT NULL UNIQUE

);

-- Contiene tutti i corsi.
CREATE TABLE corsi (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nome VARCHAR(255) NOT NULL,

    tipologia_id INT NOT NULL,

    FOREIGN KEY (tipologia_id)
    REFERENCES tipologie(id)

);

-- Elenco degli atenei.
CREATE TABLE atenei (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nome VARCHAR(255) NOT NULL UNIQUE

);

CREATE TABLE corso_atenei (

    corso_id INT,

    ateneo_id INT,

    PRIMARY KEY (corso_id, ateneo_id),

    FOREIGN KEY (corso_id)
        REFERENCES corsi(id)
        ON DELETE CASCADE,

    FOREIGN KEY (ateneo_id)
        REFERENCES atenei(id)
        ON DELETE CASCADE

);


-- Crea la tabella che conterrà le tipologie dei corsi.
CREATE TABLE tipologie (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nome VARCHAR(100) NOT NULL UNIQUE

);

-- Contiene tutti i corsi.
CREATE TABLE corsi (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nome VARCHAR(255) NOT NULL,

    tipologia_id INT NOT NULL,

    FOREIGN KEY (tipologia_id)
    REFERENCES tipologie(id)

);

-- Elenco degli atenei.
CREATE TABLE atenei (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nome VARCHAR(255) NOT NULL UNIQUE

);

CREATE TABLE corso_atenei (

    corso_id INT,

    ateneo_id INT,

    PRIMARY KEY (corso_id, ateneo_id),

    FOREIGN KEY (corso_id)
        REFERENCES corsi(id)
        ON DELETE CASCADE,

    FOREIGN KEY (ateneo_id)
        REFERENCES atenei(id)
        ON DELETE CASCADE

);
