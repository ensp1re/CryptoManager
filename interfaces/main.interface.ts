export interface Activity {
  id: string
  project: string
  activity: string
  cost: number
  deadline: string
  completed: boolean
  link: string
  dependencies: string[]
  timeSpent: number
  tags: string[]
  progress: number
  attachments: string[]
  assignedTo: string[]
  comments: Comment[]
  profit: number
}



export interface Comment {
  id: string
  userId: string
  content: string
  createdAt: string
}

// change when login page is ready
export interface User {
  id: string
  name: string
  email: string
}
