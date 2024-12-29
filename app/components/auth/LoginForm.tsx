'use client'

import { ChangeEvent, ReactElement, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaGoogle, FaSpinner } from 'react-icons/fa'
import { signIn } from 'next-auth/react';

export function LoginForm(): ReactElement {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')


    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        const response = await signIn('credentials', {
            redirect: false,
            email,
            password
        })

        if (response?.error) {
            console.error(response.error)
        } else {
            router.push('/')
        }

        setIsLoading(false)

    }

    const handleGoogleSignIn = () => {
        signIn('google', { callbackUrl: '/' })
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md px-2"
        >
            <Card className="shadow-2xl">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-3xl font-bold text-center">Welcome Back</CardTitle>
                    <CardDescription className="text-center text-gray-500">
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        <Button onClick={() => handleGoogleSignIn()} variant="outline" className="w-full">
                            <FaGoogle className="mr-2 h-4 w-4" />
                            Google
                        </Button>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-500">Or continue with</span>
                        </div>
                    </div>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                value={email}
                                onChange={(e: ChangeEvent) => setEmail((e.target as HTMLInputElement).value)}
                                required
                                className="w-full"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={
                                    (e: ChangeEvent) => setPassword((e.target as HTMLInputElement).value)
                                }
                                required
                                className="w-full"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-gray-600 hover:bg-gray-700 text-white"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
                            ) : null}
                            Sign In
                        </Button>
                    </form>
                </CardContent>
                <CardFooter>
                    <p className="text-center text-sm text-gray-600 mt-2">
                        Don&apos;t have an account?{' '}
                        <Link href="/register" className="font-medium text-gray-600 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </motion.div>
    )
}

