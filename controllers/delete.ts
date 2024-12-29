import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


const prisma = new PrismaClient();

export default async function deleteActivity(req: NextApiRequest, res: NextApiResponse) {
    const data = req.body;

    try {
        const activity = await prisma.activity.delete({
            where: { id: data.id as string }
        });

        res.status(200).json({
            message: "Activity deleted",
            activity
        });
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

export async function deleteComment(req: NextApiRequest, res: NextApiResponse) {
    const data = req.body;

    try {
        const comment = await prisma.comment.delete({
            where: { id: data.id as string }
        });

        res.status(200).json({
            message: "Comment deleted",
            comment
        });
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