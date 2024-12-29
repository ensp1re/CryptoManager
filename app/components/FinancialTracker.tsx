'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Activity } from "@/interfaces/main.interface"

interface FinancialTrackerProps {
  activities: Activity[]
}

export default function FinancialTracker({ activities }: FinancialTrackerProps) {
  const totalCost = activities.reduce((sum, activity) => sum + activity.cost!, 0)
  const totalProfit = activities.reduce((sum, activity) => sum + activity.profit!, 0)
  const netProfit = totalProfit - totalCost

  const barChartData = activities.map(activity => ({
    name: activity.project,
    cost: activity.cost,
    profit: activity.profit
  }))

  const pieChartData = [
    { name: 'Cost', value: totalCost },
    { name: 'Profit', value: totalProfit }
  ]

  const COLORS = ['#FF8042', '#00C49F']

  return (
    <div className="space-y-6">


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700">
            <CardTitle className="text-lg sm:text-xl text-white">Total Cost</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-2xl sm:text-3xl font-bold text-red-600 dark:text-red-400">${totalCost.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700">
            <CardTitle className="text-lg sm:text-xl text-white">Total Profit</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">${totalProfit.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700">
            <CardTitle className="text-lg sm:text-xl text-white">Net Profit</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className={`text-2xl sm:text-3xl font-bold ${netProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              ${netProfit.toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800 dark:text-white">Cost and Profit by Project</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px] sm:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barChartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="cost" fill="#FF8042" />
                  <Bar dataKey="profit" fill="#00C49F" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800 dark:text-white">Total Cost vs Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px] sm:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

