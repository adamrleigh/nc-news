import { Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { deleteComment, deleteArticle } from "../Utils/api";

export const DeleteButton = ( {comment_id, article_id} ) => {
    return (
        <Button variant="danger" onClick={()=>{comment_id && deleteComment(comment_id) || deleteArticle(article_id)}}><FaTrash /></Button>
    )
}
