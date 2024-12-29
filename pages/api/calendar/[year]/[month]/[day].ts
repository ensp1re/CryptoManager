import authenticate from "@/lib/authMiddleware";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const year = Array.isArray(req.query.year) ? req.query.year[0] : req.query.year;
    const month = Array.isArray(req.query.month) ? req.query.month[0] : req.query.month;
    const day = Array.isArray(req.query.day) ? req.query.day[0] : req.query.day;

    if (!year || !month || !day) {
        return res.status(400).json({ message: "Missing date parameters" });
    }

    const user = await authenticate(req, res);

    try {
        if (method !== "GET") {
            res.setHeader("Allow", ["GET"]);
            res.status(405).end(`Method ${method} Not Allowed`);
        } else if (method === "GET") {


            const startDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
            const endDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), 23, 59, 59);
            const activity = await prisma.activity.findMany({
                where: {
                    userId: user.id,
                    deadline: {
                        gte: startDate,
                        lte: endDate
                    }
                }
            });

            if (!activity) {
                return res.status(404).json({ message: "Activity not found" });
            }


            res.status(200).json({
                message: "Activities found",
                data: activity

            });
        } else {
            res.status(404).json({ message: "Not Found" });
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
}