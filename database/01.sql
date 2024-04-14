CREATE TABLE public.contatos (
    id integer NOT NULL,
    nome character varying(100),
    logradouro text,
    bairro text,
    cidade text,
    uf text,
    latitude text,
    longitude text,
    tipo text
);


CREATE SEQUENCE public.contatos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.contatos_id_seq OWNED BY public.contatos.id;


CREATE TABLE public.usuarios (
    id integer NOT NULL,
    username character varying(100),
    password text
);


CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


ALTER TABLE ONLY public.contatos ALTER COLUMN id SET DEFAULT nextval('public.contatos_id_seq'::regclass);


ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


INSERT INTO public.contatos VALUES (59, 'H49', 'Dev - Av. A.J. Renner, 1015', 'Estância Velha', 'Canoas', 'RS', '-29.9178339', '-51.146292', 'Hid Caixa Rosca ');
INSERT INTO public.contatos VALUES (29, 'H19', 'Dev - Rua Domingos Martins, 1008', 'Centro', 'Canoas', 'RS', '-29.9145575', '-51.1878998', 'Hid Caixa Rosca ');
INSERT INTO public.contatos VALUES (26, 'H16', 'Dev - Rua Camboatás, 505', 'Igara', 'Canoas', 'RS', '-29.9011144', '-51.1462971', 'Hid Coluna Rosca');
INSERT INTO public.contatos VALUES (27, 'H17', 'Dev - Rua Camboatás, 585', 'Igara', 'Canoas', 'RS', '-29.9003907', '-51.1460735', 'Hid Coluna Rosca');
INSERT INTO public.contatos VALUES (28, 'H18', 'Dev - Rua Camboatás, 545', 'Igara', 'Canoas', 'RS', '-29.9008212', '-51.1462207', 'Hid Coluna Rosca');
INSERT INTO public.contatos VALUES (33, 'H23', 'Dev - Av. Farroupilha, 6901', 'Igara', 'Canoas', 'RS', '-29.8960435', '-51.1673134', 'Hid Coluna Rosca');
INSERT INTO public.contatos VALUES (36, 'H26', 'Dev - Rua 15 de Janeiro, 87, esq. Rua Frei Orlando', 'Centro', 'Canoas', 'RS', '-29.9211843', '-51.1801732', 'Hid Caixa Rosca ');
INSERT INTO public.contatos VALUES (10, 'H03', 'Dev - Rua Verona Nº 18', 'Igara', 'Canoas', 'RS', '-29.886692', '-51.1446482', 'Hid Caixa Rosca ');
INSERT INTO public.contatos VALUES (9, 'H02', 'Dev - AV. A. J. Renner, Nº 2112', 'Estância Velha', 'Canoas', 'RS', '-29.9799467', '-51.192131', 'Hid Caixa Rosca ');
INSERT INTO public.contatos VALUES (16, 'H09', 'Dev - Av. Do Nazário, nº 2111', 'Olaria', 'Canoas', 'RS', '-29.9092619', '-51.1321899', 'Hid Coluna Rosca');
INSERT INTO public.contatos VALUES (13, 'H07', 'Dev - Rua Anita Garibaldi, 20 esquina com a Av. Getúlio Vargas', 'Centro', 'Canoas', 'RS', '-29.9123857', '-51.1776615', 'Hid Caixa Rosca ');
INSERT INTO public.contatos VALUES (37, 'H27', 'Dev - Av. Getúlio Vargas, 6880', 'Centro', 'Canoas', 'RS', '-29.904519', '-51.1768776', 'Hid Coluna Storz ');
INSERT INTO public.contatos VALUES (43, 'H33', 'Dev - Rua Tauro Muller, 63, esq. Rua Nossa Senhora do Perpétuo Socorro', 'São José', 'Canoas', 'RS', '-29.8849873', '-51.1777411', 'Hid Coluna Rosca');
INSERT INTO public.contatos VALUES (14, 'H06', 'Dev - Rua Antônio Fonseca Barcelos, nº 200', 'Marechal Rondon', 'Canoas', 'RS', '-29.9058258', '-51.172334', 'Hid Coluna Rosca');
INSERT INTO public.contatos VALUES (17, 'H10', 'Dev - Rua General Câmara, nº 875', 'Rio Branco', 'Canoas', 'RS', '-29.9656285', '-51.1854813', 'Hid Coluna Rosca');
INSERT INTO public.contatos VALUES (21, 'H13', 'Dev - Rua Armando Fajardo, 200 em frente ao Banrisul', 'Igara', 'Canoas', 'RS', '-29.8943903', '-51.1736869', 'Hid Coluna Rosca');
INSERT INTO public.contatos VALUES (34, 'H24', 'Dev - Av. Farroupilha, 6900', 'Igara', 'Canoas', 'RS', '-29.8960446', '-51.1674485', 'Hid Coluna Rosca');
INSERT INTO public.contatos VALUES (25, 'H15', 'Dev - Rua Alegrete, n° 1308', 'Niterói', 'Canoas', 'RS', '-29.9543219', '-51.1625372', 'Hid Coluna Rosca');
INSERT INTO public.contatos VALUES (45, 'H35', 'Dev - Rua 15 de Novembro, 376', 'Nossa Senhora das Graças', 'Canoas', 'RS', '-29.9280288', '-51.1685276', 'Hid Caixa Rosca ');
INSERT INTO public.contatos VALUES (50, 'H40', 'Dev - Rua Rio de Janeiro, 360', 'Mathias Velho', 'Canoas', 'RS', '-29.9072239', '-51.1850279', 'Hid Coluna Rosca');
INSERT INTO public.contatos VALUES (51, 'H41', 'Dev - Av. A.J. Renner, 3125, esq. A.J. Renner', 'Estância Velha', 'Canoas', 'RS', '-29.9207732', '-51.1465467', 'Hid Caixa Rosca ');
INSERT INTO public.contatos VALUES (52, 'H42', 'Dev - Rua Santa Cecília, 41', 'Marechal Rondon', 'Canoas', 'RS', '-29.9182979', '-51.1754431', 'Hid Caixa Rosca ');
INSERT INTO public.contatos VALUES (54, 'H44', 'Dev - Rua Acucena, 50', 'Estância Velha', 'Canoas', 'RS', '-29.9274343', '-51.1561304', 'Hid Coluna Rosca');
INSERT INTO public.contatos VALUES (56, 'H46', 'Dev - Av. Santos Ferreira, 1191', 'Marechal Rondon', 'Canoas', 'RS', '-29.9245198', '-51.1678219', 'Hid Coluna Rosca');
INSERT INTO public.contatos VALUES (57, 'H47', 'Dev - Rua Santa Maria, 841, esquina Av. Santos Ferreira', 'Nossa Senhora das Graças', 'Canoas', 'RS', '-29.9232772', '-51.1733764', 'Hid Caixa Rosca ');
INSERT INTO public.contatos VALUES (65, 'H55', 'Dev - Rua Santa Terezinha, 681', 'Nossa Senhora das Graças', 'Canoas', 'RS', '-29.9307945', '-51.1642188', 'Hid Coluna Rosca');
INSERT INTO public.contatos VALUES (63, 'H53', 'Dev - Rua Eng. Homero Carlos Simon, 1089 prox. empr. Exatron', 'Guajuviras', 'Canoas', 'RS', '-29.9058727', '-51.1279804', 'Hid Coluna Rosca');
INSERT INTO public.contatos VALUES (64, 'H54', 'Dev - Av. do Nazário, 898', 'Olaria', 'Canoas', 'RS', '-29.9209135', '-51.1317773', 'Hid Coluna Rosca');
INSERT INTO public.contatos VALUES (66, 'H56', 'Dev - Rua Zulmiro Gomes da Silva, 338', 'Olaria', 'Canoas', 'RS', '-29.917905', '-51.116204', 'Hid Coluna Rosca');
INSERT INTO public.contatos VALUES (67, 'H57', 'Dev - Rua Coelho Neto, 462', 'Centro', 'Canoas', 'RS', '-29.9148731', '-51.1878057', 'Hid Caixa Rosca ');
INSERT INTO public.contatos VALUES (72, 'H62', 'Dev - Av. Guilherme Schell, 10780, em frente a empr. Purina', 'Industrial', 'Canoas ', 'RS', '-29.8755148', '-51.1810493', 'Hid Coluna Rosca');
INSERT INTO public.contatos VALUES (73, 'H63', 'Dev - Rua República, 2050', 'Mato Grande', 'Canoas ', 'RS', '-29.9150743', '-51.1979165', 'Hid Coluna Rosca');
INSERT INTO public.contatos VALUES (74, 'H64', 'Dev - Av. Brasil, 1297', 'Harmonia', 'Canoas', 'RS', '-29.9118249', '-51.188975', 'Hid Coluna Rosca');
INSERT INTO public.contatos VALUES (11, 'H04', 'Dev - AV. Victor Barreto, Nº 1636 esq. Rua Caetês', 'Centro', 'Canoas', 'RS', '-29.90261037328024', '-51.182603673682095', 'Hid Caixa Rosca ');
INSERT INTO public.contatos VALUES (15, 'H08', 'Dev - Rua Major Sezefredo, 1420, esq. com a Av. Araguaia', 'Igara', 'Canoas', 'RS', '-29.9019663', '-51.173084', 'Hid Coluna Storz ');
INSERT INTO public.contatos VALUES (24, 'H14', 'Dev - Av. Boqueirão, 2871 esq. Rua Curumim', 'Estância Velha', 'Canoas', 'RS', '-29.9055449', '-51.1471897', 'Hid Caixa Rosca ');
INSERT INTO public.contatos VALUES (19, 'H12', 'Dev - Rua das Araras, 273 esq. Rua dos Cardeais, ', 'Harmonia', 'Canoas', 'RS', '-29.9180769', '-51.19986', 'Hid Caixa Rosca ');
INSERT INTO public.contatos VALUES (30, 'H20', 'Dev - Rua Doutor Barcelos, 393, esq. Rua Vitor Kessler', 'Centro', 'Canoas', 'RS', '-29.9160105', '-51.1860807', 'Hid Coluna Rosca');
INSERT INTO public.contatos VALUES (31, 'H21', 'Dev - Rua Antônho Ficagha, 1257', 'Fátima', 'Canoas', 'RS', '-29.9427963', '-51.1905761', 'Hid Caixa Rosca ');
INSERT INTO public.contatos VALUES (32, 'H22', 'Dev - Rua Doutor Selbach, 11, esq. Av. Santos Ferreira', 'Nossa Senhora das Graças', 'Canoas', 'RS', '-29.9243494', '-51.1695638', 'Hid Caixa Rosca ');
INSERT INTO public.contatos VALUES (18, 'H11', 'Dev - Av. Antônio Frederico Ozanan, 4000', 'Brigadeira', 'Canoas', 'RS', '-29.8778945', '-51.142412', 'Hid Coluna Rosca');
INSERT INTO public.contatos VALUES (49, 'H39', 'Dev - Av. Rio Grande do Sul, 1830', 'Mathias Velho', 'Canoas', 'RS', '-29.9023347', '-51.1983449', 'Hid Coluna Rosca');
INSERT INTO public.contatos VALUES (38, 'H28', 'Dev - Av. Guilherme Shell, 5304', 'Centro', 'Canoas', 'RS', '-29.9221866', '-51.1808707', 'Hid Caixa Rosca ');
INSERT INTO public.contatos VALUES (39, 'H29', 'Dev - Rua Araçá, 122', 'Centro', 'Canoas', 'RS', '-29.9240567', '-51.1818035', 'Hid Caixa Rosca ');
INSERT INTO public.contatos VALUES (40, 'H30', 'Dev - Rua Mathias Velho, 102', 'Centro', 'Canoas', 'RS', '-29.9088522', '-51.1809112', 'Hid Caixa Rosca ');
INSERT INTO public.contatos VALUES (41, 'H31', 'Dev - Rua Maurício de Nassau, 14', 'Estância Velha', 'Canoas', 'RS', '29.9219295', '-51.1488511', 'Hid Caixa Rosca ');
INSERT INTO public.contatos VALUES (8, 'H01', 'Dev - Rua Ana Nery, 67, esq. Guilherme Schell', 'Rio Branco', 'Canoas', 'RS', '-29.9585457', '-51.1767833', 'Hid Caixa Rosca ');
INSERT INTO public.contatos VALUES (44, 'H34', 'Dev - Rua Professor Leonardo Ribeiro, 13', 'Estância Velha', 'Canoas', 'RS', '-29.9233501', '-51.1490045', 'Hid Caixa Rosca ');
INSERT INTO public.contatos VALUES (46, 'H36', 'Dev - Rua Dona Rafaela, 477', 'Centro', 'Canoas', 'RS', '-29.9172006', '-51.1725891', 'Hid Caixa Rosca ');
INSERT INTO public.contatos VALUES (47, 'H37', 'Dev - Rua Rio Negro, 277', 'Igara', 'Canoas', 'RS', '-29.903297', '-51.1714971', 'Hid Caixa Rosca ');
INSERT INTO public.contatos VALUES (48, 'H38', 'Dev - Rua Rio Negro, 555', 'Igara ', 'Canoas', 'RS', '-29.9034683', '-51.1689249', 'Hid Caixa Rosca ');
INSERT INTO public.contatos VALUES (55, 'H45', 'Dev - Av. Santos Ferreira, 965', 'Nossa Senhora das Graças', 'Canoas', 'RS', '-29.9240486', '-51.1699921', 'Hid Coluna Rosca');
INSERT INTO public.contatos VALUES (60, 'H50', 'Dev - Rua Siqueira Campos, 21', 'Centro', 'Canoas', 'RS', '-29.9130736', '-51.1778963', 'Hid Caixa Rosca ');
INSERT INTO public.contatos VALUES (61, 'H51', 'Dev - Rua Oscar Pedro Kulzer, 18 esq. Rua Tenente João Antônio', 'Estância Velha', 'Canoas', 'RS', '-29.9263204', '-51.1495177', 'Hid Caixa Rosca ');
INSERT INTO public.contatos VALUES (62, 'H52', 'Dev - Rua Eng. Homero Carlos Simon, 1100', 'Guajuviras ', 'Canoas', 'RS', '-29.9041486', '-51.128002', 'Hid Coluna Rosca');
INSERT INTO public.contatos VALUES (69, 'H59', 'Dev - Av. Brasil, 384', 'Centro', 'Canoas', 'RS', '-29.9201418', '-51.1882888', 'Hid Caixa Rosca ');
INSERT INTO public.contatos VALUES (70, 'H60', 'Dev - Rua Victor Rycembel, 278', 'Centro', 'Canoas', 'RS', '-29.9102551', '-51.1907489', 'Hid Caixa Rosca ');
INSERT INTO public.contatos VALUES (35, 'H25', 'Dev - Rua da FIgueira, 414', 'Nossa Senhora das Graças', 'Canoas', 'RS', '-29.9316298', '-51.1729866', 'Hid Caixa Rosca ');
INSERT INTO public.contatos VALUES (42, 'H32', 'Dev - Rua Nelci Pereira Flores, 146', 'Harmonia', 'Canoas', 'RS', '-29.9152467', '-51.1912409', 'Hid Caixa Rosca ');
INSERT INTO public.contatos VALUES (53, 'H43', 'Dev - Av. Santos Ferreira, 3125 esq. Av. A.J. Renner', 'Estância Velha', 'Canoas', 'RS', '-29.9272238', '-51.1471421', 'Hid Coluna Rosca');
INSERT INTO public.contatos VALUES (58, 'H48', 'Dev - Av. Santos Ferreira, 1864, esq. Av. UM - Hospital N.S.G.', 'Marechal Rondon', 'Canoas', 'RS', '-29.9273801', '-51.1623713', 'Hid Coluna Rosca');
INSERT INTO public.contatos VALUES (71, 'H61', 'Dev - Av. Guilherme Shell, 10260', 'Industrial', 'Canoas', 'RS', '-29.8803043', '-51.1812867', 'Hid Coluna Rosca');
INSERT INTO public.contatos VALUES (68, 'H58', 'Dev - Rua Gildo de Freitas, 1205', 'Olaria', 'Canoas', 'RS', '-29.9138047', '-51.1225691', 'Hid Coluna Rosca');
INSERT INTO public.contatos VALUES (75, 'H65', 'Dev - Rua Doutor Barcelos, 127', 'Centro', 'Canoas', 'RS', '-29.9126197', '-51.1858067', 'Hid Coluna Rosca');
INSERT INTO public.contatos VALUES (6, 'H05', 'Dev - Rua Farroupilha, 4803 rótula com a Rua Aurora', 'Marechal Rondon', 'Canoas', 'RS', '-29.9107727', '-51.1652372', 'Hid Coluna Storz ');

INSERT INTO public.usuarios VALUES (1, 'dev', 'dev');

SELECT pg_catalog.setval('public.contatos_id_seq', 79, true);


SELECT pg_catalog.setval('public.usuarios_id_seq', 1, true);


ALTER TABLE ONLY public.contatos
    ADD CONSTRAINT contatos_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);

