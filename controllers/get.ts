import authenticate from "@/lib/authMiddleware";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export async function getActivities(req: NextApiRequest, res: NextApiResponse) {
    const { orderBy, filter, search, page = 1, pageSize = 10 } = req.query;

    const auth = await authenticate(req, res);
    const userId = auth?.id;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    // Handle search
    if (search) {
        where.OR = [
            { project: { contains: search as string, mode: "insensitive" } },
            { acitivityDescription: { contains: search as string, mode: "insensitive" } }
        ];
    }

    // Additional predefined filters
    if (filter) {
        const filterStatus = filter as string;

        if (filterStatus === "completed") {
            where.completed = true;
        } else if (filterStatus === "notCompleted") {
            where.completed = false;
        } else if (filterStatus === "highCost") {
            where.cost = { gte: 1000 };
        } else if (filterStatus === "lowCost") {
            where.cost = { lt: 1000 };
        } else if (filterStatus === "highProfit") {
            where.profit = { gte: 500 };
        } else if (filterStatus === "lowProfit") {
            where.profit = { lt: 500 };
        }
    }

    // Filter by userId if provided
    if (userId) {

        const isUser = await prisma.user.findUnique({
            where: {
                id: userId as string
            }
        });

        if (!isUser) {
            return res.status(404).json({ message: "Activities not found" });
        }
        where.userId = userId as string;
    }



    const skip = (Number(page) - 1) * Number(pageSize);
    const take = Number(pageSize);

    let orderByParsed;

    try {
        orderByParsed = orderBy ? JSON.parse(orderBy as string) : { createdAt: "desc" };
    } catch {
        orderByParsed = { createdAt: "desc" };
    }

    try {
        const activities = await prisma.activity.findMany({
            where,
            orderBy: orderByParsed,
            skip,
            take,
            include: {
                comments: true
            }
        });

        const total = await prisma.activity.count({ where });
        res.status(200).json({ activities, total });
    } catch (error: unknown) {
        res.status(500).send({
            message: "Internal Server Error",
            stack: (error as Error).stack,
            timestamp: new Date().toISOString()
        });
    }
}

export async function getActivityById(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    try {
        const activity = await prisma.activity.findUnique({
            where: { id: id as string },
            include: {
                comments: true
            }
        });

        if (!activity) {
            return res.status(404).json({ message: "Activity not found" });
        }

        res.status(200).json({
            data: activity,
            type: "Activity"
        });
    } catch (error: unknown) {
        res.status(500).json({
            message: "Internal Server Error",
            error: (error as Error).message,
            timestamp: new Date().toISOString()
        });
    }
}

export async function getActivitiesByUser(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = req.query;

    try {
        const activities = await prisma.activity.findMany({
            where: { userId: userId as string },
            include: {
                comments: true
            }
        });

        res.status(200).json({
            data: activities,
            total: activities.length,
            type: "User Activities"
        });
    } catch (error: unknown) {
        res.status(500).json({
            message: "Internal Server Error",
            error: (error as Error).message,
            timestamp: new Date().toISOString()
        });
    }
}

export async function getAllActivities(req: NextApiRequest, res: NextApiResponse) {
    try {

        const isAuthorized = await authenticate(req, res);

        if (!isAuthorized) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const activities = await prisma.activity.findMany({
            include: {
                comments: true
            }
        });

        res.status(200).json({
            data: activities,
            total: activities.length,
            type: "All Activities"
        });
    } catch (error: unknown) {
        res.status(500).json({
            message: "Internal Server Error",
            error: (error as Error).message,
            timestamp: new Date().toISOString()
        });
    }
}


export async function getCommentById(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    try {
        const comment = await prisma.comment.findUnique({
            where: { id: id as string }
        });

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.status(200).json({
            data: comment,
            type: "Comment"
        });
    } catch (error: unknown) {
        res.status(500).json({
            message: "Internal Server Error",
            error: (error as Error).message,
            timestamp: new Date().toISOString()
        });
    }
}


export async function getCommentsByActivity(req: NextApiRequest, res: NextApiResponse) {
    const { activityId } = req.query;

    try {
        const comments = await prisma.comment.findMany({
            where: { activityId: activityId as string }
        });

        res.status(200).json({
            data: comments,
            total: comments.length,
            type: "Comments"
        });
    } catch (error: unknown) {
        res.status(500).json({
            message: "Internal Server Error",
            error: (error as Error).message,
            timestamp: new Date().toISOString()
        });
    }
}

export async function getCommentsByUser(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = req.query;

    try {
        const comments = await prisma.comment.findMany({
            where: { userId: userId as string }
        });

        res.status(200).json({
            data: comments,
            total: comments.length,
            type: "User Comments"
        });
    } catch (error: unknown) {
        res.status(500).json({
            message: "Internal Server Error",
            error: (error as Error).message,
            timestamp: new Date().toISOString()
        });
    }
}
