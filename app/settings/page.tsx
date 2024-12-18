'use client'

import { useState } from 'react'
import { ThemeToggle } from '../components/ThemeToggle'

export default function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(false)

  const handleToggleNotifications = () => {
    setEmailNotifications(!emailNotifications)
    // In a real application, you would send this preference to your backend
    console.log('Email notifications:', !emailNotifications)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      <div className="bg-white p-4 rounded shadow dark:bg-gray-800">
        <h2 className="text-xl font-bold mb-4">Notifications</h2>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="emailNotifications"
            checked={emailNotifications}
            onChange={handleToggleNotifications}
            className="mr-2"
          />
          <label htmlFor="emailNotifications">Receive email notifications for upcoming deadlines</label>
        </div>
        <div className='mt-4'>
          <ThemeToggle />

        </div>
      </div>
    </div>
  )
}

