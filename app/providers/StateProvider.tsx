'use client';

import React, { FC } from 'react'
import { Provider } from 'react-redux'
import { store } from '../store/store'
import { SessionProvider } from 'next-auth/react';

interface IStateProvider {
    children: React.ReactNode
}

const StateProvider: FC<IStateProvider> = ({ children }) => {
    return (
        <Provider store={store}>
            <SessionProvider>
                {children}
            </SessionProvider>
        </Provider>
    )
}

export default StateProvider;