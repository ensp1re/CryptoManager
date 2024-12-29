'use client';

import { RegisterForm } from '@/app/components/auth/RegisterForm';
import React, { FC, ReactElement, useEffect } from 'react'

const Register: FC = (): ReactElement => {

    useEffect(() => {
        document.title = 'Register | Manager'
    }, [])

    return (
        <RegisterForm />
    )
}

export default Register;