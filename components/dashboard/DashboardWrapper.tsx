"use client"

import { Filter, Plus, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "../ui/pagination";

const DashboardWrapper = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    const delta = 2;
    const range: number[] = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      range.unshift(-1);
    }
    if (currentPage + delta < totalPages - 1) {
      range.push(-2);
    }

    range.unshift(1);
    if (totalPages > 1) range.push(totalPages);

    return range;
  };

  return (
    <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Banner */}
      <div className="mb-8 animate-fade-in-up">
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back 👋</h1>
              <p className="text-blue-100 text-lg">
                Ready to practice and improve your interview skills today?
              </p>
            </div>
            <div className="mt-6 lg:mt-0">
              <Button className="bg-sky-600 hover:bg-sky-900 rounded-lg text-base" size="lg">
                <Plus className="h-7 w-7 mr-2" />
                Create New Interview
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">STATS</div>

      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Test Interviews</h2>
            <p className="text-gray-600">
              Practice and improve your interview skills with personalized mock interviews.
            </p>
          </div>
        </div>

        {/* Search & Filter */}
        <div
          className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
          style={{ animationDelay: "300ms" }}
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search interviews by title, category, or description..."
              className="pl-10 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-300 focus:ring-blue-200 shadow-sm"
            />
          </div>
          <Button
            variant="outline"
            className="bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-gray-50 shadow-sm"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Interviews List */}
      <div>YOUR INTERVIEWS (page {currentPage})</div>

      {/* Pagination */}
      <div className="flex mt-6 justify-center items-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
            </PaginationItem>

            {getPageNumbers().map((page, idx) => {
              if (page === -1) {
                return (
                  <PaginationItem key={`ellipsis-left-${idx}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              if (page === -2) {
                return (
                  <PaginationItem key={`ellipsis-right-${idx}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={currentPage === page}
                    onClick={() => handlePageChange(page)}
                    href="#"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </main>
  );
};

export default DashboardWrapper;
