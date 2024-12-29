'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Pencil, MessageSquare, Clock, Eye, CheckCircle, XCircle } from 'lucide-react'
import { format } from 'date-fns'
import UpdateActivityModal from './UpdateActivityModal'
import ChangeLogModal from './ChangeLogModal'
import CommentModal from './CommentModal'
import { Activity, User } from '@/interfaces/main.interface'
import { useUpdateActivityMutation } from '../store/api'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { FaSpinner } from 'react-icons/fa'

interface ActivityListProps {
  activities: Activity[]
  users: User[]
  updateActivity: (activity: Activity) => void
  deleteActivity: (id: string) => void
}

export default function ActivityList({ activities, users, updateActivity, deleteActivity }: ActivityListProps) {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [isChangeLogOpen, setIsChangeLogOpen] = useState(false)
  const [isCommentOpen, setIsCommentOpen] = useState(false)
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [id, setId] = useState('')
  const [updatePost, { isLoading: isUpdating, isSuccess }] = useUpdateActivityMutation();
  const router = useRouter()

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'urgent':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      case 'important':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'low-priority':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const updatedActivity = activities.find(activity => activity.id === id)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { comments, createdAt, updatedAt, ...newData } = { ...updatedActivity, completed: completed }
    if (!updatedActivity) return
    await updatePost(newData).then((res) => {
      console.log(res);
      toast.success('Activity updated successfully')
      if (isSuccess) {
        updateActivity({ ...updatedActivity, completed: completed })
      }
    }).catch((err) => {
      toast.error('Failed to update activity')
      console.log(err);
    })
  }


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {activities && activities.map(activity => (
        <Card key={activity?.id} className="flex flex-col hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white dark:from-purple-700 dark:to-pink-700">
            <CardTitle className="text-lg">{activity?.project}</CardTitle>
            <CardDescription className="text-purple-100">
              {activity?.acitivityDescription?.split(' ').length > 5
                ? activity?.acitivityDescription?.split(' ').slice(0, 5).join(' ') + '...'
                : activity?.acitivityDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow pt-4 dark:bg-gray-800 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Cost:</span>
              <span>${activity?.cost?.toString().slice(0, 3)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Profit:</span>
              <span className="text-green-600">${activity?.profit?.toString().slice(0, 3)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Deadline:</span>
              <span>
                {activity.deadline
                  ? format(new Date(activity?.deadline), 'MMM dd, yyyy')
                  : 'No deadline set'}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {activity?.tags && activity?.tags.map(tag => (
                <Badge key={tag} className={getTagColor(tag)}>
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 dark:bg-gray-800 p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full">
              <Dialog open={isChangeLogOpen} onOpenChange={setIsChangeLogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => setSelectedActivity(activity)}>
                    <Clock className="w-4 h-4 mr-1" />
                    <span className='sm:block md:block lg:hidden xl:block'>
                      Log Time
                    </span>
                  </Button>
                </DialogTrigger>
                <ChangeLogModal
                  activity={selectedActivity}
                  updateActivity={updateActivity}
                  onClose={() => setIsChangeLogOpen(false)}
                />
              </Dialog>
              <Dialog open={isCommentOpen} onOpenChange={setIsCommentOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => setSelectedActivity(activity)}>
                    <MessageSquare className="w-4 h-4 mr-1" />
                    <span className='sm:block md:block lg:hidden xl:block'>
                      Comment
                    </span>
                  </Button>
                </DialogTrigger>
                <CommentModal
                  activity={selectedActivity}
                  updateActivity={updateActivity}
                  onClose={() => setIsCommentOpen(false)}
                />
              </Dialog>
              <Button variant="outline" size="sm" className="w-full" onClick={() => (router.push(`/activity/${activity.id}`))}>
                <Eye className="w-4 h-4 mr-1" />
                <span className='sm:block md:block lg:hidden xl:block'>
                  Preview
                </span>
              </Button>
              <Dialog open={isUpdateOpen} onOpenChange={setIsUpdateOpen}>
                <DialogTrigger asChild>
                  <Button variant="default" size="sm" className="w-full" onClick={() => setSelectedActivity(activity)}>
                    <Pencil className="w-4 h-4 mr-1" />
                    <span className='sm:block md:block lg:hidden xl:block'>
                      Edit
                    </span>
                  </Button>
                </DialogTrigger>
                <UpdateActivityModal
                  activity={selectedActivity}
                  updateActivity={updateActivity}
                  deleteActivity={deleteActivity}
                  activities={activities}
                  users={users}
                  onClose={() => setIsUpdateOpen(false)}
                />
              </Dialog>
              <form className='w-full sm:col-span-2' onSubmit={handleSubmit}>

                <Button
                  variant={activity.completed ? "destructive" : "default"}
                  size="sm"
                  className="w-full sm:col-span-2 "
                  onClick={() => {
                    setCompleted(!activity.completed)
                    setId(activity.id!)
                  }}
                >
                  {
                    isUpdating && activity.id === id ? (
                      <FaSpinner className="h-4 w-4 animate-spin" />
                    ) :
                      activity.completed ? (
                        <>
                          <XCircle className="w-4 h-4 mr-1" />
                          <span className='sm:block md:block lg:hidden xl:block'>Mark as Incomplete</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-1" />
                          <span className='sm:block md:block lg:hidden xl:block'>Mark as Complete</span>
                        </>
                      )}
                </Button>
              </form>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

