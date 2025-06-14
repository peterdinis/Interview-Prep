import type { FC } from "react";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "../ui/pagination";

type DashboardPaginationProps = {
	getPageNumbers: () => number[];
	handlePageChange: (page: number) => void;
	currentPage: number;
};

const DashboardPagination: FC<DashboardPaginationProps> = ({
	getPageNumbers,
	handlePageChange,
	currentPage,
}) => {
	return (
		<div className="flex mt-6 justify-center items-center">
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							onClick={() => handlePageChange(currentPage - 1)}
						/>
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
	);
};

export default DashboardPagination;
