'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

interface CalendarProps {
  activities: {
    id: string;
    userId: string;
    project: string;
    cost: number | null;
    deadline: Date | null;
    completed: boolean | null;
    link: string | null;
    dependencies: string[];
    timeSpent: number | null;
    acitivityDescription: string;
  }[];
}


export function Calendar({ activities }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [direction, setDirection] = useState(0)

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  const prevMonth = () => {
    setDirection(-1)
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setDirection(1)
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  console.log(activities)

  const getActivitiesForDay = (day: number) => {
    return activities.filter(activity => {
      const activityDate = new Date(activity.deadline!)
      return activityDate.getDate() === day &&
        activityDate.getMonth() === currentDate.getMonth() &&
        activityDate.getFullYear() === currentDate.getFullYear()
    })
  }

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      }
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      }
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 flex justify-between items-center">
        <Button onClick={prevMonth} variant="ghost" size="icon" className="text-white hover:bg-white/20">
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous month</span>
        </Button>
        <h2 className="text-3xl font-bold text-white">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <Button onClick={nextMonth} variant="ghost" size="icon" className="text-white hover:bg-white/20">
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next month</span>
        </Button>
      </div>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentDate.toISOString()}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
        >
          <div className="grid grid-cols-7 gap-2 p-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-medium p-2 text-gray-500 dark:text-gray-400">
                {day}
              </div>
            ))}
            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square"></div>
            ))}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1
              const dayActivities = getActivitiesForDay(day)
              return (
                <Link
                  key={day}
                  href={`/calendar/${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${day}`}
                >
                  <motion.div
                    className={`aspect-square p-2 border rounded-lg flex flex-col items-center justify-center transition-colors ${dayActivities.length > 0 ? 'bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    whileHover={{ scale: 1.05, boxShadow: "0px 5px 10px rgba(0,0,0,0.1)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="font-medium text-lg dark:text-white">{day}</span>
                    {dayActivities.length > 0 && (
                      <motion.span
                        className="text-xs mt-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full px-2 py-1"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        {dayActivities.length}
                      </motion.span>
                    )}
                  </motion.div>
                </Link>
              )
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

