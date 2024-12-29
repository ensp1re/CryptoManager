'use client';

import { LoginForm } from '@/app/components/auth/LoginForm';
import React, { FC, ReactElement, useEffect } from 'react'

const Login: FC = (): ReactElement => {

    useEffect(() => {
        document.title = 'Login | Manager'
    }, [])

    return (
        <LoginForm />
    )
}

export default Login;