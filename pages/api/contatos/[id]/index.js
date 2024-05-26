import authMiddleware from "@/src/authMiddleware";
import { sql } from "@vercel/postgres"

export default async function handler(req, res) {
    return authMiddleware(async (req, res) => {
        if (req.method === 'GET') {
            const { rows } = await sql` select c.*, b.nome as bairro, c2.nome as cidade, e.nome as estado, b.cidadeid, c2.estadoid 
                                            from contatos c 
                                            join bairros b on c.bairroid = b.id 
                                            join cidades c2 on b.cidadeid = c2.id 
                                            join estados e on c2.estadoid = e.id
                                        where c.id = ${req.query.id}`;

            res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Expires', '0');

            res.json(rows[0] || null);
            return;
        } else if (req.method === 'PUT') {
            const { nome,
                logradouro,
                telefone,
                bairroid,
                numero,
                tipo,
                observacao,
                idade
            } = req.body;
            try {
                await sql`
                update contatos
                set nome = ${nome}, 
                    logradouro = ${logradouro}, 
                    telefone = ${telefone},                    
                    bairroid = ${bairroid},
                    numero = ${numero},
                    tipo = ${tipo},
                    observacao = ${observacao},
                    idade = ${idade}
                where id = ${req.query.id}
            `
                res.status(201).end();
            }
            catch (error) {
                res.status(500).json({ error: error.message })
            }
            return;
        } else if (req.method === 'DELETE') {
            try {
                await sql`delete from contatos where id = ${req.query.id}`;
                res.status(201).end();
            }
            catch (error) {
                res.status(500).json({ error: error.message })
            }
            return;
        }

        res.status(405).end();
        return;
    })(req, res);
}
