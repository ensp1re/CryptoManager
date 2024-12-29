"use client";

import { Calendar } from '../../components/Calendar'
import { useEffect, useState } from 'react';
import { setPage } from '@/app/store/slices/authSlice';
import { useAppDispatch } from '@/app/store/hooks';
import { Activity } from '@prisma/client';
import { useGetAllActivitiesQuery } from '@/app/store/api';
import { FaSpinner } from 'react-icons/fa';


export default function CalendarPage() {
    const [activities, setActivities] = useState<Activity[]>([])
    const { data: activitiesData, isLoading: isDataLoading, isError } = useGetAllActivitiesQuery({})

    useEffect(() => {
        if (activitiesData && !isDataLoading && !isError) {
            setActivities(activitiesData?.data.map((activity: Activity) => ({
                ...activity,
                activityDescription: activity.acitivityDescription,
                acitivityDescription: undefined
            })))
        }
    }, [activitiesData, isDataLoading, isError])
    const page = 'Calendar';
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setPage(page));
    }, [dispatch, page]);


    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            {
                isDataLoading ? (
                    <div className='w-full min-h-[50vh] flex mx-auto items-center justify-center'>
                        <FaSpinner className="h-8 w-8 animate-spin text-gray-800 dark:text-gray-200" />
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl font-extrabold text-center mb-8 
            text-gray-800 dark:text-gray-100">
                            Activity Calendar
                        </h1>
                        <Calendar activities={activities} />
                    </div>
                )
            }
            {
                isError && <p>Error fetching data. Please try again.</p>
            }

        </div>
    )
}

