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
SELECT * FROM users;
DROP TABLE users;
INSERT into users(name ,
        mail ,
        user_name,
        password,type) VALUES('admin','admin@123gmil.com','admin_123','admin_123','admin');
CREATE TABLE
    subjects(
        id SERIAL NOT NULL PRIMARY KEY,
        name VARCHAR(200) NOT NULL UNIQUE
    );

INSERT INTO subjects(name)
VALUES ('Html'), ('Css'), ('JavaScript'), ('BootStrap');

SELECT * from subjects;

CREATE TABLE
    levels(
        id SERIAL NOT NULL PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE
    );

INSERT INTO levels(name) VALUES('L1'),('L2'),('L3');

SELECT * FROM levels;

CREATE TABLE
    questions(
        id SERIAL NOT NULL PRIMARY KEY,
        subject_id INT REFERENCES subjects(id) NOT NULL,
        level_id INT REFERENCES levels(id) NOT NULL,
        name VARCHAR(200) NOT NULL UNIQUE
    );

SELECT * FROM questions;

DROP TABLE questions;

CREATE TABLE
    options(
        id SERIAL NOT NULL PRIMARY KEY,
        question_id int REFERENCES questions(id) NOT NULL UNIQUE,
        first_option VARCHAR(100) NOT NULL UNIQUE,
        second_option VARCHAR(100) NOT NULL UNIQUE,
        third_option VARCHAR(100) NOT NULL UNIQUE,
        fouth_option VARCHAR(100) NOT NULL UNIQUE
    );


SELECT * FROM options;

DROP TABLE options;

CREATE TABLE
    answers(
        id SERIAL NOT NULL PRIMARY KEY,
        question_id int REFERENCES questions(id) NOT NULL UNIQUE,
        answer VARCHAR(100) NOT NULL UNIQUE
    );
    
SELECT * FROM answers;

CREATE TABLE scores(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT REFERENCES users(id) NOT NULL,
    score int NOT NULL,
    level_id INT REFERENCES levels(id) not NULL,
    subject_id INT REFERENCES subjects(id) NOT NULL,
    time TIMESTAMP
);
DROP Table scores;

INSERT INTO scores(user_id,
    score ,
    level_id ,
    subject_id,time) VALUES(1,100,1,1,now());
SELECT * from scores;
drop table scores;

DROP Table answers;

INSERT INTO
    questions (subject_id, level_id, name)
VALUES (1, 1, 'solve 1+1=___?');

INSERT INTO
    questions (subject_id, level_id, name)
VALUES (1, 1, 'a --');

INSERT INTO
    options (
        question_id,
        first_option,
        second_option,
        third_option,
        fouth_option
    )
VALUES (1, '1', '2', '3', '4');
INSERT INTO
    options (
        question_id,
        first_option,
        second_option,
        third_option,
        fouth_option
    )
VALUES (2, 'u', 'b', 'c', 'd');

INSERT INTO answers (question_id, answer) VALUES (1,'2');
INSERT INTO answers (question_id, answer) VALUES (2,'b');

SELECT questions.name,options.first_option,OPTIONS.second_option,OPTIONs.third_option,OPTIONS.fouth_option,answers.answer
FROM questions
    INNER JOIN subjects on questions.subject_id = subjects.id
    INNER JOIN levels on questions.level_id = levels.id
    INNER JOIN options on questions.id = options.question_id
    INNER JOIN answers on answers.question_id = questions.id
    WHERE levels.id=1 and subjects.id=1;

SELECT subjects.name as subjectName,levels.name as level, scores.score as score, time from scores INNER JOIN levels on levels.id=scores.level_id
INNER JOIN subjects on scores.subject_id= subjects.id
INNER JOIN users on users.id= scores.user_id
WHERE users.id=?;

  SELECT users.name as username,subjects.name as subjectName,levels.name as level, scores.score as score, time from scores INNER JOIN levels on levels.id=scores.level_id
    INNER JOIN subjects on scores.subject_id= subjects.id
    INNER JOIN users on users.id= scores.user_id
    WHERE subjects.id=1 AND levels.id=1
    ORDER BY scores.score DESC,scores.time DESC
    LIMIT 5;

    SELECT id from questions;


    SELECT id from questions where name='solve 1+1=___?';