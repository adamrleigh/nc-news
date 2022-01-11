import {useState, useEffect} from "react";
import {fetchComments} from "../Utils/api";
import { SingleComment } from "./SingleComment"
import { Row } from "react-bootstrap";


export const Comments = ( {article_id }) => {
    
    const [comments, setComments] = useState([]);
    
    useEffect(async () => {
        const {comments} = await fetchComments(article_id);
        setComments(comments);
    }, []);
    
    return (
        <>
        <br></br>
        <h4>Comments</h4>
        {comments.length
        ? <Row lg={1} className="g-4">
                {comments.map(comment => 
                    <SingleComment comment={comment} />
                )}
        </Row>
        : <SingleComment />
        }
        </>
    )
}
