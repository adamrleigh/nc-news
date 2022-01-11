import { ButtonGroup, Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { getDate } from '../Utils/api';
import { LikeButton } from './LikeButton';
import { CommentButton } from './CommentButton';

export const ArticlePreview = ( {article, setTopic} ) => {
    
    return (
            <Card 
            bg="dark"
            text="white"
            style={{}}
            >
                <LinkContainer
                to={`/topics/${article.topic}`}
                >
                <Card.Header 
                className="text-muted"
                bg="info"
                >{article.topic}</Card.Header>
                </LinkContainer>
                <Card.Body>
                <LinkContainer 
                    to ={`/articles/${article.article_id}`}
                    >
                    <Card.Title>{article.title}</Card.Title>
                    </LinkContainer>
                </Card.Body>
                <Card.Footer>
                    <ButtonGroup size="sm" disabled>
                        <CommentButton comments={article.comment_count} />
                        <LikeButton votes={article.votes} />
                    </ButtonGroup>
                    <br></br>
                    <small className="text-muted">{getDate(article.created_at)}</small>
                </Card.Footer>
            </Card>
    )
}
