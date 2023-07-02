import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { MeetItem } from '../components/MeetItem';
import { IMeet } from '../types/Meet';
import { useApi } from '../utils/MeetApi';
import Pagination from './Pagination';

const ITEMS_PER_PAGE = 6;

const Home = () => {
  const [meets, setMeets] = useState<IMeet[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchMeets = async () => {
      try {
        const api = useApi();
        const fetchedMeets = await api.getAllMeets();
        setMeets(fetchedMeets);
      } catch (error) {
        console.error('Erro api:', error);
      }
    };

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
    <div className='h-screen xsm:h-full md:pb-4 w-screen bg-primary relative flex flex-col items-center'>
      <Header />
      <main className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 px-6 sm:p-0 gap-12 mt-20 place-content-around sm:w-3/4 mx-auto">
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
