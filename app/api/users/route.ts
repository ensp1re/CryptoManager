import { User } from '@/interfaces/main.interface'
import { NextResponse } from 'next/server'

// This is a mock database. In a real application, you would fetch this data from a database.
const users: User[] = [
  {
    id: 'user1',
    name: 'John Doe',
    email: 'john@example.com'
  },
  {
    id: 'user2',
    name: 'Jane Smith',
    email: 'jane@example.com'
  },
]

export async function GET() {
  // Simulate a delay to mimic a real API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return NextResponse.json(users)
}

