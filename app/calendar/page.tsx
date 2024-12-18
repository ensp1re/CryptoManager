import { Activity } from '@/interfaces/main.interface'
import { Calendar } from '../components/Calendar'

async function getActivities(): Promise<Activity[]> {
    // In a real application, you would fetch this data from your API
    // This is a placeholder implementation
    return [
        {
            id: '1',
            project: 'Project A',
            activity: 'Task 1',
            cost: 100,
            deadline: '2023-06-15',
            completed: false,
            timeSpent: 2,
            progress: 50,
            comments: [],
            link: '',
            dependencies: [],
            tags: ['urgent'],
            attachments: [],
            assignedTo: ['user1'],
            profit: 50,
        },
        {
            id: '2',
            project: 'Project B',
            activity: 'Task 2',
            cost: 200,
            deadline: '2023-06-20',
            completed: true,
            timeSpent: 4,
            progress: 100,
            comments: [],
            link: '',
            dependencies: [],
            tags: ['important'],
            attachments: [],
            assignedTo: ['user2'],
            profit: 100,
        },
        // Add more sample activities as needed
    ]
}

export default async function CalendarPage() {
    const activities = await getActivities()

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-extrabold text-center mb-8 
        text-gray-800 dark:text-gray-100">
                    Activity Calendar
                </h1>
                <Calendar activities={activities} />
            </div>
        </div>
    )
}

