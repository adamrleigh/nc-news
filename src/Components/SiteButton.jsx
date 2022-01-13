import { FaCommentAlt, FaRegThumbsU } from "react-icons/fa";

export const SiteButton = ({ value, clickFunc, variant }) => {
  return (
    <>
      {clickFunc ? (
        <Button variant={variant} onClick={clickFunc}>
          <FaCommentAlt /> {comments}
        </Button>
      ) : (
        <Button variant={variant} disabled>
          <FaCommentAlt /> {comments}
        </Button>
      )}
    </>
  );
};
