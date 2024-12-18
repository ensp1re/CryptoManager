import { Activity } from "@/interfaces/main.interface";
import { NextResponse } from "next/server";

const activities: Activity[] = [
    {
        id: '1',
        project: 'Project A',
        activity: 'Task 1',
        cost: 100,
        profit: 150,
        deadline: '2023-07-15',
        completed: false,
        link: '',
        dependencies: [],
        timeSpent: 5,
        tags: ['urgent'],
        progress: 50,
        attachments: [],
        assignedTo: ['user1'],
        comments: []
    },
    {
        id: '2',
        project: 'Project B',
        activity: 'Task 2',
        cost: 200,
        profit: 300,
        deadline: '2023-07-20',
        completed: true,
        link: '',
        dependencies: [],
        timeSpent: 10,
        tags: ['important'],
        progress: 100,
        attachments: [],
        assignedTo: ['user2'],
        comments: []
    },
]

export async function GET() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return NextResponse.json(activities);
}