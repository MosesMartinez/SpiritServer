--
-- PostgreSQL database dump
--

-- Dumped from database version 10.5
-- Dumped by pg_dump version 10.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: machines; Type: TABLE; Schema: public; Owner: -
--
DROP TABLE IF EXISTS public.machines, public.users;

CREATE TABLE public.machines (
    machine_id integer NOT NULL,
    machine_user_id integer NOT NULL,
    machine_alcohol text[],
    machine_full boolean[],
    machine_container integer[],
    machine_empty_time timestamp(6) with time zone[]
);


--
-- Name: machines_machine_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.machines_machine_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: machines_machine_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.machines_machine_id_seq OWNED BY public.machines.machine_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    user_token text NOT NULL,
    user_password text NOT NULL,
    user_email text NOT NULL,
    user_created timestamp(6) with time zone DEFAULT now()
);


--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: machines machine_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.machines ALTER COLUMN machine_id SET DEFAULT nextval('public.machines_machine_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: machines; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.machines (machine_id, machine_user_id, machine_alcohol, machine_full, machine_container, machine_empty_time) VALUES (1, 1, '{Vodka,Rum}', '{t,t}', '{1,4}', '{"2018-12-13 15:15:26.84075-08","2018-12-13 15:15:26.84075-08"}');
INSERT INTO public.machines (machine_id, machine_user_id, machine_alcohol, machine_full, machine_container, machine_empty_time) VALUES (2, 1, '{Vodka,Rum}', '{t,t}', '{1,2}', '{"2018-12-13 15:15:33.317246-08","2018-12-13 15:15:33.317246-08"}');
INSERT INTO public.machines (machine_id, machine_user_id, machine_alcohol, machine_full, machine_container, machine_empty_time) VALUES (3, 1, '{Vodka,Rum}', '{t,t}', '{3,2}', '{"2018-12-13 15:15:36.722915-08","2018-12-13 15:15:36.722915-08"}');
INSERT INTO public.machines (machine_id, machine_user_id, machine_alcohol, machine_full, machine_container, machine_empty_time) VALUES (4, 1, '{Vodka,Tequila}', '{t,t}', '{1,2}', '{"2018-12-13 15:15:46.785966-08","2018-12-13 15:15:46.785966-08"}');
INSERT INTO public.machines (machine_id, machine_user_id, machine_alcohol, machine_full, machine_container, machine_empty_time) VALUES (5, 2, '{Rum,Tequila}', '{t,t}', '{1,2}', '{"2018-12-13 15:15:49.459083-08","2018-12-13 15:15:49.459083-08"}');
INSERT INTO public.machines (machine_id, machine_user_id, machine_alcohol, machine_full, machine_container, machine_empty_time) VALUES (6, 2, '{Vodka,Tequila,Rum,Gin}', '{f,f,t,f}', '{1,3,2,4}', '{"2018-12-13 15:16:31.468391-08","2018-12-13 15:16:31.468391-08","2018-12-13 15:16:31.468391-08","2018-12-13 15:16:31.468391-08"}');
INSERT INTO public.machines (machine_id, machine_user_id, machine_alcohol, machine_full, machine_container, machine_empty_time) VALUES (8, 1, '{Malibu,Amaretto,Rum,Vodka}', '{t,t,f,f}', '{1,2,3,4}', '{"2018-12-13 15:16:34.575981-08","2018-12-13 15:16:34.575981-08","2018-12-13 15:16:34.575981-08","2018-12-13 15:16:34.575981-08"}');
INSERT INTO public.machines (machine_id, machine_user_id, machine_alcohol, machine_full, machine_container, machine_empty_time) VALUES (7, 2, '{Tequila,Malibu,Gin,Rum,Vodka}', '{t,t,f,t,f}', '{1,2,3,4,5}', '{"2018-12-13 15:16:47.238646-08","2018-12-13 15:16:47.238646-08","2018-12-13 15:16:47.238646-08","2018-12-13 15:16:47.238646-08","2018-12-13 15:16:47.238646-08"}');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users (user_id, user_token, user_password, user_email, user_created) VALUES (1, 'e7234b54fb42fc899bdf7397b3579eebe9dfcf1d', 'sha1$fd6d7c81$1$e071a1186e2fe785049e22c8f81c2bffd1457203', 'mail@mail.com', '2018-12-13 16:09:20.175893-08');
INSERT INTO public.users (user_id, user_token, user_password, user_email, user_created) VALUES (2, '4dd1b69213836e6eb537542652e4eeaf713719ff', 'sha1$5837658b$1$10b1b0cf852b52bdd92692485624f4878f4ab489', 'email@mail.com', '2018-12-13 16:09:20.175893-08');


--
-- Name: machines_machine_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.machines_machine_id_seq', 8, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_user_id_seq', 6, true);


--
-- Name: machines machines_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.machines
    ADD CONSTRAINT machines_pkey PRIMARY KEY (machine_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users users_user_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_email_key UNIQUE (user_email);


--
-- PostgreSQL database dump complete
--

