-- Active: 1692016581010@@127.0.0.1@5432@ifmis_database@public

CREATE TABLE
    USERS(
        id SERIAL PRIMARY KEY,
        email VARCHAR(250) NOT NULL,
        password TEXT NOT NULL,
        token TEXT,
        status VARCHAR NOT NULL DEFAULT 'logout'
    );

INSERT INTO
    users(email, password)
VALUES (
        'admin123@gmail.com',
        '3225cb195fc2b6c5fd8d1fce48994e6c'
    );

CREATE TABLE
    hoaList(
        id SERIAL PRIMARY KEY,
        hoa_tier TEXT NOT NULL,
        hoa TEXT NOT NULL,
        dep_hod TEXT NOT NULL,
        e_s VARCHAR(150) NOT NULL,
        mjh INTEGER NOT NULL,
        mjh_desc TEXT NOT NULL,
        smjh INTEGER NOT NULL,
        smjh_desc TEXT NOT NULL,
        mih INTEGER NOT NULL,
        mih_desc TEXT NOT NULL,
        gsh INTEGER NOT NULL,
        gsh_desc TEXT NOT NULL,
        sh INTEGER NOT NULL,
        sh_desc TEXT NOT NULL,
        dh INTEGER NOT NULL,
        dh_desc TEXT NOT NULL,
        sdh INTEGER NOT NULL,
        sdh_desc TEXT NOT NULL,
        c_v VARCHAR(150) NOT NULL,
        est_amount TEXT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )

ALTER TABLE head_of_accounts ADD COLUMN budget_year TEXT NOT NULL;

CREATE TABLE
    tokens(
        id SERIAL PRIMARY KEY,
        token TEXT NOT NULL,
        user_id INT REFERENCES users(id)
    )

ALTER TABLE USERS DROP COLUMN token;

ALTER TABLE USERS DROP COLUMN status;

CREATE OR REPLACE FUNCTION UPDATE_HOA()
RETURNS TRIGGER AS $$
BEGIN
    NEW.hoa_tier = CONCAT_WS('-', NEW.mjh, NEW.smjh,NEW.mih, NEW.gsh, NEW.sh, NEW.dh, NEW.sdh, 'PVN');
    NEW.hoa = CONCAT(NEW.mjh, NEW.smjh,NEW.mih, NEW.gsh, NEW.sh, NEW.dh, NEW.sdh, 'PVN');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER UPDATE_HOA_TRIGGER 
BEFORE INSERT OR UPDATE ON hoaList
FOR EACH ROW
EXECUTE FUNCTION UPDATE_HOA();
