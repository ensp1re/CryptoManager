'use client';

import { useSession } from 'next-auth/react';
import { FC, ReactElement, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/app/store/hooks';
import { clearAuth, setAuth } from '@/app/store/slices/authSlice';
import axios from 'axios';
import { Auth } from '@/interfaces/main.interface';

const AuthCheck: FC = (): ReactElement | null => {

    const { data: session, status } = useSession();

    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (session?.expires) {
            const expiryDate = new Date(session.expires);
            if (expiryDate < new Date()) {
                dispatch(clearAuth());
                router.push('/login');
            } else {
                dispatch(setAuth({
                    isAuthenticated: true,
                    user: session?.user ?? null,
                    page: null
                }))
                console.log('Session is still valid');
            }
        }
    }, [session, dispatch, router]);

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const getAuth = async (): Promise<Auth> => {
        const user = await axios.get('/api/current-user').then((response) => {
            return response.data;
        });
        return user;
    }

    useEffect(() => {
        if (status === 'authenticated' && session) {
            const fetchUser = async () => {
                const user = await getAuth();
                dispatch(setAuth({
                    isAuthenticated: true,
                    user: user,
                    page: null
                }));
            };
            fetchUser();
        } else if (status === 'unauthenticated') {
            dispatch(clearAuth());
            router.push('/login');
        }
    }, [session, status, router, dispatch]);

    return null
}

export default AuthCheck;