'use client'

import { useState } from 'react'
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Activity, User } from '@/interfaces/main.interface'
import { useCreateActivityMutation } from '../store/api'
import { FaSpinner } from 'react-icons/fa'
import { useAppSelector } from '../store/hooks'
import { RootState } from '../store/store'
import toast from 'react-hot-toast'

interface AddActivityModalProps {
  onClose: () => void
  onAdd: (activity: Activity) => void
  activities: Activity[]
  users: User[]
}

export default function AddActivityModal({ onClose, onAdd }: AddActivityModalProps) {
  const [activity, setActivity] = useState<Omit<Activity, 'id' | 'completed' | 'timeSpent' | 'progress' | 'comments'>>({
    project: '',
    acitivityDescription: '',
    cost: 0,
    profit: 0,
    deadline: new Date().toISOString().split('T')[0],
    link: '',
    dependencies: [],
    tags: [],
    attachments: [],
    assignedTo: [],
    activities: []
  })

  const clearForm = () => {
    setActivity({
      project: '',
      acitivityDescription: '',
      cost: 0,
      profit: 0,
      deadline: new Date().toISOString().split('T')[0],
      link: '',
      dependencies: [],
      tags: [],
      attachments: [],
      assignedTo: [],
      activities: []
    })
  }


  const user = useAppSelector((state: RootState) => state.auth.user)

  const [postActivity, { isLoading }] = useCreateActivityMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const today = new Date().toISOString().split('T')[0]



    const dataWithUserId = {
      ...activity,
      userId: user?.id
    }


    console.log(dataWithUserId);
    await postActivity(dataWithUserId).unwrap()
      .then((res) => {
        toast.success('Activity created successfully')
        console.log(res);
        onAdd({
          ...activity,
          id: Date.now().toString(),
          completed: false,
          timeSpent: 0,
          progress: 0,
          comments: [],
          deadline: activity.deadline || today
        })
      })
      .catch((error) => {
        console.error('Failed to create activity:', error);
        toast.error('Failed to create activity')
      }).finally(() => {
        onClose()
        clearForm()
      });



  }

  const handleCheckboxChange = (field: 'dependencies' | 'tags' | 'assignedTo', value: string) => {
    setActivity(prev => ({
      ...prev,
      [field]: Array.isArray(prev[field])
        ? prev[field]!.includes(value)
          ? prev[field]!.filter(item => item !== value)
          : [...prev[field]!, value]
        : [value]
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
              required
              id="project"
              value={activity.project}
              onChange={(e) => setActivity({ ...activity, project: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="activity" className="text-right">Activity</Label>
            <Input
              required
              id="activity"
              value={activity.acitivityDescription}
              onChange={(e) => setActivity({ ...activity, acitivityDescription: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cost" className="text-right">Cost</Label>
            <Input
              id="cost"
              type="number"
              value={activity.cost!}
              onChange={(e) => setActivity({ ...activity, cost: e.target.value === '' ? 0 : parseFloat(e.target.value) })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="profit" className="text-right">Profit</Label>
            <Input
              id="profit"
              type="number"
              value={activity.profit!}
              onChange={(e) => setActivity({ ...activity, profit: e.target.value === '' ? 0 : parseFloat(e.target.value) })}
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
                    checked={activity.tags && activity.tags.includes(tag)}
                    onCheckedChange={() => handleCheckboxChange('tags', tag)}
                  />
                  <Label htmlFor={`tag-${tag}`}>{tag}</Label>
                </div>
              ))}
            </div>
          </div>
          {/* <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Assign To</Label>
            <div className="col-span-3 space-y-2">
              {users.map(user => (
                <div key={user.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`user-${user.id}`}
                    checked={activity.assignedTo && activity.assignedTo.includes(user.id)}
                    onCheckedChange={() => handleCheckboxChange('assignedTo', user.id)}
                  />
                  <Label htmlFor={`user-${user.id}`}>{user.name}</Label>
                </div>
              ))}
            </div>
          </div> */}
        </div>
        <DialogFooter>
          <Button type="submit">
            {
              isLoading ? (
                <FaSpinner className='animate-spin h-4 w-4 mr-2 inline-block' />
              ) : 'Add Activity'
            }
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}

