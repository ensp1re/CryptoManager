'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Pencil, MessageSquare, Clock, Eye, CheckCircle, XCircle } from 'lucide-react'
import { format } from 'date-fns'
import UpdateActivityModal from './UpdateActivityModal'
import ChangeLogModal from './ChangeLogModal'
import CommentModal from './CommentModal'
import { Activity, User } from '@/interfaces/main.interface'

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {activities.map(activity => (
        <Card key={activity.id} className="flex flex-col hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardTitle className="text-lg">{activity.project}</CardTitle>
            <CardDescription className="text-purple-100">{activity.activity}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow pt-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Cost:</span>
              <span>${activity.cost}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Profit:</span>
              <span className="text-green-600">${activity.profit}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Deadline:</span>
              <span>
                {activity.deadline
                  ? format(new Date(activity.deadline), 'MMM dd, yyyy')
                  : 'No deadline set'}
              </span>
            </div>
            <div className="mt-2">
              <span className="font-semibold">Progress:</span>
              <div className="flex items-center mt-1">
                <Progress value={isNaN(activity.progress) ? 0 : activity.progress} className="flex-grow mr-2" />
                <span className="text-sm font-medium">{isNaN(activity.progress) ? '0' : activity.progress}%</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {activity.tags.map(tag => (
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
                    <Clock className="w-4 h-4 mr-1" /> Log Time
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
                    <MessageSquare className="w-4 h-4 mr-1" /> Comment
                  </Button>
                </DialogTrigger>
                <CommentModal
                  activity={selectedActivity}
                  updateActivity={updateActivity}
                  onClose={() => setIsCommentOpen(false)}
                />
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => setSelectedActivity(activity)}>
                    <Eye className="w-4 h-4 mr-1" /> Preview
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{activity.project} - {activity.activity}</DialogTitle>
                  </DialogHeader>
                  <div className="mt-4 space-y-2">
                    <p><strong>Cost:</strong> ${activity.cost}</p>
                    <p><strong>Profit:</strong> ${activity.profit}</p>
                    <p><strong>Deadline:</strong> {activity.deadline
                      ? format(new Date(activity.deadline), 'MMM dd, yyyy')
                      : 'No deadline set'}
                    </p>
                    <p><strong>Progress:</strong> {activity.progress}%</p>
                    <p><strong>Tags:</strong> {activity.tags.join(', ')}</p>
                    <p><strong>Completed:</strong> {activity.completed ? 'Yes' : 'No'}</p>
                    <div>
                      <strong>Comments:</strong>
                      {activity.comments.length > 0 ? (
                        <ul className="list-disc pl-5 mt-2">
                          {activity.comments.map((comment, index) => (
                            <li key={index}>{comment.content}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>No comments yet.</p>
                      )}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog open={isUpdateOpen} onOpenChange={setIsUpdateOpen}>
                <DialogTrigger asChild>
                  <Button variant="default" size="sm" className="w-full" onClick={() => setSelectedActivity(activity)}>
                    <Pencil className="w-4 h-4 mr-1" /> Update
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
              <Button
                variant={activity.completed ? "destructive" : "default"}
                size="sm"
                className="w-full sm:col-span-2"
                onClick={() => updateActivity({ ...activity, completed: !activity.completed })}
              >
                {activity.completed ? (
                  <>
                    <XCircle className="w-4 h-4 mr-1" /> Mark Incomplete
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-1" /> Mark Complete
                  </>
                )}
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

