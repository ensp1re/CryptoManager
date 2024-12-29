import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { UnthorizedError } from "./helper";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export default async function authenticate(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
        throw new UnthorizedError();
    }

    console.log(session);

    const userWithId = await prisma.user.findUnique({
        where: { email: String(session.user?.email) },
        select: {
            id: true,
            email: true,
            name: true,
            image: true,
        }
    })

    if (!userWithId) {
        throw new UnthorizedError();
    }

    return userWithId;
};