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
    email_address text,
    mobile_number text
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

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.client.client_id;


--
-- Name: client client_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client ALTER COLUMN client_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: client; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.client (client_id, first_name, last_name, email_address, mobile_number) FROM stdin;
112	Renee	Wortley	renee.wortley@outlook.com	\N
115	Laura	Smith	lauralouisesmith96@gmail.com	0413291535
118	Kat	Serbin	katserbin1@gmail.com	\N
119	Anita	Maroon-Yacoub	anitalahood@hotmail.com	\N
120	Sara	Kyrios	sara.kyrios@gmail.com	\N
121	Caitlin	Bruce	caitlin.bruce20@gmail.com	\N
122	Thea	Blyth	theablyth@gmail.com	\N
124	Hannah	Nagel	hannah_nagel@outlook.com	\N
125	Rosie	Hall	rosie.hall@hotmail.com	\N
126	Meg	Wong	meg-wong@hotmail.com	\N
128	Jessica	Bandiera	jessica_bandiera@hotmail.com	\N
131	Anisha	Seth	anishaseth5@gmail.com	\N
132	Maddy	Forbes	maddyforbes14@gmail.com	\N
133	Aimee	Menzies	aimee.menzies1@gmail.com	\N
135	Emily	Burgess	eburgess@live.com.au	\N
136	Claire	Cooper	cooper1603@gmail.com	\N
137	Jaime	Bucciarelli	jaimebucciarelli@gmail.com	\N
138	Catherine	Sharkey	catherine_sharkey@hotmail.com	\N
139	Nivetha	Mohan	n.mohann@hotmail.com	\N
140	Danielle	Maiolo	daniellemaiolo@hotmail.com	\N
141	Rose	Bristow	rosemary.bristow@gmail.com	\N
142	Victoria	Struthers	struthers.victoria@gmail.com	\N
143	Samantha	Morris	samantha_morris@outlook.com	\N
144	Abigail	Paulic	abigailsaunders@hotmail.com	\N
145	Shannon	Gambino	thestationeryboss@gmail.com	\N
146	Natalie	Ryan	Natalie_Ryan_@hotmail.com	\N
147	Christine	Tierney	ctierney84@gmail.com	\N
148	Sarah	Basha	sarahcbasha@gmail.com	\N
149	Sara	Qureshi	sara.qureshi2011@hotmail.com	\N
150	Maryanne	Lamositele	maryannelamositele@gmail.com	\N
151	Stephanie	Randall	stephanie.randall91@hotmail.com	\N
152	Janja	\N	janja.jt@gmail.com	\N
154	Leena	El Sadr	elsadrleena89@gmail.com	\N
155	Fianna	Phung	fiannaphung@hotmail.com	\N
156	Sascha	Horsley	sascha.horsley@gmail.com	\N
157	Kerry	\N	kerry55_@hotmail.com	\N
158	Jacqui	Godinet	jacqui.abbott@hotmail.com	\N
159	Sameena	Sultana	sameenaisawesome83@gmail.com	\N
160	Tina	\N	csilinuu@gmail.com	\N
161	Carly	Mannix	carlymannix@hotmail.com	\N
162	Courtney	Fernandes	courtneyjfernandes@gmail.com	\N
163	Lillian	Shann	lillianshann@gmail.com	\N
164	Rebecca	K	becton80@bigpond.com	\N
165	Marina	Hoetzinger	m.erian@hotmail.com.au	\N
166	Lily	Hii	lilyhii1981@gmail.com	\N
168	Mikaela	Tancred	mik8la.tancred@gmail.com	\N
169	Georgia	Devlin	georgia.devlin00@hotmail.com	\N
170	Kasey	Kieuoanh	le.kieuoanh90@gmail.com	\N
171	Tania	Maiolo	t_maiolo@hotmail.com	\N
172	Parisa	Shidi	parashidi@gmail.com	\N
178	Brooke	Pisani	brooke_pisani@icloud.com	\N
179	Germaine	Tan	germainetan@gmail.com	\N
180	Sonia	Brown	sonia.brown2015@hotmail.com	\N
181	Amanda	\N	amlw2707@gmail.com	\N
182	Emma	Toovey	e.l.toovey@gmail.com	\N
183	Zahra	Bank	bankzahra@hotmail.com	\N
184	Cigdum	\N	cozturk1604@gmail.com	\N
91	Rebekah	Kent	rebekahkent11@gmail.com	\N
92	Wendy	Yee	wendyyeelaimun@gmail.com	\N
93	Emily	Botic	emilyy.botic@gmail.com	\N
94	Sara	Nelson	saramichellenelson@gmail.com	\N
95	Larissa	Emara	larissa_emara@hotmail.com	\N
96	Jane	Finlay	finlayjane@hotmail.com	\N
97	Catherine	Susanto	susanto.catherine@gmail.com	\N
98	Jess	Fontana	j_fontana92@hotmail.com	\N
99	Jenna	Hartigan	jennahartigan@hotmail.com	\N
100	Kirsty	Catania	kirstycatania@gmail.com	\N
101	Genevieve	Husband	genevieve.husband@syd.catholic.edu.au	\N
102	Danielle	Kirk	danielle_kirk@outlook.com	\N
103	Melanie	Talty	melaniejtalty@hotmail.com	\N
104	Kayla	Stone	kaylamreid@gmail.com	\N
105	Gracie	Mandala	gc.mandala@gmail.com	\N
106	Em	Conroy	em.conroy95@hotmail.com	\N
107	Theresa	Whitaker	theresa.sakr@hotmail.com	\N
108	Elyssia	Cirillo	lyss.cirillo@hotmail.com	\N
109	Amber	Hodgman	amber.hodgman1@hotmail.com	\N
110	Jessica	Ramonfosse	jessica_ramonfosse@hotmail.com	\N
111	Zoe	Clarkin	zec@live.com.au	\N
185	Tiana	Totaro	totaro.tiana@gmail.com	\N
186	Kelly	Webster	kellywebster@outlook.com.au	\N
187	Cardia	Eirlys	cardiaeirlys@hotmail.com	\N
189	Brittany	Anderson	brittany-anderson@live.com.au	\N
190	Aleksa	Latincic	a.latincic@hotmail.com	\N
192	Renasha	Roop	renasharoop@gmail.com	\N
193	Gemimah	Omari	alindagemimah@yahoo.com.au	\N
194	Cheyenne	Murupaenga	cheyenne.muru@hotmail.com	\N
195	Tayla	Dodge	tayladodge1@gmail.com	\N
197	Neha	Bisht	nehainquisitive@gmail.com	\N
198	Julienne	Swift	jswift2303@gmail.com	\N
199	Nikki	\N	nikkijez2019@gmail.com	\N
200	Rhiannon	Blair	rhii_blonde@hotmail.com	\N
201	Gabriella	Mu	gabriellamu96@icloud.com	\N
202	Lisa	Rad	lisa_marie_rad@hotmail.com	\N
113	Tonia	Shen	tonia.syd@gmail.com	0403142798
116	Michelle	Torrico	michellebt1996@hotmail.com	0449633938
1	Adelle	Erasmus	delmac96@hotmail.com	0413477866
2	Allison	Dunn	allysdunn@gmail.com	0406580523
3	Alysha	Bolton	alyshambolton@gmail.com	0437781045
4	Alysha	Mcdowell	mcdowellpm@gmail.com	0400495164
5	Amna	Khan	amna.khanhf@gmail.com	0413559365
6	Annie	Luu	aluu89@yahoo.com.au	0402515886
7	Annmaree	Parish	annmaree141@gmail.com	0404894527
8	Ashley	Turner	ashleyst23@outlook.com	0401108404
9	Bec	Luu	luu.rebecca93@gmail.com	0421158508
10	Behnaz	Rezaei	b_rezaei@hotmail.com	0432550764
11	Ben	Handley	benjaminhandley@live.com.au	0407676777
12	Caitlin	Bruce	caitlin.beuce20@gmail.com	0433521934
13	Camille	Goldring	camille_hopper@hotmail.com	0468715577
14	Cathy	Langdon	doylecathryn@gmail.com	0422225355
15	Chantal	Llamas	chantal.llamas16@gmail.com	0403168047
16	Cheltzie	Hall	cheltzlee@gmail.com	0466525033
17	Chenee	Cameron	cheneecameron92@hotmail.com	0451798792
18	Cigdem	Sumbul	Cjsumbul@rssc.com	0424239911
19	Danielle	Johnson	dfursey@yahoo.com	0405611581
20	David	Quinto	david.quinto@hotmail.com	0433709664
21	Elisse	Leite	elisseleite@gmail.com	0468742432
22	Eliza	Langron	eliza.p.davis@gmail.com	0400361641
23	Ellen	Dodson	info@helloaudreyphotography.com.au	0423364513
24	Ellicia	Taniguchi	Ebond@live.com.au	0433544717
25	Elly	Redmond	ellyredmondstyledlife@gmail.com	0421939039
26	Emilly	Ballinger	emilly.ballinger@gmail.com	0466113733
27	Emily	Smith	emilygracebarker@hotmail.com	0422491320
28	Emma	Trlin	emma.trlin@hotmail.com	0417747473
29	Georgia-Kate	Baker	gkmorgan@live.com.au	0409740088
30	Gianina	Jaucian	gianina.cueno@gmail.com	0433308995
31	Heather	Mcloughlin	heather.mcloughlin1@gmail.com	0466594769
32	Heidi	Pan	heididotpan@gmail.com	0451810822
33	Jacqueline	Ioane	jvertellini@hotmail.com	0417297729
34	Jamilah	Dela cruz	jamilahdelacruz91@gmail.com	0452194237
35	Janan	Ugras	canan_ugras@hotmail.com	0402541158
36	Jess	Bosco	jess.kitch10@gmail.com	0425281661
37	Jessica	Nesci Ussia	jessicanesci@gmail.com	0421496927
38	Jessica	Sparks	jessicasparks211@gmail.com	0414698108
39	Jessie	Bedford	jessie.boys@hotmail.com	0411847114
40	Joharra	Dy	j.lebron89@hotmail.com	0421019554
41	Jordan	Jones	jordyandryan18@gmail.com	0400475295
42	Jordyn	Keough	jordynkeough@hotmail.con	0458050793
43	Justine	Foo	Juzzy247@hotmail.com	0402313833
44	Karen	Luu	lk.karenl@gmail.com	0431084086
45	Kate	Ridge	krridge@yahoo.com	0404633944
46	Kathryn	Pedrana	kpedrana@hotmail.com	0400496603
47	Katie	Modderno	kbreen1249@gmail.com	0433655039
48	Katrina	Matthews	katrinah73@hotmail.com	0432760463
49	Kellie	Smith	smithkellie27@gmail.com	0422200875
50	Kelsey	Nasello	kelsey.rhian@gmail.com	0400476066
51	Kim	Nguyen	nguyen.kimnganann@gmail.com	0404245364
52	Larina	Quinton	dpdpersonaltraining@gmail.com	0404078627
53	Leah	Sifaheone	leahmilliehina@outlook.com	0450085504
54	Leanne	Cirillo	leannejoseph@hotmail.com	0423357756
55	Leanne	Langthorne	secombl_12@hotmail.com	0403560448
56	Lisa	Tu	lisa@sweetbotanics.com.au	0425331560
57	Ljubica	Seva	l.seva@live.com	0402498859
58	Melisa	Rylewski	melisarylewski@gmail.com	0448549181
59	Michelle	Newton-Vial	newtonm17@gmail.com	0424154149
60	Michelle	De Ubago	shellydeubago@gmail.com	0466946144
61	Nanda	Rai	nyakha_rai@hotmail.com	0402755047
62	Naomi	Woods	naomipwoods@gmail.com	0468784395
63	Natalie	Twyford	nrtwyford@gmail.com	0432660068
64	Patcharaporn	Techapanyo	pegutju@hotmail.com	0466556142
65	Rachel	Mauceri	rachel.mauceri@hotmail.com	0416257611
66	Rae	Jones	raejones17@outlook.com	0434145752
67	Rajvi	Shah	rajvishah06@gmail.com	0431311855
68	Renee	Michael	renee_khodeir@hotmail.com	0400965502
69	Rhiannon	Murphy	rhiannonm_194@hotmail.com	0431747588
70	Sammi	Handley	sammi.robinson@hotmail.com	0410429433
71	Sarah	Brown	sarahebrown@live.com.au	0410495862
72	Sarah	Villavicencio	sarahquinto25@yahoo.com	0430227861
73	Shur Lyka	Ilaya	lyka.ilaya@gmail.com	0433211262
74	Simiran	Bassa	sbassa02@hotmail.com	0422206480
75	Steph	Climpson	steph_climpson@hotmail.com	0432522751
76	Suhasini	Khan	suhasini.m87@gmail.com	0431229183
77	Sushma	Sukumar	sushmasukumar727@gmail.com	0403490221
78	Swaroopa	Regulavalasa	swaroopa.regulavalasa@gmail.com	0470425703
79	Tanja	Wade	tanja1207@gmail.com	0466325835
80	Tatiana	Shen	tatiana.shen@det.nsw.edu.au	0416503103
81	Victoria	Kir	vicko.k@gmail.com	0414738718
82	William	Johnston	Wjohnston2@parra.catholic.edu.au	0402704616
83	Yasmeen	Al-Hindawi	yalhindawi@gmail.com	0422574006
84	Ying	Xu	yingxu138@hotmail.com	0423248872
85	Yuko	Provenzano	yakimoto61@gmail.com	04135373774
86	Yvonne	Elias	yvonnelahood@hotmail.com	0466909618
114	Natasha	Fiori	natasha.fiori@hotmail.com	0413470661
117	Caitlin	Walker	caitlinbiddle@hotmail.com	0408814478
87	Rosey	Banez	roseeybanez@gmail.com	\N
88	Natasha	Johnson	natasha.phelan@hotmail.com	\N
89	Ellen	Hepworth	ellenjhepworth@gmail.com	\N
90	Jodi	Nikoloff	jodiperrett@gmail.com	\N
\.


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_user_id_seq', 202, true);


--
-- Name: client users_email_address_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT users_email_address_key UNIQUE (email_address);


--
-- Name: client users_mobile_number_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT users_mobile_number_key UNIQUE (mobile_number);


--
-- Name: client users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT users_pkey PRIMARY KEY (client_id);


--
-- PostgreSQL database dump complete
--

