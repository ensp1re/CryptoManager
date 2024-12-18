'use client'

import { useState, useEffect } from 'react'
import ActivityList from './ActivityList'
import AddActivityModal from './AddActivityModal'
import AnalyticsDashboard from './AnalyticsDashboard'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Activity, User } from '@/interfaces/main.interface'
import { FaSpinner } from 'react-icons/fa'

export default function Dashboard() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [filter, setFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const activitiesResponse = await fetch('/api/activities')
      if (!activitiesResponse.ok) {
        throw new Error(`HTTP error! status: ${activitiesResponse.status}`)
      }
      const activitiesData = await activitiesResponse.json()
      setActivities(activitiesData)

      const usersResponse = await fetch('/api/users')
      if (!usersResponse.ok) {
        throw new Error(`HTTP error! status: ${usersResponse.status}`)
      }
      const usersData = await usersResponse.json()
      setUsers(usersData)
    } catch (error) {
      console.error('Error fetching data:', error)
      setError('Failed to fetch data. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const addActivity = (activity: Activity) => {
    setActivities(prevActivities => [...prevActivities, activity])
    setIsAddModalOpen(false)
  }

  const updateActivity = (updatedActivity: Activity) => {
    setActivities(prevActivities =>
      prevActivities.map(a => a.id === updatedActivity.id ? updatedActivity : a)
    )
  }

  const deleteActivity = (id: string) => {
    setActivities(prevActivities => prevActivities.filter(a => a.id !== id))
  }

  const filteredActivities = activities.filter(activity => {
    if (filter === 'all') return true
    if (filter === 'upcoming') {
      const deadlineDate = new Date(activity.deadline)
      return !isNaN(deadlineDate.getTime()) && deadlineDate > new Date()
    }
    if (filter === 'completed') return activity.completed
    return false
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="mr-2 h-4 w-4 animate-spin" /> Loading...
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error}
          <Button onClick={fetchData} variant="outline" className="mt-2">
            Try Again
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6 mb-12 lg:mb-2">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Select value={filter} onValueChange={(value) => setFilter(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter activities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Activities</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setIsAddModalOpen(true)}>Add New Activity</Button>
        </div>
      </div>
      <Tabs defaultValue="activities" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="activities">
          <ActivityList
            activities={filteredActivities}
            users={users}
            updateActivity={updateActivity}
            deleteActivity={deleteActivity}
          />
        </TabsContent>
        <TabsContent value="analytics">
          <AnalyticsDashboard activities={activities} />
        </TabsContent>
      </Tabs>
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <AddActivityModal
          onClose={() => setIsAddModalOpen(false)}
          onAdd={addActivity}
          activities={activities}
          users={users}
        />
      </Dialog>
    </div>
  )
}

