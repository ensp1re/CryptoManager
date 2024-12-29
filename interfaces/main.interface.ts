
export interface Activity {
  activities: unknown
  id?: string
  userId?: string
  project: string
  acitivityDescription: string
  cost?: number
  deadline: string
  completed?: boolean
  link?: string
  dependencies?: string[]
  timeSpent?: number
  tags?: string[]
  progress?: number
  attachments?: string[]
  assignedTo?: string[]
  comments?: Comment[]
  profit?: number
  createdAt?: string
  updatedAt?: string
}



export interface Comment {
  id?: string
  activityId: string
  userId: string
  comment: string
  createdAt?: string
}

// change when login page is ready
export interface User {
  id: string
  name: string
  email: string
}


export interface Notification {
  id: string
  userId: string
  content: string
  createdAt: string
  read: boolean
}

export interface Pagination {
  page: number
  pageSize: number
  limit: number
  activities: Activity[]
}

export interface ActivityInput {
  userId: string,
  progress?: string
  project: string
  acitivityDescription: string
  cost?: number
  deadline?: Date
  completed?: boolean
  link?: string
  dependencies: string[]
  timeSpent?: number
  tags?: string[]
  attachments?: string[]
  assignedTo?: string[]
  comments: Comment[]
  profit?: number
}

export interface Auth {
  id?: string
  email: string
  name?: string
  image?: string
}

export interface ICalendarDate {
  year: number
  month: number
  day: number
}

export interface IPagination {
  page?: number
  pageSize?: number
  search?: string
}