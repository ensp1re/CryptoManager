'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { format } from 'date-fns'
import { Activity, Comment } from '@/interfaces/main.interface'
import axios from 'axios'

export default function ActivityPreview() {
    const params = useParams();
    const id = params?.id as string;
    const [activity, setActivity] = useState<Activity | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [editedActivity, setEditedActivity] = useState<Activity | null>(null)
    const [newComment, setNewComment] = useState('')

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                await axios.get(`/api/activities/${id}`).then((res) => {
                    setActivity(res.data.data)
                    setEditedActivity(res.data.data)
                })
            } catch {
                setError('Error loading activity')
            } finally {
                setLoading(false)
            }
        }

        fetchActivity()
    }, [id])



    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleSave = async () => {
        if (editedActivity) {
            try {
                setActivity(editedActivity)
                setIsEditing(false)
            } catch {
                setError('Error updating activity')
            }
        }
    }

    const handleCancel = () => {
        setEditedActivity(activity)
        setIsEditing(false)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setEditedActivity(prev => prev ? { ...prev, [name]: value } : null)
    }

    const handleAddComment = async (e: React.FormEvent) => {
        e.preventDefault()
        if (newComment.trim() && activity) {
            const comment: Comment = {
                id: Date.now().toString(),
                userId: 'currentUser', // Replace with actual user ID
                content: newComment.trim(),
                createdAt: new Date().toISOString(),
            }
            try {
                setActivity(prev => prev ? { ...prev, comments: [...(prev.comments || []), comment] } : null)
                setNewComment('')
            } catch {
                setError('Error adding comment')
            }
        }
    }

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex items-center space-x-2">
                <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Loading...</span>
            </div>
        </div>
    )
    if (error) return <div className="error">{error}</div>
    if (!activity) return <div className="not-found">Activity not found</div>

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 mb-8">
                    {isEditing ? (
                        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-4">
                            <div>
                                <label htmlFor="project" className="block text-sm font-medium mb-1">Project</label>
                                <input
                                    type="text"
                                    id="project"
                                    name="project"
                                    value={editedActivity?.project || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>
                            <div>
                                <label htmlFor="acitivityDescription" className="block text-sm font-medium mb-1">Description</label>
                                <textarea
                                    id="acitivityDescription"
                                    name="acitivityDescription"
                                    value={editedActivity?.acitivityDescription || ''}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                                ></textarea>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="cost" className="block text-sm font-medium mb-1">Cost</label>
                                    <input
                                        type="number"
                                        id="cost"
                                        name="cost"
                                        value={editedActivity?.cost || ''}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="profit" className="block text-sm font-medium mb-1">Profit</label>
                                    <input
                                        type="number"
                                        id="profit"
                                        name="profit"
                                        value={editedActivity?.profit || ''}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="timeSpent" className="block text-sm font-medium mb-1">Time Spent (hours)</label>
                                <input
                                    type="number"
                                    id="timeSpent"
                                    name="timeSpent"
                                    value={editedActivity?.timeSpent || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>
                            <div>
                                <label htmlFor="tags" className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
                                <input
                                    type="text"
                                    id="tags"
                                    name="tags"
                                    value={editedActivity?.tags?.join(', ') || ''}
                                    onChange={(e) => setEditedActivity(prev => prev ? { ...prev, tags: e.target.value.split(',').map(tag => tag.trim()) } : null)}
                                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>
                            <div>
                                <label htmlFor="deadline" className="block text-sm font-medium mb-1">Deadline</label>
                                <input
                                    type="date"
                                    id="deadline"
                                    name="deadline"
                                    value={editedActivity?.deadline?.split('T')[0] || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    ) : (
                        <>
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-3xl font-bold">{activity.project}</h1>
                                <button
                                    onClick={handleEdit}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                >
                                    Edit
                                </button>
                            </div>
                            <p className="text-lg mb-4">{activity.acitivityDescription}</p>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <span className="font-medium">Cost:</span> ${activity.cost?.toFixed(2)}
                                </div>
                                <div>
                                    <span className="font-medium">Profit:</span> ${activity.profit?.toFixed(2)}
                                </div>
                                <div>
                                    <span className="font-medium">Deadline:</span> {format(new Date(activity.deadline), 'PPP')}
                                </div>
                                <div>
                                    <span className="font-medium">Status:</span>
                                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${activity.completed ? 'bg-green-500 text-white' : 'bg-yellow-500 text-gray-900'
                                        }`}>
                                        {activity.completed ? 'Completed' : 'In Progress'}
                                    </span>
                                </div>
                            </div>
                            {activity.link && (
                                <div className="mb-4">
                                    <span className="font-medium">Link:</span>
                                    <a href={activity.link} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:underline">
                                        {activity.link}
                                    </a>
                                </div>
                            )}
                            {activity.tags && activity.tags.length > 0 && (
                                <div className="mb-4">
                                    <span className="font-medium">Tags:</span>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {activity.tags.map((tag, index) => (
                                            <span key={index} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {activity.progress !== undefined && (
                                <div className="mb-4">
                                    <span className="font-medium">Progress:</span>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                        <div
                                            className="bg-blue-600 h-2.5 rounded-full"
                                            style={{ width: `${activity.progress}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm">{activity.progress}%</span>
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
                    <h2 className="text-2xl font-bold mb-4">Comments</h2>
                    {activity.comments && activity.comments.length > 0 ? (
                        <ul className="space-y-4 mb-4">
                            {activity.comments.map((comment) => (
                                <li key={comment.id} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                                    <p className="mb-2">{comment.content}</p>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {format(new Date(comment.createdAt), 'PPP')}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="mb-4">No comments yet.</p>
                    )}
                    <form onSubmit={handleAddComment} className="space-y-2">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                            rows={3}
                        ></textarea>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                            Add Comment
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
