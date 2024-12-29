import { getAllActivities } from "@/controllers/get";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { method } = req;

    const { param } = req.query;

    console.log(param);

    try {
        if (method === "GET") {
            getAllActivities(req, res);

        } else {
            res.setHeader("Allow", ["GET"]);
            res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error: unknown) {
        res.status(500).json({
            message: "Internal Server Error",
            error: (error as Error).message,
            timestamp: new Date().toISOString()
        });
    }
}