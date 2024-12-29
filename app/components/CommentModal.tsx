'use client'

import { ChangeEvent, useState } from 'react'
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Activity, Comment } from '@/interfaces/main.interface'
import { useCreateCommentMutation } from '../store/api'
import { FaSpinner } from 'react-icons/fa'

interface CommentModalProps {
  activity: Activity | null
  updateActivity: (activity: Activity) => void
  onClose: () => void
}

export default function CommentModal({ activity, updateActivity, onClose }: CommentModalProps) {
  const [comment, setComment] = useState<string>('')
  const [postComment, { isLoading, isSuccess }] = useCreateCommentMutation();

  if (!activity) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const postData: Comment = {
      activityId: activity.id as string,
      userId: activity.userId as string,
      comment: comment,
    }

    await postComment(postData).unwrap().then((res) => {
      console.log(res);

      if (isSuccess) {
        const updatedActivity = {
          ...activity,
          comments: [
            ...res.data.comments,
          ]
        }
        updateActivity(updatedActivity)
        setComment('')
      }
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      onClose()
    })




  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add Comment to {activity.project}</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="comment" className="text-right">Comment</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e: ChangeEvent) => setComment((e.target as HTMLInputElement).value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={isLoading || !comment}
            type="submit">
            {
              isLoading ? (
                <FaSpinner className="animate-spin h-5 w-5" />
              ) : 'Add Comment'
            }
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
