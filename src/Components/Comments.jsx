import {useState, useEffect} from "react";
import {fetchComments, fetchUserComments} from "../Utils/api";
import { SingleComment } from "./SingleComment"
import { Button, ButtonGroup, Row } from "react-bootstrap";
import { AddComment } from "./AddComment";
import { FaPencilAlt } from "react-icons/fa";

export const Comments = ( {article_id, username }) => {
    
    const [comments, setComments] = useState([]);
    const [showAddComment, setShowAddComment] = useState(false);
    const [loading, setLoading] = useState(true);

    
    useEffect(async () => {
        try {
        const {comments} = article_id
        ? await fetchComments(article_id)
        : await fetchUserComments(username);
        setComments(comments);
        setLoading(false);
        }
        catch (err) {
            console.log(err);
        }
    }, []);
    
    return (
        <>
        {loading 
        ? <SingleComment />
        :
        <>
        {article_id && !showAddComment
        ? <Button variant="warning" onClick={() => setShowAddComment(curr => !curr)}><FaPencilAlt /></Button>
        : null
}
        {showAddComment
        ? 
        <AddComment setState={setShowAddComment}/>
        : null
    }
        {comments.length
        ? <Row lg={1} className="g-4">
                {comments.map(comment =>
                    !article_id 
                    ? <SingleComment comment={comment} isProfile={true}/>
                    : <SingleComment comment={comment} />
                )}
        </Row>
        : <h4>No comments found</h4>
        }
        </>
}
</>
        )
}