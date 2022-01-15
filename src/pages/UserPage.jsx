import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchUser, fetchUserArticles, fetchUserComments } from "../Utils/api";
import { Comments } from "../Components/Comments";
import { LoadingSpinner } from "../Components/LoadingSpinner";
import { UserComp } from "../Components/UserComp";
import { Button, ButtonGroup } from "react-bootstrap";
import { Articles } from "../Components/Articles";
import { FaNewspaper, FaComments } from "react-icons/fa";

export const UserPage = ({ user }) => {
  const { username } = useParams();
  const [userProfile, setUserProfile] = useState(user || {});
  const [showArticles, setShowArticles] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [articleCount, setArticleCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [voteCount, setVoteCount] = useState(0);

  useEffect(async () => {
    try {
      const { user: userProfileData } = await fetchUser(
        (user && user.username) || username
      );
      const { articles } = await fetchUserArticles(
        (user && user.username) || username
      );
      const { comments } = await fetchUserComments(
        (user && user.username) || username
      );
      setUserProfile(userProfileData);
      setCommentCount(comments.comment_count);
      setArticleCount(articles.article_count);
    } catch {
      console.log("BAD this");
    }
  }, [username]);

  return (
    <>
      {userProfile.username ? (
        <>
          <UserComp
            user={userProfile}
            disabled={user ? 0 : 1}
            setShowArticles={setShowArticles}
            setShowComments={setShowComments}
          />

          {showComments ? (
            <Comments
              username={(userProfile && userProfile.username) || username}
            />
          ) : null}
          {showArticles ? (
            <Articles
              author={(userProfile && userProfile.username) || username}
              hideAddButton={true}
            />
          ) : null}
        </>
      ) : (
        <>
          <h1>{username}s page</h1>
          <LoadingSpinner />
        </>
      )}
    </>
  );
};
