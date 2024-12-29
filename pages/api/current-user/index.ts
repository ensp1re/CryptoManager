import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";


const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { method } = req;

    const session = await getServerSession(req, res, authOptions);

    if (!session) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const email: string = session.user?.email as string;

    try {
        if (method === "GET") {
            const isUser = await prisma.user.findUnique({
                where: { email: String(email) },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    image: true,
                }
            });

            if (isUser) {
                res.status(200).json(isUser);
            } else {
                res.status(404).json({ message: "Not Found" });
            }


            res.status(200).json({
                message: "User found",
                data: isUser
            });
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
};