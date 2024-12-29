'use client';

import { Suspense, useEffect, useState } from 'react'
import FinancialTracker from '../../components/FinancialTracker'
import { useAppDispatch } from '@/app/store/hooks'
import { setPage } from '@/app/store/slices/authSlice'
import { useGetActivitiesQuery } from '@/app/store/api';
import { Activity } from '@prisma/client';



export default function FinancialTrackerPage() {
  const [activities, setActivities] = useState<Activity[]>([])
  const { data: activitiesData, isLoading: isDataLoading, isError } = useGetActivitiesQuery({})

  useEffect(() => {
    if (activitiesData && !isDataLoading && !isError) {
      setActivities(activitiesData.activities.map((activity: Activity) => ({
        ...activity
      })))
    }
  }, [activitiesData, isDataLoading, isError])
  const page = 'Financial Tracker';
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPage(page));
  }, [dispatch, page]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<div>Loading financial data...</div>}>
        <FinancialTracker activities={activities} />
      </Suspense>
    </div>
  )
}

