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
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: machines; Type: TABLE; Schema: public; Owner: ubmnttdlfjzgty
--

CREATE TABLE public.machines (
    machine_id integer NOT NULL,
    machine_user_id integer NOT NULL,
    machine_alcohol text[],
    machine_full boolean[]
);


ALTER TABLE public.machines OWNER TO ubmnttdlfjzgty;

--
-- Name: machines_machine_id_seq; Type: SEQUENCE; Schema: public; Owner: ubmnttdlfjzgty
--

CREATE SEQUENCE public.machines_machine_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.machines_machine_id_seq OWNER TO ubmnttdlfjzgty;

--
-- Name: machines_machine_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ubmnttdlfjzgty
--

ALTER SEQUENCE public.machines_machine_id_seq OWNED BY public.machines.machine_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: ubmnttdlfjzgty
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    user_token text NOT NULL,
    user_password text NOT NULL,
    user_email text NOT NULL
);


ALTER TABLE public.users OWNER TO ubmnttdlfjzgty;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: ubmnttdlfjzgty
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO ubmnttdlfjzgty;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ubmnttdlfjzgty
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: machines machine_id; Type: DEFAULT; Schema: public; Owner: ubmnttdlfjzgty
--

ALTER TABLE ONLY public.machines ALTER COLUMN machine_id SET DEFAULT nextval('public.machines_machine_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: ubmnttdlfjzgty
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: machines; Type: TABLE DATA; Schema: public; Owner: ubmnttdlfjzgty
--

COPY public.machines (machine_id, machine_user_id, machine_alcohol, machine_full) FROM stdin;
1	1	{Vodka,Rum}	{t,t}
2	1	{Vodka,Rum}	{t,t}
3	1	{Vodka,Rum}	{t,t}
4	1	{Vodka,Tequila}	{t,t}
5	2	{Rum,Tequila}	{t,t}
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: ubmnttdlfjzgty
--

COPY public.users (user_id, user_token, user_password, user_email) FROM stdin;
1	mytokenisjuan	password	mail@mail.com
2	mytokenisangeles	password	email@mail.com
\.


--
-- Name: machines_machine_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ubmnttdlfjzgty
--

SELECT pg_catalog.setval('public.machines_machine_id_seq', 5, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ubmnttdlfjzgty
--

SELECT pg_catalog.setval('public.users_user_id_seq', 2, true);


--
-- Name: machines machines_pkey; Type: CONSTRAINT; Schema: public; Owner: ubmnttdlfjzgty
--

ALTER TABLE ONLY public.machines
    ADD CONSTRAINT machines_pkey PRIMARY KEY (machine_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: ubmnttdlfjzgty
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- PostgreSQL database dump complete
--

