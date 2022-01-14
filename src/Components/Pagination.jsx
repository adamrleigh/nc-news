import { Pagination } from "react-bootstrap";

export const PaginationButtons = ({ page, setPage, limit, totalCount }) => {
  let pageButtons = [];

  for (let p = 1; p * limit <= totalCount; p++) {
    pageButtons.push(
      <Pagination.Item onClick={() => setPage(p + 1)} active={page === p + 1}>
        {p + 1}
      </Pagination.Item>
    );
  }

  return (
    <>
      {pageButtons.length ? (
        <Pagination>
          <Pagination.Item onClick={() => setPage(1)} active={page === 1}>
            1
          </Pagination.Item>
          {pageButtons}
        </Pagination>
      ) : null}
    </>
  );
};
