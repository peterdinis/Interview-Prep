"use client"

import { FC } from "react";
import { HStack, Button } from "@chakra-ui/react";

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const DashboardPagination: FC<PaginationProps> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const pages = [...Array(totalPages).keys()].map(num => num + 1);

    return (
        <HStack spacing={2}>
            {pages.map((page) => (
                <Button
                    key={page}
                    onClick={() => onPageChange(page)}
                    isActive={page === currentPage}
                >
                    {page}
                </Button>
            ))}
        </HStack>
    );
};

export default DashboardPagination;