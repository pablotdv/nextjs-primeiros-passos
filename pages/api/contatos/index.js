import { sql } from "@vercel/postgres"

export default async function handler(req, res) {

  if (req.method === 'GET') {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    if (req.query.bairro) {
      const bairroLike = `%${req.query.bairro}%`
      const { rows } = await sql` select * 
                                  from contatos 
                                  where bairro like ${bairroLike}
                                  order by nome `;
      res.json(rows);
    } else {
      const { rows } = await sql` select * 
                                  from contatos                                   
                                  order by nome `;
      res.json(rows);
    }
    return;
  } else if (req.method === 'POST') {
    const { nome, logradouro, telefone, estado, cidade, bairro, numero, tipo } = req.body;

    try {
      await sql`insert into contatos (nome, logradouro, telefone, estado, cidade, bairro, numero, tipo) 
                values (${nome},${logradouro},${telefone},${estado},${cidade},${bairro},${numero},${tipo})`
      res.status(201).end();
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
    return;
  }

  res.status(405).end();
  return;
}
