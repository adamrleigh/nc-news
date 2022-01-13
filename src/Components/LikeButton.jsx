import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import { ToggleButton } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useCount } from "../Hooks/useCount";
import { likeComment, likeArticle } from "../Utils/api";
import { useState, useEffect } from "react";

export const LikeButton = ({ votes, comment_id, article_id, disabled }) => {
  const { user } = useContext(UserContext);
  const { count, setCount, increaseCount, decreaseCount } = useCount(votes);
  const [icon, setIcon] = useState(FaRegThumbsUp);
  const [liked, setLiked] = useState(false);

  useEffect(async () => {
    setCount(votes);
  }, [votes]);

  const handleClick = async () => {
    if (!liked) {
      addLike();
      setLiked(true);
    } else {
      removeLike();
      setLiked(false);
    }
  };

  const addLike = async () => {
    increaseCount();
    setIcon(FaThumbsUp);
    try {
      comment_id
        ? await likeComment(comment_id, 1)
        : await likeArticle(article_id, 1);
    } catch {
      decreaseCount();
      setIcon(FaRegThumbsUp);
    }
  };

  const removeLike = async () => {
    decreaseCount();
    setIcon(FaRegThumbsUp);
    try {
      comment_id
        ? await likeComment(comment_id, -1)
        : await likeArticle(article_id, -1);
    } catch {
      decreaseCount();
      setIcon(FaRegThumbsUp);
    }
  };

  return (
    <>
      {!disabled && user.username && (comment_id || article_id) ? (
        <ToggleButton type="checkbox" variant="primary" onClick={handleClick}>
          {icon} {count}
        </ToggleButton>
      ) : (
        <ToggleButton type="checkbox" variant="primary" disabled>
          {icon} {count}
        </ToggleButton>
      )}
    </>
  );
};
