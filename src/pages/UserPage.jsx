import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchUser } from "../Utils/api";
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

  useEffect(async () => {
    const { user: userProfileData } = await fetchUser(
      (user && user.username) || username
    );
    setUserProfile(userProfileData);
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
          <br></br>
          <br></br>
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
