'use client'

import { useState } from 'react'
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Activity } from '@/interfaces/main.interface'

interface CommentModalProps {
  activity: Activity | null
  updateActivity: (activity: Activity) => void
  onClose: () => void
}

export default function CommentModal({ activity, updateActivity, onClose }: CommentModalProps) {
  const [comment, setComment] = useState('')

  if (!activity) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const updatedActivity = {
      ...activity,
      comments: [
        ...activity.comments,
        { id: Date.now().toString(), userId: 'currentUser', content: comment, createdAt: new Date().toISOString() }
      ]
    }
    updateActivity(updatedActivity)
    setComment('')
    onClose()  // Add this line to close the modal
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add Comment to {activity.activity}</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="comment" className="text-right">Comment</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Add Comment</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
