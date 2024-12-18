import Link from 'next/link'
import { Home, PieChart, Calendar, Settings } from 'lucide-react'

export default function Sidebar() {
  return (
    <div className="bg-white fixed lg:relative w-full bottom-0 z-10 shadow-md order-2 lg:order-1 dark:bg-gray-800 lg:w-64 lg:flex-shrink-0 border-b md:border-r border-gray-200 dark:border-gray-700">
      <div className="p-4">
        <nav className="flex justify-between lg:justify-start lg:flex-col space-x-4 lg:space-x-0 lg:space-y-2 overflow-x-auto md:overflow-x-visible">
          <Link href="/" className="flex justify-center w-full items-center lg:justify-start px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md whitespace-nowrap">
            <Home className="mr-3 h-5 w-5" />
            <span className="hidden md:inline">Dashboard</span>
          </Link>
          <Link href="/financial-tracker" className="flex justify-center lg:justify-start  w-full items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md whitespace-nowrap">
            <PieChart className="mr-3 h-5 w-5" />
            <span className="hidden md:inline">Financial Tracker</span>
          </Link>
          <Link href="/calendar" className="flex justify-center lg:justify-start  w-full items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md whitespace-nowrap">
            <Calendar className="mr-3 h-5 w-5" />
            <span className="hidden md:inline">Calendar</span>
          </Link>
          <Link href="/settings" className="flex justify-center lg:justify-start  w-full items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md whitespace-nowrap">
            <Settings className="mr-3 h-5 w-5" />
            <span className="hidden md:inline">Settings</span>
          </Link>
        </nav>
      </div>
    </div>
  )
}

