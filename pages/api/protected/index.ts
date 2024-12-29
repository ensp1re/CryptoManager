import authenticate from "@/lib/authMiddleware";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const user = await authenticate(req, res);
        if (user) {
            res.status(200).json({
                message: "Authenticated",
                data: user
            })
        }
    } catch (
    error: unknown
    ) {
        res.status(500).json({
            message: "Internal Server Error protected()",
            error: (error as Error).message,
            timestamp: new Date().toISOString()
        });
    }
};