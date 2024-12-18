'use client'

import { useState } from 'react'
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Activity } from '@/interfaces/main.interface'

interface ChangeLogModalProps {
  activity: Activity | null
  updateActivity: (activity: Activity) => void
  onClose: () => void  // Add this line
}

export default function ChangeLogModal({ activity, updateActivity, onClose }: ChangeLogModalProps) {
  const [timeSpent, setTimeSpent] = useState('')

  if (!activity) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const parsedTimeSpent = parseFloat(timeSpent)
    if (isNaN(parsedTimeSpent)) return // Don't update if the input is not a valid number

    const updatedActivity = {
      ...activity,
      timeSpent: (activity.timeSpent || 0) + parsedTimeSpent
    }
    updateActivity(updatedActivity)
    setTimeSpent('')
    onClose()  // Add this line to close the modal
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Log Time for {activity.activity}</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="timeSpent" className="text-right">Time Spent (hours)</Label>
            <Input
              id="timeSpent"
              type="number"
              value={timeSpent}
              onChange={(e) => setTimeSpent(e.target.value)}
              className="col-span-3"
              step="0.1"
              min="0"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Log Time</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
