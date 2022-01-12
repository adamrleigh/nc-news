import { useContext, useEffect, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import { useParams } from "react-router";
import { fetchUser } from "../Utils/api";
import { Comments } from "../Components/Comments";
import { LoadingSpinner } from "../Components/LoadingSpinner";
import { UserComp } from "../Components/UserComp";
import { fetchUserArticles } from "../Utils/api";
import { Button, ButtonGroup } from "react-bootstrap";
import { Articles } from "../Components/Articles";
import { FaNewspaper, FaComments } from "react-icons/fa";

export const UserPage = () => {
    
    const {user} = useContext(UserContext);
    const {username} = useParams();
    const [userProfile, setUserProfile] = useState({});
    const [showArticles, setShowArticles] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [userArticles, setUserArticles] = useState([]);


    useEffect (async () => {
        const {user: userProfileData} = await fetchUser(username);
        setUserProfile(userProfileData);
        const {articles} = await fetchUserArticles(username);
        setUserArticles(articles);
    }, [username]);

    return (
        <>
        {userProfile.username 
        ?
        <>
        <UserComp user={userProfile} disabled={1}/>
        <br></br><br></br>
        <ButtonGroup size="sm" className="mb-2">
        <Button variant="dark" onClick={()=>{setShowComments(false); setShowArticles(curr=>!curr)}}>Articles <FaNewspaper /></Button>
        <Button variant="success" onClick={()=>{setShowArticles(false); setShowComments(curr=>!curr)}}>Comments <FaComments /></Button>
        </ButtonGroup>
        {showComments ? <Comments username={username} /> : null}
        {showArticles ? <Articles author={username} /> : null}
        </>
        :
        <> 
        <h1>{username}s page</h1>
        <LoadingSpinner />
        </>
    }
        </>
    )
}
