import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "GET") {
            res.status(200).json({ message: "Server is working fine" });
        } else {
            res.status(405).json({ message: "Method Not Allowed" });
        }
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).send({
            message: err.message,
            stack: err.stack,
            timestamp: new Date().toISOString()
        });

    }
};
