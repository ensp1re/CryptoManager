'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from 'framer-motion'
import { FaSpinner } from 'react-icons/fa'

export function VerifyForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [verificationCode, setVerificationCode] = useState<string>('')
    const router = useRouter()

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
            router.push('/')
        }, 3000)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md px-2"
        >
            <Card className="shadow-2xl mx-2">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-3xl font-bold text-center">Verify your email</CardTitle>
                    <CardDescription className="text-center text-gray-500">
                        We&apos;ve sent a verification code to your email
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="code">Verification Code</Label>
                            <Input
                                id="code"
                                placeholder="Enter your verification code"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
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
                            Verify Email
                        </Button>
                    </form>
                </CardContent>
                <CardFooter>
                    <p className="text-center text-sm text-gray-600 mt-2">
                        Didn&apos;t receive the code?{' '}
                        <Button variant="link" className="p-0 text-gray-600 hover:underline" onClick={() => { }}>
                            Resend
                        </Button>
                    </p>
                </CardFooter>
            </Card>
        </motion.div>
    )
}

