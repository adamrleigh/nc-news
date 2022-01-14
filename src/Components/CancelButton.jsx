import { Button } from "react-bootstrap";
import { FaBan } from "react-icons/fa";

export const CancelButton = ({ setState }) => {
  return (
    <Button variant="danger" onClick={() => setState((curr) => !curr)}>
      Cancel <FaBan />
    </Button>
  );
};
