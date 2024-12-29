'use client';

import React, { FC, ReactElement, useEffect } from 'react';
import { VerifyForm } from '@/app/components/auth/VerifyForm';

const VerifyEmail: FC = (): ReactElement => {

    useEffect(() => {
        document.title = 'Verify Email | Manager'
    }, [])

    return (
        <VerifyForm />
    )
}

export default VerifyEmail;