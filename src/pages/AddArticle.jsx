import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../contexts/UserContext";
import { postArticle } from "../Utils/api";
import { Alert, Button, Form, FloatingLabel } from "react-bootstrap";

export const AddArticle = ({ topics }) => {
  const [userPost, setUserPost] = useState({});
  const [postError, setPostError] = useState(false);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.username) navigate(`/`);
  }, [user, navigate]);

  const handleChange = (event, field) => {
    setUserPost({ ...userPost, [field]: event.target.value });
  };

  const sendArticle = async (event) => {
    event.preventDefault();
    try {
      const { article } = await postArticle({
        ...userPost,
        author: user.username,
      });
      navigate(`/articles/${article.article_id}`);
    } catch (err) {
      setPostError(err.message);
    }
  };

  console.log(userPost);

  return (
    <>
      <h1>Add article</h1>
      <Form onSubmit={sendArticle}>
        <Form.Group className="mb-3" controlId="formUserName">
          <FloatingLabel
            controlId="floatingInput"
            label="Title"
            className="mb-3"
          >
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
            <Form.Control
              required
              type="input"
              placeholder="Enter your username"
              value={userPost.title}
              onChange={(e) => handleChange(e, "title")}
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formName">
          <FloatingLabel controlId="floatingSelect" label="Topic">
            <Form.Select
              required
              value={userPost.topic}
              onChange={(e) => handleChange(e, "topic")}
            >
              <option value="" default>
                Select topic
              </option>
              {topics.map((topic) => (
                <option value={topic.slug}>{topic.slug}</option>
              ))}
            </Form.Select>
          </FloatingLabel>
        </Form.Group>
        <FloatingLabel controlId="floatingTextarea2" label="Body">
          <Form.Control
            required
            value={userPost.body}
            onChange={(e) => handleChange(e, "body")}
            as="textarea"
            style={{ height: "150px" }}
          />
        </FloatingLabel>
        <br></br>
        <Button variant="primary" type="submit">
          Post article
        </Button>
      </Form>
      {postError ? (
        <Alert variant="danger" color="black">
          {postError}
        </Alert>
      ) : null}
    </>
  );
};
