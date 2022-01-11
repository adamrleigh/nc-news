import { ButtonGroup, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { fetchArticleById, fetchUser } from '../Utils/api';
import { getDate } from '../Utils/api';
import {Comments} from '../Components/Comments'
import { CommentButton } from '../Components/CommentButton';
import { LikeButton } from '../Components/LikeButton';
import { LinkContainer } from 'react-router-bootstrap';
import { Error } from './Error';
import { AddComment } from '../Components/AddComment';
import { likeArticle } from '../Utils/api';
import { UserComp } from '../Components/UserComp';

export const SingleArticle = (  ) => {

    const { article_id } = useParams();
    const [article, setArticle] = useState({});
    const [showComments, setShowComments] = useState(false);
    const [timeStamp, setTimeStamp] = useState("");
    const [articleError, setArticleError] = useState(false);
    const [likeValue, setLikeValue] = useState(1);
    const [author, setAuthor] = useState({});
    
    useEffect(async () => {
    try {
    const {article} = await fetchArticleById(article_id);
    const {user: authorUser} = await fetchUser(article.author);
    setArticleError(false);
    setAuthor(authorUser);
    setArticle(article);
    setTimeStamp(getDate(article.created_at));
    }
    catch {
        setArticleError(true);
    }
    }, []);

        const toggleLike = async () => {
            console.log(buttonStyle)
            setArticle(curr=>({...curr, votes: curr.votes + likeValue}));
            try {
                await likeArticle(article.article_id, likeValue);
                setLikeValue(curr=>-curr);
            }
            catch{
                setArticle(curr=>({...curr, votes: curr.votes - likeValue}));
            }
        }

    const buttonStyle = (likeValue < 0 && "10px solid red") || "";

    return (
        <>
            {!articleError
            ?
            <>
            <Card 
            bg="dark"
            text="white"
            style={{}}
            >
        <Card.Body>
            <LinkContainer
            to={`/topics/${article.topic}`}
            >
        <Card.Subtitle className="mb-2 text-muted">{article.topic}</Card.Subtitle>
            </LinkContainer>
            <Card.Title>{article.title}</Card.Title>
            <Card.Text>
            {article.body}
            </Card.Text>
            </Card.Body>
            <Card.Footer>
                    <UserComp user={author} />
                    <br></br><br></br>
                    <ButtonGroup size="md">
                    <CommentButton setShowComments={setShowComments} comments={article.comment_count} />                
                    <LikeButton votes={article.votes} onClick={toggleLike} style={{border: `${buttonStyle}`}}/>
                    </ButtonGroup>
                    <br></br>
                    <small className="text-muted">{timeStamp}</small>
                </Card.Footer>
        </Card>
        {showComments ? <Comments article_id={article_id}/> : null}
        </>
        : <Error thing="Article"/>
        }
        </>
    )
}
