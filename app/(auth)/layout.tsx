import React from 'react';
import '../globals.css';



export default function AuthLayout({ children }: { children: React.ReactNode }) {

    return (
        <html lang="en">
            <body
                suppressHydrationWarning={true}
                className="bg-gray-100 dark:bg-gray-900">
                <div className="flex flex-col lg:flex-row min-h-screen justify-center items-center">
                    {children}
                </div>
            </body>
        </html>
    );
}
