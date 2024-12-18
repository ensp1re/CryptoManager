'use client';

import { Bell, LogOut, Settings } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link';

export default function Header() {

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)
        && avatarRef.current && !avatarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [])


  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Crypto Task Manager</h1>
          </div>
          <div className="flex items-center">
            <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <Bell className="h-6 w-6" />
            </button>
            <Avatar ref={avatarRef} className='cursor-pointer' onClick={() => setIsOpen((prev) => !prev)}>
              <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {
              isOpen && (
                <div ref={dropdownRef} className='fixed flex flex-col max-w-[120px] w-full py-2 gap-2 px-1 right-[10px] shadow-lg top-[60px] bg-white rounded-lg animate-dropdown'>
                  <Link href='/settings' onClick={
                    () => setIsOpen(false)
                  } className='flex text-gray-400 p-1 gap-2 hover:bg-gray-50 transition duration-300 hover:text-gray-600'>
                    <Settings className='h-5 w-5' />
                    Settings
                  </Link>
                  <Link href='/logout' onClick={
                    () => setIsOpen(false)
                  } className='text-gray-400 p-1 gap-2 hover:bg-gray-50 transition duration-300 hover:text-gray-600 flex'>
                    <LogOut className='h-5 w-5' />
                    Logout
                  </Link>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </header>
  )
}

