import { DayActivities } from '@/app/components/DayActivities'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ChevronLeft } from 'lucide-react'
import { Activity } from '@/interfaces/main.interface'

async function getActivities(year: number, month: number, day: number): Promise<Activity[]> {
  // In a real application, you would fetch this data from your API
  // This is a placeholder implementation
  const allActivities = [
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
      profit: 50,
      assignedTo: ['user1']
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
      profit: 100,
      assignedTo: ['user2']
    },
    // Add more sample activities as needed
  ]

  return allActivities.filter(activity => {
    const activityDate = new Date(activity.deadline)
    return activityDate.getFullYear() === year &&
           activityDate.getMonth() + 1 === month &&
           activityDate.getDate() === day
  })
}

export default async function DayPage({ params }: { params: { year: string, month: string, day: string } }) {
  const year = parseInt(params.year)
  const month = parseInt(params.month)
  const day = parseInt(params.day)

  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    notFound()
  }

  const activities = await getActivities(year, month, day)
  const date = new Date(year, month - 1, day)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Link href="/calendar">
          <Button variant="outline" className="mb-8 bg-white hover:bg-gray-100">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Calendar
          </Button>
        </Link>
        <DayActivities activities={activities} date={date} />
      </div>
    </div>
  )
}

