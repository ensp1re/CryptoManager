'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

export default function NotFound() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const theme = localStorage.getItem("theme") || "light"; // Default to "light"
        document.documentElement.classList.add(theme);

        document.title = "404 - Page Not Found";
        setMounted(true);

        return () => {
            document.documentElement.classList.remove(theme);
        };
    }, []);

    if (!mounted) return null;


    return (
        <div className="flex flex-col items-center justify-center min-h-screen  text-foreground overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <h1 className="text-9xl font-extrabold text-primary mb-4">
                    <motion.span
                        initial={{ rotateY: 0 }}
                        animate={{ rotateY: 360 }}
                        transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                        className="inline-block"
                    >
                        4
                    </motion.span>
                    <motion.span
                        initial={{ scale: 1 }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                        className="inline-block"
                    >
                        0
                    </motion.span>
                    <motion.span
                        initial={{ rotateY: 0 }}
                        animate={{ rotateY: -360 }}
                        transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                        className="inline-block"
                    >
                        4
                    </motion.span>
                </h1>
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="text-4xl font-bold mb-8 text-foreground/80"
                >
                    Oops! Page Not Found
                </motion.h2>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="max-w-md w-full px-4"
            >
                <p className="text-lg text-muted-foreground mb-8 text-center">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>



                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <Link
                        href="/"
                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                        <Home className="w-5 h-5 mr-2" />
                        Go Home
                    </Link>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute bottom-0 left-0 w-full p-4 text-center text-sm text-muted-foreground"
            >
                © {mounted ? new Date().getFullYear() : ''} Manager. All rights reserved.
            </motion.div>

            {/* Background Animation */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", repeatDelay: 3 }}
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full filter blur-3xl"
                />
            </div>
        </div>
    )
}

