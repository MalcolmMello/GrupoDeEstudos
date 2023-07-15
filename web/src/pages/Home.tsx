import { useEffect, useState } from 'react';
import Filter from '../components/Filter';
import Header from '../components/Header';
import SearchButton from '../components/SearchButton';
import { IMeet } from '../types/Meet';
import { api } from '../lib/axios';
import { Meet } from '../components/Meet';

const Home = () => {
	const [loading, setLoading] = useState(false);
	const [meets, setMeets] = useState<IMeet[]>([]);

	const getAllMeets = async () => {
		try {
			const response = await api.get('meetings/open');
			setMeets(response.data.meetings);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getAllMeets();
	}, []);

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
			<main className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 px-6 sm:p-0 gap-12 mt-10 place-content-around sm:w-3/4 mx-auto">
				{meets.length === 0 ? (
					<p className="text-white font-semibold">
						Nenhuma reunião foi criada recentemente.
					</p>
				) : (
					meets.map((meet, index) => (
						<Meet.Root key={index}>
							<Meet.Content {...meet} />
							<Meet.ButtonConfirm {...meet}/>
						</Meet.Root>
					))
				)}
			</main>
		</div>
	);
};

export default Home;
