-- DROP TABLE public.contatos;

CREATE TABLE public.contatos (
	id serial4 NOT NULL,
	nome varchar(100) NULL,
	endereco text NULL,
	telefone text NULL,
	CONSTRAINT contatos_pkey PRIMARY KEY (id)
);

INSERT INTO public.contatos (nome, endereco, telefone) VALUES ('Contato 1', 'Rua Alpha, 10', '+1 55 98765-0001');
INSERT INTO public.contatos (nome, endereco, telefone) VALUES ('Contato 2', 'Rua Beta, 20', '+1 55 98765-0002');
INSERT INTO public.contatos (nome, endereco, telefone) VALUES ('Contato 3', 'Rua Gamma, 30', '+1 55 98765-0003');
INSERT INTO public.contatos (nome, endereco, telefone) VALUES ('Contato 4', 'Rua Delta, 40', '+1 55 98765-0004');
INSERT INTO public.contatos (nome, endereco, telefone) VALUES ('Contato 5', 'Rua Epsilon, 50', '+1 55 98765-0005');
INSERT INTO public.contatos (nome, endereco, telefone) VALUES ('Contato 6', 'Rua Zeta, 60', '+1 55 98765-0006');
INSERT INTO public.contatos (nome, endereco, telefone) VALUES ('Contato 7', 'Rua Eta, 70', '+1 55 98765-0007');
INSERT INTO public.contatos (nome, endereco, telefone) VALUES ('Contato 8', 'Rua Theta, 80', '+1 55 98765-0008');
INSERT INTO public.contatos (nome, endereco, telefone) VALUES ('Contato 9', 'Rua Iota, 90', '+1 55 98765-0009');
INSERT INTO public.contatos (nome, endereco, telefone) VALUES ('Contato 10', 'Rua Kappa, 100', '+1 55 98765-0010');
INSERT INTO public.contatos (nome, endereco, telefone) VALUES ('Contato 11', 'Rua Lambda, 110', '+1 55 98765-0011');
INSERT INTO public.contatos (nome, endereco, telefone) VALUES ('Contato 12', 'Rua Mu, 120', '+1 55 98765-0012');
INSERT INTO public.contatos (nome, endereco, telefone) VALUES ('Contato 13', 'Rua Nu, 130', '+1 55 98765-0013');
INSERT INTO public.contatos (nome, endereco, telefone) VALUES ('Contato 14', 'Rua Xi, 140', '+1 55 98765-0014');
INSERT INTO public.contatos (nome, endereco, telefone) VALUES ('Contato 15', 'Rua Omicron, 150', '+1 55 98765-0015');
INSERT INTO public.contatos (nome, endereco, telefone) VALUES ('Contato 16', 'Rua Pi, 160', '+1 55 98765-0016');
INSERT INTO public.contatos (nome, endereco, telefone) VALUES ('Contato 17', 'Rua Rho, 170', '+1 55 98765-0017');
INSERT INTO public.contatos (nome, endereco, telefone) VALUES ('Contato 18', 'Rua Sigma, 180', '+1 55 98765-0018');
INSERT INTO public.contatos (nome, endereco, telefone) VALUES ('Contato 19', 'Rua Tau, 190', '+1 55 98765-0019');
INSERT INTO public.contatos (nome, endereco, telefone) VALUES ('Contato 20', 'Rua Upsilon, 200', '+1 55 98765-0020');

alter table contatos 
add estado text null;

update contatos 
set estado = 'RS';


alter table contatos 
add cidade text null;
alter table contatos 
add bairro text null;
alter table contatos 
add numero text null;
alter table contatos 
add tipo text null;

alter table contatos 
rename column endereco to logradouro;
