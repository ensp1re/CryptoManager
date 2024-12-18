import { Suspense } from 'react'
import FinancialTracker from '../components/FinancialTracker'
import { Activity } from '@/interfaces/main.interface'

// This is a mock function to simulate fetching activities from an API
async function getActivities(): Promise<Activity[]> {
  // In a real application, you would fetch this data from your API
  return [
    {
      id: '1',
      project: 'Project A',
      activity: 'Task 1',
      cost: 1000,
      profit: 1500,
      deadline: '2023-07-15',
      completed: false,
      timeSpent: 10,
      progress: 50,
      comments: [],
      link: '',
      dependencies: [],
      tags: ['urgent'],
      attachments: [],
      assignedTo: ['user1']
    },
    {
      id: '2',
      project: 'Project B',
      activity: 'Task 2',
      cost: 2000,
      profit: 2500,
      deadline: '2023-07-20',
      completed: true,
      timeSpent: 15,
      progress: 100,
      comments: [],
      link: '',
      dependencies: [],
      tags: ['important'],
      attachments: [],
      assignedTo: ['user2']
    },
    // Add more sample activities as needed
  ]
}

export default async function FinancialTrackerPage() {
  const activities = await getActivities()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Financial Tracker</h1>
      <Suspense fallback={<div>Loading financial data...</div>}>
        <FinancialTracker activities={activities} />
      </Suspense>
    </div>
  )
}

