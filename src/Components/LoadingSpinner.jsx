import { Spinner } from "react-bootstrap";

export const LoadingSpinner = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{ alignSelf: "center" }}
    ></Spinner>
  );
};
