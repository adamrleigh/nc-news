import { ButtonGroup, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { fetchArticleById } from '../Utils/api';
import { getDate } from '../Utils/api';
import {Comments} from '../Components/Comments'
import { CommentButton } from '../Components/CommentButton';
import { LikeButton } from '../Components/LikeButton';
import { LinkContainer } from 'react-router-bootstrap';
import { Error } from './Error';

export const SingleArticle = (  ) => {

    const { article_id } = useParams();
    const [article, setArticle] = useState({});
    const [showComments, setShowComments] = useState(false);
    const [timeStamp, setTimeStamp] = useState("");
    const [articleError, setArticleError] = useState(false);
    
    useEffect(async () => {
    try {
    const {article} = await fetchArticleById(article_id);
    setArticleError(false);
    setArticle(article);
    setTimeStamp(getDate(article.created_at));
    }
    catch {
        setArticleError(true);
    }
    }, []);

    console.log(articleError);

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
                    <ButtonGroup size="md">
                    <CommentButton setShowComments={setShowComments} comments={article.comment_count} />                
                    <LikeButton votes={article.votes} />
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
