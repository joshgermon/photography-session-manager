--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3 (Debian 15.3-1.pgdg120+1)
-- Dumped by pg_dump version 15.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: client; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.client (
    client_id integer NOT NULL,
    first_name text NOT NULL,
    last_name text,
    email_address text NOT NULL,
    mobile_number text
);


--
-- Name: client_client_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.client_client_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: client_client_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.client_client_id_seq OWNED BY public.client.client_id;


--
-- Name: client_session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.client_session (
    session_id integer NOT NULL,
    client_id integer NOT NULL,
    session_package_id integer,
    session_date date NOT NULL,
    location text,
    created_at date DEFAULT now()
);


--
-- Name: client_session_session_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.client_session_session_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: client_session_session_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.client_session_session_id_seq OWNED BY public.client_session.session_id;


--
-- Name: session_type; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.session_type (
    session_type_id integer NOT NULL,
    name text NOT NULL,
    description text,
    created_at date DEFAULT now()
);


--
-- Name: sessionType_session_type_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."sessionType_session_type_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessionType_session_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."sessionType_session_type_id_seq" OWNED BY public.session_type.session_type_id;


--
-- Name: session_package; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.session_package (
    session_package_id integer NOT NULL,
    name text NOT NULL,
    session_type_id integer NOT NULL,
    duration_in_minutes integer,
    price integer NOT NULL,
    currency_code text DEFAULT 'AUD'::text,
    created_at date DEFAULT now()
);


--
-- Name: session_package_session_package_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.session_package_session_package_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: session_package_session_package_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.session_package_session_package_id_seq OWNED BY public.session_package.session_package_id;


--
-- Name: client client_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client ALTER COLUMN client_id SET DEFAULT nextval('public.client_client_id_seq'::regclass);


--
-- Name: client_session session_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_session ALTER COLUMN session_id SET DEFAULT nextval('public.client_session_session_id_seq'::regclass);


--
-- Name: session_package session_package_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session_package ALTER COLUMN session_package_id SET DEFAULT nextval('public.session_package_session_package_id_seq'::regclass);


--
-- Name: session_type session_type_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session_type ALTER COLUMN session_type_id SET DEFAULT nextval('public."sessionType_session_type_id_seq"'::regclass);


--
-- Data for Name: client; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.client (client_id, first_name, last_name, email_address, mobile_number) FROM stdin;
1	Joshua	Germon	joshgermon@gmail.com	
4	Angela	Germon	angegermon@gmail.com	\N
5	Josh	Germon	joshgermon@icloud.com	\N
6	Joshua	Germon	joshgermon@googlemail.com	\N
7	Joshua	Germon	joshgermon@test.com	\N
9	Joshua	Germon	joshgermon@test1.com	\N
10	Tim	Cook	tim@apple.com	\N
11	Jack	Smith	jack@smith.com	\N
12	Revalidate	Please	please@thankyou.com	\N
13	Test	Tag	tag@tag.com	\N
14	Pedro	Duarte	pedro@duarte.com	\N
16	Jim	Halpert	jim@dundermifflin.com	\N
\.


--
-- Data for Name: client_session; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.client_session (session_id, client_id, session_package_id, session_date, location, created_at) FROM stdin;
48	1	1	2022-01-01	Rouse Hill	2023-09-24
49	7	4	2023-09-24	Rouse Hill Regional Park, NSW	2023-09-24
\.


--
-- Data for Name: session_package; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.session_package (session_package_id, name, session_type_id, duration_in_minutes, price, currency_code, created_at) FROM stdin;
1	30 Minutes	1	30	39900	AUD	2023-07-29
2	60 Minutes	1	60	56900	AUD	2023-07-29
3	90 Minutes	1	90	69900	AUD	2023-07-29
4	60 Minutes	2	60	59900	AUD	2023-07-29
5	90 Minutes	2	90	69900	AUD	2023-07-29
\.


--
-- Data for Name: session_type; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.session_type (session_type_id, name, description, created_at) FROM stdin;
1	Family Portraits	Standard Family Photography Session	2023-07-29
2	Newborn Portraits	Standard Newborn Photography Session	2023-07-29
3	Wedding Photography	Standard Full Coverage Wedding Photography Packages	2023-07-29
\.


--
-- Name: client_client_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.client_client_id_seq', 16, true);


--
-- Name: client_session_session_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.client_session_session_id_seq', 49, true);


--
-- Name: sessionType_session_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."sessionType_session_type_id_seq"', 3, true);


--
-- Name: session_package_session_package_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.session_package_session_package_id_seq', 5, true);


--
-- Name: client client_email_address_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT client_email_address_unique UNIQUE (email_address);


--
-- Name: client client_mobile_number_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT client_mobile_number_unique UNIQUE (mobile_number);


--
-- Name: client client_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT client_pkey PRIMARY KEY (client_id);


--
-- Name: client_session client_session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_session
    ADD CONSTRAINT client_session_pkey PRIMARY KEY (session_id);


--
-- Name: session_type sessionType_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session_type
    ADD CONSTRAINT "sessionType_pkey" PRIMARY KEY (session_type_id);


--
-- Name: session_package session_package_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session_package
    ADD CONSTRAINT session_package_pkey PRIMARY KEY (session_package_id);


--
-- Name: client_session client_session_client_id_client_client_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_session
    ADD CONSTRAINT client_session_client_id_client_client_id_fk FOREIGN KEY (client_id) REFERENCES public.client(client_id);


--
-- Name: client_session client_session_session_package_id_session_package_session_packa; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_session
    ADD CONSTRAINT client_session_session_package_id_session_package_session_packa FOREIGN KEY (session_package_id) REFERENCES public.session_package(session_package_id);


--
-- Name: session_package session_package_session_type_id_session_type_session_type_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session_package
    ADD CONSTRAINT session_package_session_type_id_session_type_session_type_id_fk FOREIGN KEY (session_type_id) REFERENCES public.session_type(session_type_id);


--
-- PostgreSQL database dump complete
--

