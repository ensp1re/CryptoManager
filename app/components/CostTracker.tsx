'use client'

import { useEffect, useRef, useState } from 'react'
import { Chart, ChartConfiguration } from 'chart.js/auto'
import { Activity } from '@/interfaces/main.interface'

interface CostTrackerProps {
  activities: Activity[]
}

export default function CostTracker({ activities }: CostTrackerProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const [chart, setChart] = useState<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d')
      if (ctx) {
        if (chart) {
          chart.destroy()
        }

        const newChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: activities.map(a => a.project),
            datasets: [{
              data: activities.map(a => a.cost),
              backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)'
              ],
              borderColor: 'rgba(255, 255, 255, 1)',
              borderWidth: 2
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom',
              },
              title: {
                display: true,
                text: 'Cost Distribution by Project',
                font: {
                  size: 16,
                  weight: 'bold'
                }
              }
            }
          }
        } as ChartConfiguration)

        setChart(newChart)
      }
    }

    return () => {
      if (chart) {
        chart.destroy()
      }
    }
  }, [activities, chart])

  const totalCost = activities.reduce((sum, activity) => sum + activity.cost, 0)

  return (
    <div className="mt-4">
      <p className="text-2xl font-bold mb-4">Total Cost: ${totalCost.toFixed(2)}</p>
      <div className="w-full max-w-md mx-auto">
        <canvas ref={chartRef} width="400" height="200"></canvas>
      </div>
    </div>
  )
}

