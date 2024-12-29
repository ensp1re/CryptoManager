import { getActivitiesByUser, getActivityById } from "@/controllers/get";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { method } = req;

    const {param} = req.query;

    console.log(param);

    try {
        if (method === "GET") {
            const isUser = await prisma.user.findUnique({ where: { id: String(req.query.id) } });
            const isActivity = await prisma.activity.findUnique({ where: { id: String(req.query.id) } });
            if (isUser) {
                getActivitiesByUser(req, res);
            } else if (isActivity) {
                getActivityById(req, res);
            } else {
                res.status(404).json({ message: "Not Found" });
            }
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