'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Activity } from '@/interfaces/main.interface'

interface AnalyticsDashboardProps {
  activities: Activity[]
}

export default function AnalyticsDashboard({ activities }: AnalyticsDashboardProps) {
  const totalCost = activities.reduce((sum, activity) => sum + activity.cost, 0)
  const averageProgress = activities.reduce((sum, activity) => sum + activity.progress, 0) / activities.length
  const totalTimeSpent = activities.reduce((sum, activity) => sum + activity.timeSpent, 0)

  const progressData = [
    { name: 'Completed', value: activities.filter(a => a.completed).length },
    { name: 'In Progress', value: activities.filter(a => !a.completed).length },
  ]

  const COLORS = ['#4bc0c0', '#ff6384']

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${totalCost.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{averageProgress.toFixed(2)}%</p>
          </CardContent>
        </Card>
        <Card>
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
        <Card>
          <CardHeader>
            <CardTitle>Cost Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={activities}>
                <XAxis dataKey="project" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cost" fill="#4bc0c0" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Project Progress */}
        <Card>
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
        <Card>
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
