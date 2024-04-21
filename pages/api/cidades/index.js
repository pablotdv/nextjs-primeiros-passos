import authMiddleware from "@/src/authMiddleware";
import { sql } from '@vercel/postgres'

export default async function handler(req, res) {
    return authMiddleware(async (req, res) => {
        if (req.method === 'GET') {
            res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Expires', '0');

            const { rows } = await sql` select * 
                                        from cidades 
                                        where estadoid = ${req.query.estadoid}
                                        order by nome`;

            res.json(rows);
            return;
        }

        res.status(405).end();
        return;
    })(req, res)
}