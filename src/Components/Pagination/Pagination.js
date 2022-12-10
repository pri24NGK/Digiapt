import React from "react";
import { usePagination, DOTS } from "./PaginationHook";
import Classes from "./Pagination.module.css";
export const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  return (
    <ul className={`${Classes.container} ${className}`}>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li
              className={`${Classes.pagination_item} ${Classes.dots}`}
              key={index}
            >
              &#8230;
            </li>
          );
        }
        return (
          <li
            className={`${Classes.pagination_item} ${
              pageNumber === currentPage ? Classes.selected : ""
            }`}
            onClick={() => {
              onPageChange(pageNumber);
              window.scrollTo(0, 0);
            }}
            key={index}
          >
            {pageNumber}
          </li>
        );
      })}
    </ul>
  );
};
