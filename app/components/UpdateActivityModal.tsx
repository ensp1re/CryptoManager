'use client'

import { useState, useEffect, ChangeEvent } from 'react'
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Activity, User } from '@/interfaces/main.interface'
import { useDeleteActivityMutation, useUpdateActivityMutation } from '../store/api'

interface UpdateActivityModalProps {
  activity: Activity | null
  updateActivity: (activity: Activity) => void
  deleteActivity: (id: string) => void
  activities: Activity[]
  users: User[]
  onClose: () => void
}

export default function UpdateActivityModal({ activity, updateActivity, deleteActivity, onClose }: UpdateActivityModalProps) {
  const [updatedActivity, setUpdatedActivity] = useState<Activity | null>(null)

  const [deletePost, { isLoading: isDeleting }] = useDeleteActivityMutation();
  const [updatePost, { isLoading: isUpdating }] = useUpdateActivityMutation();

  useEffect(() => {
    if (activity) {
      setUpdatedActivity({ ...activity })
    }
  }, [activity])

  if (!updatedActivity) return null

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    if (updatedActivity) {



      await updatePost(updatedActivity).then((res) => {
        console.log(res);
        updateActivity(updatedActivity)
        onClose()
      }).catch((err) => {
        console.log(err);
      })
    }
  }

  const handleDelete = async (): Promise<void> => {
    if (updatedActivity && confirm('Are you sure you want to delete this activity?')) {
      await deletePost(updatedActivity.id!).then((res) => {
        console.log(res);
        deleteActivity(updatedActivity.id!)
        onClose()
        console.log(res);
      }).catch((err) => {
        console.log(err);
      })
    }
  }

  const handleTagChange = (tag: string, checked: boolean) => {
    if (updatedActivity) {
      setUpdatedActivity(prev => {
        if (!prev) return null
        return {
          ...prev,
          tags: checked
            ? [...(prev.tags || []), tag]
            : (prev.tags || []).filter(t => t !== tag)
        }
      })
    }
  }

  const availableTags = ['urgent', 'important', 'low-priority']

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Update Activity</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="project" className="text-right">Project</Label>
            <Input
              id="project"
              value={updatedActivity.project}
              onChange={(e: ChangeEvent) => setUpdatedActivity({ ...updatedActivity, project: (e.target as HTMLInputElement).value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="activity" className="text-right">Activity</Label>
            <Input
              id="activity"
              value={updatedActivity.project}
              onChange={(e: ChangeEvent) => setUpdatedActivity({ ...updatedActivity, acitivityDescription: (e.target as HTMLInputElement).value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cost" className="text-right">Cost</Label>
            <Input
              id="cost"
              type="number"
              value={updatedActivity.cost}
              onChange={(e: ChangeEvent) => setUpdatedActivity({ ...updatedActivity, cost: parseFloat((e.target as HTMLInputElement).value) })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="profit" className="text-right">Profit</Label>
            <Input
              id="profit"
              type="number"
              value={updatedActivity.profit}
              onChange={(e: ChangeEvent) => setUpdatedActivity({ ...updatedActivity, profit: parseFloat((e.target as HTMLInputElement).value) })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="deadline" className="text-right">Deadline</Label>
            <Input
              id="deadline"
              type="date"
              value={updatedActivity.deadline?.split('T')[0] || ''}
              onChange={(e: ChangeEvent) => {
                const value = (e.target as HTMLInputElement).value;
                if (!value) {
                  setUpdatedActivity({ ...updatedActivity, deadline: new Date().toISOString() });
                  return;
                }
                const date = new Date(`${value}T12:00:00`);
                setUpdatedActivity({ ...updatedActivity, deadline: date.toISOString() });
              }}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Tags</Label>
            <div className="col-span-3 space-y-2">
              {availableTags.map(tag => (
                <div key={tag} className="flex items-center space-x-2">
                  <Checkbox
                    id={`tag-${tag}`}
                    checked={updatedActivity.tags && updatedActivity.tags.includes(tag)}
                    onCheckedChange={(checked) => handleTagChange(tag, checked as boolean)}
                  />
                  <Label htmlFor={`tag-${tag}`}>{tag}</Label>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Completed</Label>
            <Checkbox
              checked={updatedActivity.completed}
              onCheckedChange={(checked) => setUpdatedActivity({ ...updatedActivity, completed: checked as boolean })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">
            {
              isUpdating
                ? 'Updating...'
                : 'Update Activity'
            }
          </Button>
          <Button type="button" variant="destructive" onClick={handleDelete}>
            {
              isDeleting
                ? 'Deleting...'
                : 'Delete Activity'
            }
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}

