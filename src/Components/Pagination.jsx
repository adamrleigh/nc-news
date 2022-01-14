import { Pagination } from "react-bootstrap";

export const PaginationButtons = ({ page, setPage, limit, totalCount }) => {
  let pageButtons = [];

  for (let p = 1; p * limit <= totalCount; p++) {
    pageButtons.push(
      <Pagination.Item
        onClick={() => setPage(p + 1)}
        active={page === p + 1}
        key={`${p + 1}`}
      >
        {p + 1}
      </Pagination.Item>
    );
  }

  return (
    <>
      <br></br>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination className="align-items-center">
          <Pagination.Item
            onClick={() => setPage(1)}
            active={page === 1}
            key="1"
          >
            1
          </Pagination.Item>
          {pageButtons}
        </Pagination>
      </div>
    </>
  );
};
