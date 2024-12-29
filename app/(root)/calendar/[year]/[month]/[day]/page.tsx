'use client';

import { DayActivities } from '@/app/components/DayActivities'
import { notFound, useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ChevronLeft } from 'lucide-react'
import { useGetActivityByDateQuery } from '@/app/store/api';
import { FaSpinner } from 'react-icons/fa';
import { Activity } from '@/interfaces/main.interface';
import { useEffect, useState } from 'react';


export default function DayPage() {
  const [activities, setActivities] = useState<Activity[]>([]);

  const data = useParams();
  const yearStr = data?.year as string
  const monthStr = data?.month as string
  const dayStr = data?.day as string

  console.log(yearStr, monthStr, dayStr)
  const year = parseInt(yearStr)
  const month = parseInt(monthStr)
  const day = parseInt(dayStr)

  const { data: activitiesData, isLoading } = useGetActivityByDateQuery({ year, month, day });

  useEffect(() => {
    if (activitiesData && !isLoading) {
      setActivities(activitiesData.data)
    } 
  }, [activitiesData, isLoading])


  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    notFound()
  }



  const date = new Date(year, month - 1, day)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-800 dark:via-gray-900 dark:to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Link href="/calendar">
          <Button variant="outline" className="mb-8 bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Calendar
          </Button>
        </Link>
        {
          isLoading ? (
            <div className='flex justify-center items-center min-h-[50vh]'>
              <FaSpinner className="animate-spin h-8 w-8 text-gray-600 dark:text-gray-300" />
            </div>

          ) :
            (
              <DayActivities activities={activities} date={date} />
            )
        }
      </div>
    </div>
  )
}

