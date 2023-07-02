import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  const renderPageLinks = () => {
    const pageLinks = [];

    const maxVisibleLinks = 5;
    const halfMaxVisibleLinks = Math.floor(maxVisibleLinks / 2);

    let startPage = Math.max(1, currentPage - halfMaxVisibleLinks);
    let endPage = startPage + maxVisibleLinks - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisibleLinks + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageLinks.push(
        <button
          key={i}
          className={`mx-2 px-3 py-1 rounded ${currentPage === i ? 'bg-gray-500 text-white' : 'bg-gray-300 text-gray-700'
            }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return pageLinks;
  };

  return (
    <div className={`${currentPage == totalPages ? 'static mt-4 sm:fixed sm:top-[90%]' : 'static 2xl:fixed top-[90%]'} 
    mb-4 mt-8 flex justify-center`}>
      {renderPageLinks()}
    </div>
  );
};

export default Pagination;
