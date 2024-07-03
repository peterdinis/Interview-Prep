'use client';

import { FC } from 'react';
import { HStack, Button } from '@chakra-ui/react';

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const DashboardPagination: FC<PaginationProps> = ({
    totalItems,
    itemsPerPage,
    currentPage,
    onPageChange,
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const pages = [...Array(totalPages).keys()].map((num) => num + 1);

    return (
        <HStack spacing={2}>
            <Button
                onClick={() => onPageChange(currentPage - 1)}
                isDisabled={currentPage === 1}
            >
                Previous
            </Button>
            {pages.map((page) => (
                <Button
                    key={page}
                    onClick={() => onPageChange(page)}
                    isActive={page === currentPage}
                >
                    {page}
                </Button>
            ))}
            <Button
                onClick={() => onPageChange(currentPage + 1)}
                isDisabled={currentPage === totalPages}
            >
                Next
            </Button>
        </HStack>
    );
};

export default DashboardPagination;