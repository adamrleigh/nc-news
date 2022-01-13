import { Button } from "react-bootstrap";

export const PaginationButtons = ({ page, setPage, limit, totalCount }) => {
  return (
    <>
      <Button
        disabled={page === 1}
        variant="info"
        onClick={() => setPage((curr) => curr - 1)}
      >
        Previous
      </Button>
      <Button
        disabled={limit * page >= totalCount}
        variant="info"
        onClick={() => setPage((curr) => curr + 1)}
      >
        Next
      </Button>
    </>
  );
};
