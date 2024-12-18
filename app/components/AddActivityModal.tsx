'use client'

import { useState } from 'react'
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Activity, User } from '@/interfaces/main.interface'

interface AddActivityModalProps {
  onClose: () => void
  onAdd: (activity: Activity) => void
  activities: Activity[]
  users: User[]
}

export default function AddActivityModal({ onClose, onAdd, users }: AddActivityModalProps) {
  const [activity, setActivity] = useState<Omit<Activity, 'id' | 'completed' | 'timeSpent' | 'progress' | 'comments'>>({
    project: '',
    activity: '',
    cost: 0,
    profit: 0,
    deadline: new Date().toISOString().split('T')[0], // Set default to today's date
    link: '',
    dependencies: [],
    tags: [],
    attachments: [],
    assignedTo: []
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const today = new Date().toISOString().split('T')[0]
    onAdd({
      ...activity,
      id: Date.now().toString(),
      completed: false,
      timeSpent: 0,
      progress: 0,
      comments: [],
      deadline: activity.deadline || today // Use today's date if no date was entered
    })
    onClose()
  }

  const handleCheckboxChange = (field: 'dependencies' | 'tags' | 'assignedTo', value: string) => {
    setActivity(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add New Activity</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="project" className="text-right">Project</Label>
            <Input
              id="project"
              value={activity.project}
              onChange={(e) => setActivity({ ...activity, project: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="activity" className="text-right">Activity</Label>
            <Input
              id="activity"
              value={activity.activity}
              onChange={(e) => setActivity({ ...activity, activity: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cost" className="text-right">Cost</Label>
            <Input
              id="cost"
              type="number"
              value={activity.cost}
              onChange={(e) => setActivity({ ...activity, cost: parseFloat(e.target.value) })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="profit" className="text-right">Profit</Label>
            <Input
              id="profit"
              type="number"
              value={activity.profit}
              onChange={(e) => setActivity({ ...activity, profit: parseFloat(e.target.value) })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="deadline" className="text-right">Deadline</Label>
            <Input
              id="deadline"
              type="date"
              value={activity.deadline}
              onChange={(e) => setActivity({ ...activity, deadline: e.target.value })}
              className="col-span-3"
              min={new Date().toISOString().split('T')[0]} // Prevent selecting past dates
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="link" className="text-right">Link</Label>
            <Input
              id="link"
              type="url"
              value={activity.link}
              onChange={(e) => setActivity({ ...activity, link: e.target.value })}
              className="col-span-3"
              placeholder="https://example.com"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Tags</Label>
            <div className="col-span-3 space-y-2">
              {['urgent', 'important', 'low-priority'].map(tag => (
                <div key={tag} className="flex items-center space-x-2">
                  <Checkbox
                    id={`tag-${tag}`}
                    checked={activity.tags.includes(tag)}
                    onCheckedChange={() => handleCheckboxChange('tags', tag)}
                  />
                  <Label htmlFor={`tag-${tag}`}>{tag}</Label>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Assign To</Label>
            <div className="col-span-3 space-y-2">
              {users.map(user => (
                <div key={user.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`user-${user.id}`}
                    checked={activity.assignedTo.includes(user.id)}
                    onCheckedChange={() => handleCheckboxChange('assignedTo', user.id)}
                  />
                  <Label htmlFor={`user-${user.id}`}>{user.name}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Add Activity</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}

