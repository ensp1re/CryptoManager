'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from 'framer-motion'
import { Activity } from "@/interfaces/main.interface"
import { useRouter } from "next/navigation"

interface DayActivitiesProps {
  activities: Activity[]
  date: Date
}

export function DayActivities({ activities, date }: DayActivitiesProps) {

  const router = useRouter()

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
        Activities for {date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </h2>
      {activities.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 text-lg">No activities for this day.</p>
      ) : (
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {activities.map(activity => (
            <motion.div
              key={activity.id}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1
                }
              }}
            >
              <Card onClick={() => {
                router.push(`/activity/${activity.id}`)
              }} className="h-full hover:shadow-lg hover:scale-105 cursor-pointer transition-transform duration-300 bg-white dark:bg-gray-800">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-t-lg">
                  <CardTitle>{activity.project}</CardTitle>
                  <CardDescription className="text-purple-100">{activity.project}</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="font-semibold text-gray-700 dark:text-gray-300">Cost: ${activity.cost}</p>
                  <p className="text-gray-600 dark:text-gray-400">Time Spent: {activity.timeSpent} hours</p>
                  <div className="mt-2 flex items-center">
                    <span className="text-gray-600 dark:text-gray-400 mr-2">Progress:</span>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div
                        className="bg-green-600 h-2.5 rounded-full"
                        style={{ width: `${activity.progress}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-gray-600 dark:text-gray-400">{activity.progress}%</span>
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-600 dark:text-gray-400 mb-2">Tags:</p>
                    <div className="flex flex-wrap gap-2">
                      {activity.tags && activity.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-b-lg flex justify-center items-center p-4">
                  <Badge
                    variant={activity.completed ? "default" : "secondary"}
                    className={`w-full justify-center text-lg cursor-pointer ${activity.completed ? 'bg-green-600 text-white hover:bg-green-500' : 'bg-yellow-500 text-black hover:bg-yellow-600'}  hover:text-white transition duration-300`}
                  >
                    {activity.completed ? 'Completed' : 'In Progress'}
                  </Badge>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
