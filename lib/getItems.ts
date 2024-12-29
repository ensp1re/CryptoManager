import axios from 'axios'




export default async function getItems(page: number, pageSize: number) {
    try {
        const apiUrl: string = process.env.NEXTAUTH_URL || 'http://localhost:3000';

        const res = await axios.get(`${apiUrl}/api/activities?page=${page}&pageSize=${pageSize}`)
        if (!res.data) {
            throw new Error('Failed to fetch data')
        }

        const contentType = res.headers['content-type']
        if (contentType && contentType.indexOf('application/json') !== -1) {
            return res.data
        } else {
            throw new Error('Failed to fetch data')
        }

    } catch (error) {
        console.error('Error fetching data:', error)
        return []
    }
}