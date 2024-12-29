import { NextApiRequest, NextApiResponse } from "next";
import { createComment } from "@/controllers/create";
import { deleteComment } from "@/controllers/delete";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case "POST":
            return createComment(req, res);
        case "DELETE":
            return deleteComment(req, res);

        default:
            res.status(405).json({ message: "Method Not Allowed" });
            res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
            return res.status(405).end(`Method ${method} Not Allowed`);
    }
}