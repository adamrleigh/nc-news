import { ButtonGroup, Form, Alert, FloatingLabel } from "react-bootstrap";
import { WriteButton } from "./WriteButton";
import { CancelButton } from "./CancelButton";
import { postComment } from "../Utils/api";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const AddComment = ({
  setState,
  article_id,
  setComments,
  setCommentCount,
}) => {
  const [commentBody, setCommentBody] = useState("");
  const [postError, setPostError] = useState(false);

  const { user } = useContext(UserContext);

  const sendComment = async (event) => {
    event.preventDefault();
    setPostError(false);
    setCommentCount((curr) => Number(curr) + 1);
    try {
      const { comment } = await postComment(article_id, {
        author: user.username,
        body: commentBody,
      });
      setComments((curr) => [...curr, comment]);
      setState(false);
    } catch (err) {
      setPostError(err.message);
      setCommentCount((curr) => curr - 1);
    }
  };

  return (
    <>
      <h2>New comment:</h2>
      <Form onSubmit={sendComment}>
        <FloatingLabel controlId="floatingBody" label="Comment">
          <Form.Control
            required
            onChange={(e) => setCommentBody(e.target.value)}
            value={commentBody}
            as="textarea"
            rows={3}
            style={{ height: "150px" }}
          />
        </FloatingLabel>
        <div className="d-grid gap-2">
          <WriteButton size="lg" />
          <CancelButton setState={setState} />
        </div>
      </Form>
      <br></br>
      {postError ? <Alert variant="danger">{postError}</Alert> : null}
    </>
  );
};
