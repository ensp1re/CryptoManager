'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from 'framer-motion'
import { Activity } from "@/interfaces/main.interface"

interface DayActivitiesProps {
  activities: Activity[]
  date: Date
}

export function DayActivities({ activities, date }: DayActivitiesProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
        Activities for {date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </h2>
      {activities.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No activities for this day.</p>
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
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 bg-white">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-t-lg">
                  <CardTitle>{activity.project}</CardTitle>
                  <CardDescription className="text-purple-100">{activity.activity}</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="font-semibold text-gray-700">Cost: ${activity.cost}</p>
                  <p className="text-gray-600">Time Spent: {activity.timeSpent} hours</p>
                  <div className="mt-2 flex items-center">
                    <span className="text-gray-600 mr-2">Progress:</span>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-green-600 h-2.5 rounded-full"
                        style={{ width: `${activity.progress}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-gray-600">{activity.progress}%</span>
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-600 mb-2">Tags:</p>
                    <div className="flex flex-wrap gap-2">
                      {activity.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="bg-purple-100 text-purple-800">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 rounded-b-lg">
                  <Badge variant={activity.completed ? "default" : "secondary"} className="w-full justify-center">
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

