import React from 'react';
import { useFetch } from './useFetch';
import { BsChevronLeft, BsChevronRight, BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs';
import Follower from './Follower';
import Loading from './Loading';
import usePagination from './usePagination';

const PAGE_LIMIT = 5;
const USERS_PER_PAGE = 12;

function App() {
	const { loading, data: users } = useFetch();
	const totalUsers = users?.length || 0;
	const totalPages = Math.ceil(totalUsers / USERS_PER_PAGE);
	const { setCurrentPage, currentPage, getPageData, getVisiblePagesRange } = usePagination(users, totalPages, PAGE_LIMIT, USERS_PER_PAGE);

	function handlePageChange(e, page) {
		if (page !== currentPage) {
			setCurrentPage(parseInt(e.target.innerHTML));
		}
	}

	if (loading) {
		return <Loading />;
	}

	return (
		<main>
			<div className='section-title'>
				<h1>Pagination</h1>
				<div className='underline'></div>
			</div>
			<section className='followers'>
				<div className='container'>
					{getPageData.map((user) => {
						return <Follower key={user.id} {...user} />;
					})}
				</div>
				<div className='btn-container'>
					<button className='prev-btn' onClick={() => setCurrentPage(1)}>
						<BsChevronDoubleLeft />
					</button>
					<button
						className='prev-btn'
						onClick={() => {
							const previousPage = (currentPage - 1 + totalPages) % totalPages;
							setCurrentPage(previousPage === 0 ? totalPages : previousPage);
						}}>
						<BsChevronLeft />
					</button>
					{getVisiblePagesRange.map((page) => {
						return (
							<button key={page} onClick={(e) => handlePageChange(e, page)} className={`page-btn ${currentPage === page ? 'active-btn' : ''}`}>
								{page}
							</button>
						);
					})}
					<button className='prev-btn'>
						<BsChevronRight
							onClick={() => {
								const nextPage = (currentPage + 1) % totalPages;
								setCurrentPage(nextPage === 0 ? totalPages : nextPage);
							}}
						/>
					</button>
					<button className='prev-btn'>
						<BsChevronDoubleRight onClick={() => setCurrentPage(totalPages)} />
					</button>
				</div>
			</section>
		</main>
	);
}

export default App;
