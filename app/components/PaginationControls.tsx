
import { Button } from '@/components/ui/button';
import React, { FC, ReactElement } from 'react'
import { useAppSelector } from '../store/hooks';

interface PaginationControlsProps {
    page: number;
    setPage: (page: number) => void;
}

const PaginationControls: FC<PaginationControlsProps> = ({ page, setPage }): ReactElement => {


    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const activities = useAppSelector((state) => state.activities);
    const itemsPerPage = 10;
    const totalItems = (activities.activities[0].activities as unknown[]).length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const isNextDisabled = page > totalPages;


    return (
        <div className='flex justify-center space-x-4 mt-4 items-center'>
            <Button
                onClick={() => handlePageChange(page - 1)}
                disabled={page <= 1}
                variant="outline"
            >
                Previous
            </Button>
            <span className="text-sm">Page {page}</span>
            <Button
                disabled={isNextDisabled}
                onClick={() => handlePageChange(page + 1)}
                variant="outline"
            >
                Next
            </Button>
        </div>
    )
}

export default PaginationControls