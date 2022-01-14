import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useParams } from "react-router";
import { fetchUser } from "../Utils/api";
import { Comments } from "../Components/Comments";
import { LoadingSpinner } from "../Components/LoadingSpinner";
import { UserComp } from "../Components/UserComp";
import { fetchUserArticles } from "../Utils/api";
import { Button, ButtonGroup } from "react-bootstrap";
import { Articles } from "../Components/Articles";
import { FaNewspaper, FaComments } from "react-icons/fa";
import { Card } from "react-bootstrap";

export const UserPage = ({ user }) => {
  const { username } = useParams();
  const [userProfile, setUserProfile] = useState(user || {});
  const [showArticles, setShowArticles] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [userArticles, setUserArticles] = useState([]);

  const {
    user: { username: currentUser },
  } = useContext(UserContext);

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
          <Card variant="light">
            <UserComp user={userProfile} disabled={user ? 0 : 1} />
            {!user && (
              <ButtonGroup size="sm" className="mb-2">
                <Button
                  variant="dark"
                  onClick={() => {
                    setShowComments(false);
                    setShowArticles((curr) => !curr);
                  }}
                >
                  Articles <FaNewspaper />
                </Button>
                <Button
                  variant="success"
                  onClick={() => {
                    setShowArticles(false);
                    setShowComments((curr) => !curr);
                  }}
                >
                  Comments <FaComments />
                </Button>
              </ButtonGroup>
            )}
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
          </Card>
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
