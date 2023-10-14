import { sql } from "@vercel/postgres"

export default async function handler(req, res) {

    if (req.method === 'GET') {
        const { rows } = await sql`select * from contatos where id = ${req.query.id}`;

        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');

        res.json(rows[0] || null);
        return;
    } else if (req.method === 'PUT') {
        const { nome, logradouro, telefone, estado, cidade, bairro, numero, tipo } = req.body;
        try {
            await sql`
                update contatos
                set nome = ${nome}, 
                    logradouro = ${logradouro}, 
                    telefone = ${telefone},
                    estado = ${estado},
                    cidade = ${cidade},
                    bairro = ${bairro},
                    numero = ${numero},
                    tipo = ${tipo}
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
}
