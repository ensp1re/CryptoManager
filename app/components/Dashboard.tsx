'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
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
import { useDispatch } from 'react-redux'
import { addActivity, updateActivity, deleteActivity } from '../store/slices/acitivitySlice'
import { useGetActivitiesQuery } from '../store/api'
import { setPage as setPageName } from '../store/slices/authSlice'
import PaginationControls from './PaginationControls'
import { useSearchParams } from 'next/navigation'
import { useAppSelector } from '../store/hooks'
import { RootState } from '../store/store'

export default function Dashboard() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [filter, setFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('')

  const auth = useAppSelector((state: RootState) => state.auth)




  const data = {
    userId: auth.user?.id ?? undefined,
    page: page,
    search: search
  }

  const { data: activitiesData, isLoading: isDataLoading, isError } = useGetActivitiesQuery(data)




  useEffect(() => {
    if (searchParams?.get('search')) {
      setSearch(searchParams.get('search')!)
    }
  }, [searchParams])



  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      if (activitiesData && !isDataLoading && !isError) {



        dispatch(setPageName('Dashboard'))

        setActivities(activitiesData.activities)
        dispatch(addActivity(activitiesData))

        const usersResponse = await fetch('/api/users')
        if (!usersResponse.ok) {
          throw new Error(`HTTP error! status: ${usersResponse.status}`)
        }
        const usersData = await usersResponse.json()
        setUsers(usersData)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setError('Failed to fetch data. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [activitiesData, dispatch, isDataLoading, isError])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleAddActivity = (activity: Activity) => {
    dispatch(addActivity(activity))
    setActivities(prevActivities => [activity, ...prevActivities])
    setIsAddModalOpen(false)
  }

  const handleUpdateActivity = (updatedActivity: Activity) => {
    dispatch(updateActivity({ id: updatedActivity.id!, updates: updatedActivity }))
    setActivities(prevActivities =>
      prevActivities.map(a => a.id === updatedActivity.id ? updatedActivity : a)
    )
  }

  const handleDeleteActivity = (id: string) => {
    dispatch(deleteActivity(id))
    setActivities(prevActivities => prevActivities.filter(a => a.id !== id))
  }

  const filteredActivities = activities.filter(activity => {
    if (filter === 'all') return true
    if (filter === 'upcoming') {
      const deadlineDate = new Date(activity.deadline)
      return !isNaN(deadlineDate.getTime()) && deadlineDate > new Date()
    }
    if (filter === 'completed') return activity.completed
    if (filter === 'notCompleted') return !activity.completed
    if (filter === 'highCost') return activity.cost! >= 1000
    if (filter === 'lowCost') return activity.cost! < 1000
    if (filter === 'highProfit') return activity.profit! >= 500
    if (filter === 'lowProfit') return activity.profit! < 500
    return false
  })



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
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Select value={filter} onValueChange={(value) => setFilter(value)}>
            <SelectTrigger className="w-[180px] dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 focus:ring-gray-500 focus:border-gray-500">
              <SelectValue placeholder="Filter activities" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 shadow-lg rounded-md p-2 w-[180px]">
              <SelectItem className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200" value="all">All Activities</SelectItem>
              <SelectItem className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200" value="upcoming">Upcoming</SelectItem>
              <SelectItem className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200" value="completed">Completed</SelectItem>
              <SelectItem className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200" value="notCompleted">Not Completed</SelectItem>
              <SelectItem className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200" value="highCost">High Cost</SelectItem>
              <SelectItem className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200" value="lowCost">Low Cost</SelectItem>
              <SelectItem className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200" value="highProfit">High Profit</SelectItem>
              <SelectItem className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200" value="lowProfit">Low Profit</SelectItem>
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
          {
            filteredActivities.length === 0 && !isLoading && (
              <div className="flex justify-center items-center min-h-[500px]">
                <Alert variant="default" className="w-[400px] text-center shadow-lg bg-transparent border-0">
                  <AlertTitle className="text-xl font-semibold mb-2">No activities found</AlertTitle>
                  <AlertDescription className="text-gray-600 dark:text-gray-400">
                    You can add a new activity by clicking the button above.
                  </AlertDescription>
                </Alert>
              </div>
            )
          }
          {
            isLoading ? (
              <div className="flex justify-center items-center min-h-[500px]">
                <FaSpinner className="animate-spin text-4xl text-gray-500 dark:text-gray-400" />
              </div>
            ) : (
              <Suspense>
                <ActivityList
                  activities={filteredActivities}
                  users={users}
                  updateActivity={handleUpdateActivity}
                  deleteActivity={handleDeleteActivity}
                />
                <PaginationControls page={data.page} setPage={setPage} />
              </Suspense>
            )
          }



        </TabsContent>
        <TabsContent value="analytics">
          <AnalyticsDashboard activities={activities} />
        </TabsContent>
      </Tabs>
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <AddActivityModal
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddActivity}
          activities={activities}
          users={users}
        />
      </Dialog>



    </div>
  )
}

