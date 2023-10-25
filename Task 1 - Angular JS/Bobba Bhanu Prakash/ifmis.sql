CREATE TABLE
    if not exists user_details(
        id serial PRIMARY KEY,
        user_name varchar(255) NOT NULL,
        password VARCHAR(255) NOT NULL
    );

CREATE TABLE
    if not exists tokens (
        id serial PRIMARY KEY,
        user_id INT REFERENCES user_details(id),
        token VARCHAR(255) NOT NULL
    );

create table hods(id serial PRIMARY key,type varchar(255) NOT NULL);

create table
    if not exists budget_years(
        id serial PRIMARY KEY,
        year varchar(255) NOT NULL
    );

CREATE TABLE
    if not exists hoa_status(
        id serial PRIMARY KEY,
        status varchar(255) NOT NULL
    );

CREATE TABLE
    if not exists hoa_details(
        id SERIAL PRIMARY KEY,
        name_of_hod varchar(255) NOT NULL,
        budget_year_id int REFERENCES budget_years(id),
        hod_id int REFERENCES hods(id),
        hoa varchar(255) NOT NULL,
        mjh_desc VARCHAR(255) NOT NULL,
        smh_desc VARCHAR(255) NOT NULL,
        mh_desc varchar(255) NOT null,
        gsh_desc varchar(255) NOT null,
        sh_desc varchar(255) NOT null,
        dh_desc varchar(255) NOT null,
        sdh_desc varchar(255) NOT null,
        status_id int REFERENCES hoa_status(id)
    );

alter table hoa_details add column amount numeric NOT NULL;

ALTER TABLE hoa_details
ADD
    created_at TIMESTAMP DEFAULT current_timestamp;

update budget_years set year='2020-2021' where id=4;

INSERT INTO budget_years (year)
values ('2023-2024'), ('2022-2021'), ('2020-2021'), ('2019-2020');

INSERT INTO hods(type ) values('Establishment'),('Scheme');

insert into hoa_status (status) values ('Charged'),('Voted');