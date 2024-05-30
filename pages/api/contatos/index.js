import authMiddleware from "@/src/authMiddleware";
import { sql } from "@vercel/postgres"

export default async function handler(req, res) {
  return authMiddleware(async (req, res) => {
    if (req.method === 'GET') {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');

      if (req.query.bairro) {
        const bairroLike = `%${req.query.bairro}%`
        const { rows } = await sql` select contatos.*, bairros.nome as bairro, cidades.nome as cidade, estados.nome as estado
                                    from contatos
                                      join bairros on contatos.bairroid = bairros.id
                                      join cidades on bairros.cidadeid = cidades.id
                                      join estados on cidades.estadoid = estados.id 
                                    where bairros.nome like ${bairroLike}
                                    order by nome `;
        res.json(rows);
      } else {
        const { rows } = await sql` select contatos.*, bairros.nome as bairro, cidades.nome as cidade, estados.nome as estado
                                    from contatos
                                      join bairros on contatos.bairroid = bairros.id
                                      join cidades on bairros.cidadeid = cidades.id
                                      join estados on cidades.estadoid = estados.id 
                                    order by contatos.nome `;
        res.json(rows);
      }
      return;
    } else if (req.method === 'POST') {
      const {
        nome,
        logradouro,
        telefone,
        bairro,
        numero,
        tipo,
        observacao,
        idade
      } = req.body;

      try {
        await sql`insert into contatos (nome, logradouro, telefone, bairroid, numero, tipo, observacao, idade) 
                  values (${nome},${logradouro},${telefone},${bairro},${numero},${tipo},${observacao},${idade})`
        res.status(201).end();
      } catch (error) {
        res.status(500).json({ error: error.message })
      }
      return;
    }

    res.status(405).end();
    return;
  })(req, res);
}
