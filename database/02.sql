CREATE TABLE public.estados (
    id serial PRIMARY KEY,
    nome text NOT NULL
);

CREATE TABLE public.cidades (
    id serial PRIMARY KEY,
    nome text NOT NULL,
    estadoid int NOT NULL,
    CONSTRAINT fk_estados
        FOREIGN KEY(estadoid)
            REFERENCES public.estados(id)
            ON DELETE CASCADE
);

CREATE TABLE public.bairros (
    id serial PRIMARY KEY,
    nome text NOT NULL,
    cidadeid int NOT NULL,
    CONSTRAINT fk_cidades
        FOREIGN KEY(cidadeid)
            REFERENCES public.cidades(id)
            ON DELETE CASCADE
);

ALTER TABLE public.contatos
ADD COLUMN bairroid int,
ADD CONSTRAINT fk_bairros
    FOREIGN KEY(bairroid)
        REFERENCES public.bairros(id)
        ON DELETE SET NULL;

insert into estados (nome)
select distinct estado
from contatos
where not exists (
	select null
	from estados e 
	where e.nome = contatos.estado
)
;

insert into cidades (nome, estadoid)
select distinct cidade, e.id estadoId
from contatos c 
	join estados e on c.estado = e.nome 
where not exists (
	select null
	from cidades c2 
	where c2.nome = c.cidade 
		and c2.estadoId = e.id 
)	
;

insert into bairros (nome, cidadeid)
select distinct c.bairro, c2.id as cidadeId
from contatos c 
	join cidades c2 on c.cidade = c2.nome 
where not exists (
	select null
	from bairros b 
	where b.nome = c.bairro 
		and b.cidadeId = c2.id
)
;

UPDATE contatos c
SET bairroid = b.id
FROM bairros b, cidades c2, estados e
WHERE c.bairro = b.nome
	AND b.cidadeid = c2.id
	AND c2.estadoid = e.id
	AND c.cidade = c2.nome
	AND c.estado = e.nome;

       
-- Ajuste nas colunas de Contatos para remover estado, cidade e bairro que agora serão referenciados por chave estrangeira
ALTER TABLE public.contatos
DROP COLUMN estado,
DROP COLUMN cidade,
DROP COLUMN bairro;
