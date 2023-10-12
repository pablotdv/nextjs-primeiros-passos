-- DROP TABLE public.contatos;

CREATE TABLE public.contatos (
	id serial4 NOT NULL,
	nome varchar(100) NULL,
	endereco text NULL,
	telefone text NULL,
	CONSTRAINT contatos_pkey PRIMARY KEY (id)
);