import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`page-number ${currentPage === i ? 'current' : ''}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>,
      );
    }
    return pages;
  };

  return (
    <div className="delta-pagination">
      {currentPage > 1 && (
        <button
          className="page-nav prev"
          onClick={() => onPageChange(currentPage - 1)}
        >
          « Trước
        </button>
      )}

      {renderPageNumbers()}

      {currentPage < totalPages && (
        <button
          className="page-nav next"
          onClick={() => onPageChange(currentPage + 1)}
        >
          Tiếp theo »
        </button>
      )}
    </div>
  );
};
