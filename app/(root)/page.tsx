'use client';

import { Suspense, useEffect } from 'react';
import Dashboard from '../components/Dashboard';

export default function Home() {



    useEffect(() => {
        document.title = 'Dashboard | Manager';
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }, []);



    return (
        <Suspense>
            <Dashboard />
        </Suspense>
    );
}