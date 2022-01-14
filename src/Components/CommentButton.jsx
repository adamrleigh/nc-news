import { FaCommentAlt } from "react-icons/fa";
import { Button } from "react-bootstrap";

export const CommentButton = ({ comments, setShowComments }) => {
  return (
    <>
      {setShowComments ? (
        <Button
          variant="success"
          onClick={() => setShowComments((curr) => !curr)}
        >
          {comments} <FaCommentAlt />{" "}
        </Button>
      ) : (
        <Button variant="success" disabled>
          {comments} <FaCommentAlt />{" "}
        </Button>
      )}
    </>
  );
};
