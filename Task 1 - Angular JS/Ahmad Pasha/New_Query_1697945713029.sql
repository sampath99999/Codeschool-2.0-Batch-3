-- Active: 1692271638519@@127.0.0.1@5432@quiz@public

CREATE TABLE
    users(
        id SERIAL NOT NULL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        mail VARCHAR(100) NOT NULL,
        user_name VARCHAR(200) NOT NULL UNIQUE,
        password VARCHAR(200) NOT NULL,
        type VARCHAR(50)
    );

CREATE TABLE
    subjects(
        id SERIAL NOT NULL PRIMARY KEY,
        name VARCHAR(200) NOT NULL UNIQUE
    );

CREATE TABLE
    levels(
        id SERIAL NOT NULL PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE
    );

CREATE TABLE
    questions(
        id SERIAL NOT NULL PRIMARY KEY,
        subject_id INT REFERENCES subjects(id) NOT NULL,
        level_id INT REFERENCES levels(id) NOT NULL,
        name VARCHAR(200) NOT NULL UNIQUE
    );

CREATE TABLE
    options(
        id SERIAL NOT NULL PRIMARY KEY,
        question_id SERIAL REFERENCES questions(id) NOT NULL,
        first_option VARCHAR(100) NOT NULL UNIQUE,
        second_option VARCHAR(100) NOT NULL UNIQUE,
        third_option VARCHAR(100) NOT NULL UNIQUE,
        fouth_option VARCHAR(100) NOT NULL UNIQUE
    );

CREATE TABLE
    answers(
        id SERIAL NOT NULL PRIMARY KEY,
        question_id SERIAL REFERENCES questions(id) NOT NULL,
        answer VARCHAR(100) NOT NULL UNIQUE
    );

CREATE TABLE
    scores(
        id SERIAL PRIMARY KEY NOT NULL,
        user_id INT REFERENCES users(id) NOT NULL,
        score int NOT NULL,
        level_id INT REFERENCES levels(id) not NULL,
        subject_id INT REFERENCES subjects(id) NOT NULL,
        time TIMESTAMP
    );