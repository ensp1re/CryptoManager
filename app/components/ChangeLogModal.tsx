'use client'

import { useState } from 'react'
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Activity } from '@/interfaces/main.interface'
import { useUpdateActivityMutation } from '../store/api'

interface ChangeLogModalProps {
  activity: Activity | null
  updateActivity: (activity: Activity) => void
  onClose: () => void  // Add this line
}

export default function ChangeLogModal({ activity, updateActivity, onClose }: ChangeLogModalProps) {
  const [timeSpent, setTimeSpent] = useState('')

  const [updatePost, { isLoading: isUpdating }] = useUpdateActivityMutation();

  if (!activity) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const parsedTimeSpent = parseFloat(timeSpent)
    if (isNaN(parsedTimeSpent)) return // Don't update if the input is not a valid number

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { comments, createdAt, updatedAt, ...rest } = activity;
    const updatedActivity = {
      ...rest,
      timeSpent: (activity.timeSpent || 0) + parsedTimeSpent
    }
    await updatePost(updatedActivity).then((res) => {
      console.log(res);
      updateActivity(updatedActivity)
      setTimeSpent('')
      onClose();

    }).catch((err) => {
      console.log(err);
      onClose();
    })
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Log Time for {activity.project}</DialogTitle>
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
          <Button type="submit">
            {isUpdating ? 'Updating...' : 'Update'}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
