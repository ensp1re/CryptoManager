'use client';

import { Bell, LogOut, Settings } from 'lucide-react'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ChangeEvent, FC, ReactElement, useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { clearAuth } from '../store/slices/authSlice';
import { signOut } from 'next-auth/react';
import { RootState } from '../store/store';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { FaSearch } from 'react-icons/fa';



const Header: FC = (): ReactElement => {

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [search, setSearch] = useState<string>('');

  const auth = useAppSelector((state: RootState) => state.auth);

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


  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    setIsOpen(false);
    dispatch(clearAuth());
    await signOut();
    router.push('/login');
  };


  const page = useAppSelector((state: RootState) => state.auth.page);

  const onEnterHandle = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && search.trim()) {

      router.push(`?search=${encodeURIComponent(search)}`);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{page && (page)}</h1>
            <div className='relative ml-4 w-full max-w-[400px]'>
              <FaSearch className='absolute top-1/2 left-3 transform -translate-y-1/2 dark:text-gray-500 text-gray-400' />
              <Input
                value={search}
                onChange={(e: ChangeEvent) => setSearch((e.target as HTMLInputElement).value)}
                onKeyDown={(e) => {
                  onEnterHandle(e);
                }}
                placeholder="Search"
                className="w-full px-9 py-5 placeholder:text-gray-500 dark:placeholder:text-gray-400 border-gray-200 dark:border-gray-700"
              />
            </div>

          </div>
          <div className="flex items-center">
            <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <Bell className="h-6 w-6" />
            </button>
            <Avatar ref={avatarRef} className='cursor-pointer dark:border-gray-700' onClick={() => setIsOpen((prev) => !prev)}>
              <Image
                src={auth.user?.image || '/user.jpg'}
                alt="User avatar"
                width={40}
                height={40}
                onError={(e) => { e.currentTarget.src = '/user.jpg' }}
              />
              <AvatarFallback className="dark:bg-gray-700 dark:text-gray-200">
                {auth.isAuthenticated ? auth.user?.name?.charAt(0).toUpperCase() : 'A'}
              </AvatarFallback>
            </Avatar>
            {
              isOpen && (
                <div ref={dropdownRef} className='fixed flex flex-col max-w-[120px] w-full py-2 gap-2 px-1 right-[10px] shadow-lg top-[60px] bg-white rounded-lg animate-dropdown'>


                  {auth.isAuthenticated ? (<><Button variant={"ghost"} onClick={() => {
                    router.push('/settings');
                    setIsOpen(false);
                  }} className='flex justify-start  text-gray-400 p-1 gap-2 hover:bg-gray-50 transition duration-300 hover:text-gray-600'>
                    <Settings className='h-5 w-5' />
                    Settings
                  </Button><Button
                    variant={"ghost"}
                    onClick={() => {
                      handleLogout();
                    }} className='text-gray-400 p-1 w-full gap-2 hover:bg-gray-50 transition duration-300 hover:text-gray-600 flex justify-start'>
                      <LogOut className='h-5 w-5' />
                      Logout
                    </Button></>)
                    : (
                      <Button variant={"ghost"} onClick={() => {
                        router.push('/login');
                        setIsOpen(false);
                      }} className='flex justify-start  text-gray-400 p-1 gap-2 hover:bg-gray-50 transition duration-300 hover:text-gray-600'>
                        <LogOut className='h-5 w-5' />
                        Login
                      </Button>
                    )}


                </div>
              )
            }
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;