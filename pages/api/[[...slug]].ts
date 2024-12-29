import { NextApiRequest, NextApiResponse } from "next";


export default function handler(req: NextApiRequest, res: NextApiResponse) {

    const { slug } = req.query;

    res.status(404).json({ message: `Page not found for ${Array.isArray(slug) ? slug.join('/') : slug || ''}` });
}