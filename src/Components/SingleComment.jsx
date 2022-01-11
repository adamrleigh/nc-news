import { Card } from 'react-bootstrap';
import { getDate, getTime } from '../Utils/api';
import { LikeButton } from './LikeButton';
import { LoadingSpinner } from './LoadingSpinner';



export const SingleComment = ( {comment} ) => {

    return (
        <>
        {comment 
        ?
        <Card 
        bg="lighter"
        style={{}}
        >
        <Card.Header>{comment.author}</Card.Header>
        <Card.Body>
            <Card.Text>
            {comment.body}
            </Card.Text>
            </Card.Body>
            <Card.Footer>
            <LikeButton votes={comment.votes} />
            <br></br>
            <small className="mb-2 text-muted">
                {getDate(comment.created_at)}
                <br></br>
                {getTime(comment.created_at)}
                </small>
            </Card.Footer>
        </Card>
        : <LoadingSpinner />
        }
    </>
    )
}
