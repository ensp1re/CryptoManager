import '../globals.css'
import { Inter } from 'next/font/google'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import StateProvider from '../providers/StateProvider'
import Head from 'next/head';
import AuthCheck from '../components/auth/AuthCheck'
import { Suspense } from 'react'
import { Toaster } from 'react-hot-toast'



const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {




    return (
        <html lang="en" className={inter.className}>
            <Head>
                <title>Manager</title>
                <meta name="description" content="Manager your affairs easy" />
            </Head>
            <StateProvider>
                <body
                    suppressHydrationWarning={true}
                    className="bg-gray-50 dark:bg-gray-900">
                    <Suspense>
                        <AuthCheck />
                    </Suspense>
                    <div className="flex flex-col lg:flex-row min-h-screen">
                        <Sidebar />
                        <div className="flex-1 flex flex-col order-1 lg:order-2">
                            <Header />
                            <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                                {children}
                            </main>
                        </div>
                    </div>
                    <Toaster
                        position='top-right'
                        reverseOrder={false}
                        toastOptions={{
                            style: {
                                borderRadius: '8px',
                                background: '#1f2937',
                                color: '#f9fafb',
                            },
                            success: {
                                icon: '✅',
                                style: {
                                    background: '#10b981',
                                    color: '#ffffff',
                                },
                            },
                            error: {
                                icon: '❌',
                                style: {
                                    background: '#f87171',
                                    color: '#ffffff',
                                },
                            },
                        }}
                    />
                </body>
            </StateProvider>
        </html>
    )
}
