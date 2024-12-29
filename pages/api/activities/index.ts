import { NextApiRequest, NextApiResponse } from "next";
import { getActivities } from "@/controllers/get";
import { createActivity } from "@/controllers/create";
import updateActivity from "@/controllers/update";
import deleteActivity from "@/controllers/delete";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case "GET":
            return getActivities(req, res);
        case "POST":
            return createActivity(req, res);
        case "PUT":
            return updateActivity(req, res);
        case "DELETE":
            return deleteActivity(req, res);

        default:
            res.status(405).json({ message: "Method Not Allowed" });
            res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
            return res.status(405).end(`Method ${method} Not Allowed`);
    }
}