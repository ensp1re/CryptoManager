import { ActivityInput } from "@/interfaces/main.interface";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export async function createActivity(req: NextApiRequest, res: NextApiResponse) {
    const data: ActivityInput = req.body;

    if (!data) {
        return res.status(400).json({ message: "Missing request body" });
    }

    try {
        const checkUser = await prisma.user.findUnique({ where: { id: data.userId } });

        if (!checkUser) {
            return res.status(400).json({ message: "User not found" });
        }

        const toCreateData = {
            userId: data.userId,
            project: data.project,
            acitivityDescription: data.acitivityDescription,
            cost: data.cost,
            deadline: data.deadline ? new Date(data.deadline) : new Date(),
            completed: data.completed ?? false,
            link: data.link,
            dependencies: data.dependencies,
            timeSpent: data.timeSpent,
            tags: data.tags,
            attachments: data.attachments,
            assignedTo: data.assignedTo,
            profit: data.profit
        };

        console.log(toCreateData);

        const activity = await prisma.activity.create({
            data: toCreateData
        });

        res.status(201).json(activity);
    } catch (error: unknown) {
        res.status(500).json({
            message: "Internal Server Error",
            error: (error as Error).message,
            timestamp: new Date().toISOString()
        });
    } finally {
        await prisma.$disconnect();
    }
};



export const seedData = async (_req: NextApiRequest, res: NextApiResponse) => {
    try {
        const data = Array.from({ length: 15 }).map(() => ({
            userId: "676ed02ba72cc1a5a774adaf",
            project: faker.lorem.word(),
            acitivityDescription: faker.lorem.sentence(),
            cost: faker.number.int({ min: 100, max: 5000 }),
            deadline: faker.date.recent(),
            completed: faker.datatype.boolean(),
            link: faker.internet.url(),
            dependencies: [faker.lorem.word(), faker.lorem.word()],
            timeSpent: faker.number.int({ min: 1, max: 100 }),
            tags: [faker.lorem.word(), faker.lorem.word()],
            attachments: [faker.internet.url(), faker.internet.url()],
            assignedTo: [faker.internet.email(), faker.internet.email()],
            profit: faker.number.int({ min: 50, max: 5000 })
        }));


        console.log(data);

        await prisma.activity.createMany({
            data
        });

        res.status(201).json({ message: "Data seeded successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: (error as Error).message,
            timestamp: new Date().toISOString()
        });
    }
};


export const createComment = async (req: NextApiRequest, res: NextApiResponse) => {
    const { activityId, comment, userId } = req.body;

    if (!activityId || !comment) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const activity = await prisma.activity.findUnique({ where: { id: activityId } });

        if (!activity) {
            return res.status(404).json({ message: "Activity not found" });
        }

        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newComment = await prisma.comment.create({
            data: {
                comment,
                user: { connect: { id: userId } },
                activity: { connect: { id: activityId } }
            }
        });

        res.status(201).json({
            message: "Comment created",
            data: newComment
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
};