import { useState, useMemo } from 'react';

const usePagination = (data, totalPages, numVisiblePages = 5, dataPerPage = 12) => {
	const [currentPage, setCurrentPage] = useState(1);

	function nextPage() {
		const nextPage = (currentPage + 1) % totalPages;
		setCurrentPage(nextPage === 0 ? totalPages : nextPage);
	}

	function previousPage() {
		const previousPage = (currentPage - 1 + totalPages) % totalPages;
		setCurrentPage(previousPage === 0 ? totalPages : previousPage);
	}

	const getVisiblePagesRange = useMemo(() => {
		let start = 1;
		let end = totalPages;
		if (end - start > numVisiblePages) {
			end = Math.min(currentPage + 2, totalPages);
			start = end - (numVisiblePages - 1);
		}
		return start <= 0 ? range(end - start + 1, 1) : range(end - start + 1, start);
	}, [currentPage, totalPages, numVisiblePages]);

	const getPageData = useMemo(() => {
		const startIndex = currentPage * dataPerPage - dataPerPage;
		const endIndex = startIndex + dataPerPage;
		return data.slice(startIndex, endIndex);
	}, [currentPage, data, dataPerPage]);

	function range(size, startAt = 0) {
		return [...Array(size).keys()].map((i) => i + startAt);
	}

	return { setCurrentPage, currentPage, nextPage, previousPage, getPageData, getVisiblePagesRange };
};

export default usePagination;
