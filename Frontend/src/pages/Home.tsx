import { useEffect, useState } from 'react';
import Filter from '../components/Filter';
import Header from '../components/Header';
import { MeetItem } from '../components/MeetItem/MeetItem';
import MeetItemSkeleton from '../components/MeetItem/MeetItemSkeleton';
import SearchButton from '../components/SearchButton';
import { IMeet } from '../types/Meet';
import { useApi } from '../utils/MeetApi';
import Pagination from './Pagination';

const ITEMS_PER_PAGE = 6;

const Home = () => {
	const [loading, setLoading] = useState(false);
	const [meets, setMeets] = useState<IMeet[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const api = useApi();

	const fetchMeets = () => {
		setLoading(true);
		api
			.getAllMeets()
			.then((fetchedMeets) => {
				setMeets(fetchedMeets);
			})
			.catch((error) => {
				console.error('Erro na API:', error);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		fetchMeets();
	}, []);

	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	const paginatedMeets = meets.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE
	);

	const totalPages = Math.ceil(meets.length / ITEMS_PER_PAGE);

	return (
		<div className="h-screen xsm:h-full md:pb-4 w-screen bg-primary relative flex flex-col items-center">
			<Header />
			<div className="grid grid-cols-1 md:grid-cols-3 mx-6 sm:p-0 gap-4 md:gap-20 sm:w-3/4">
				<div className="col-span-2 flex justify-start md:justify-end ">
					<SearchButton />
				</div>
				<div className="flex justify-start md:justify-end">
					<Filter />
				</div>
			</div>
			<main className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 px-6 sm:p-0 gap-12 mt-16 place-content-around sm:w-3/4 mx-auto">
				{loading &&
					Array.from({ length: 6 }).map((_, index) => (
						<MeetItemSkeleton key={index} />
					))}
				{paginatedMeets.map((meet, index) => (
					<MeetItem key={index} {...meet} />
				))}
			</main>

			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={handlePageChange}
			/>
		</div>
	);
};

export default Home;
