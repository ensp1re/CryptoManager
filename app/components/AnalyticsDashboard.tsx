'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Activity } from '@/interfaces/main.interface'

interface AnalyticsDashboardProps {
  activities: Activity[]
}

export default function AnalyticsDashboard({ activities }: AnalyticsDashboardProps) {
  const totalCost = activities.reduce((sum, activity) => sum + activity.cost!, 0)
  const completedCount = activities.filter(activity => activity.completed).length
  const averageProgress = (completedCount / activities.length) * 100
  const totalTimeSpent = activities.reduce((sum, activity) => sum + activity.timeSpent!, 0)


  const isLight = localStorage.getItem('theme') === 'light'

  const progressData = [
    { name: 'Completed', value: activities.filter(a => a.completed).length },
    { name: 'In Progress', value: activities.filter(a => !a.completed).length },
  ]

  const COLORS = ['#4bc0c0', '#ff6384']

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white dark:from-purple-700 dark:to-pink-700">
          <CardHeader>
            <CardTitle>Total Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${totalCost.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-blue-500 to-green-500 text-white dark:from-blue-700 dark:to-green-700">
          <CardHeader>
            <CardTitle>Average Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{averageProgress.toFixed(2)}%</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-yellow-500 to-red-500 text-white dark:from-yellow-700 dark:to-red-700">
          <CardHeader>
            <CardTitle>Total Time Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalTimeSpent} hours</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Cost Distribution */}
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle>Cost Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={activities}>
                <XAxis dataKey="project" tick={{ fill: isLight ? '#000' : '#fff' }} />
                <YAxis tick={{ fill: isLight ? '#000' : '#fff' }} />
                <Tooltip cursor={{ fill: 'rgba(255, 255, 255, 0.2)' }} contentStyle={{ backgroundColor: isLight ? '#fff' : '#333', borderColor: isLight ? '#ddd' : '#444' }} />
                <Bar dataKey="cost" fill={isLight ? 'rgba(75, 192, 192, 0.8)' : 'rgba(255, 99, 132, 0.8)'} radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Project Progress */}
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle>Project Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={progressData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                  {progressData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Time Spent Distribution */}
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle>Time Spent Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={activities}
                  dataKey="timeSpent"
                  nameKey="project"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                >
                  {activities.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
