import { seedData } from "@/controllers/create";
import { NextApiRequest, NextApiResponse } from "next";



export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case "POST":
            return seedData(req, res);
        default:
            res.status(405).json({ message: "Method Not Allowed" });
            res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
            return res.status(405).end(`Method ${method} Not Allowed`);
    }
}