import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();


export default async function updateActivity(req: NextApiRequest, res: NextApiResponse) {
    const { id, ...updateData } = req.body;

    try {
        const activity = await prisma.activity.update({
            where: { id: id as string },
            data: updateData
        });

        res.status(200).json(activity);
    } catch (error: unknown) {
        res.status(500).json({
            message: "Internal Server Error",
            error: (error as Error).message,
            timestamp: new Date().toISOString()
        });
    } finally {
        await prisma.$disconnect();
    }
}