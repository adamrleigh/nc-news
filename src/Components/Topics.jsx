import { Button, ButtonGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import { fetchTopics } from "../Utils/api";
import { useState, useEffect } from "react";
import { LoadingSpinner } from "./LoadingSpinner";

export const Topics = ({ setTopic }) => {
  const [topics, setTopics] = useState([]);

  useEffect(async () => {
    const { topics } = await fetchTopics();
    setTopics(topics);
  }, []);

  return (
    <>
      <h4>Topics</h4>
      {topics.length ? (
        <ButtonGroup>
          <Button
            variant="warning"
            style={{ border: "1px solid black" }}
            onClick={() => setTopic("")}
          >
            All
          </Button>
          {topics.map((topic) => (
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id={`tooltip-${topic.slug}`}>
                  {topic.description}
                </Tooltip>
              }
            >
              <Button
                onClick={() => setTopic(topic.slug)}
                variant="info"
                style={{ border: "1px solid black" }}
              >
                {topic.slug}
              </Button>
            </OverlayTrigger>
          ))}
        </ButtonGroup>
      ) : (
        <>
          <h4>Loading topics...</h4>
          <LoadingSpinner />
        </>
      )}
    </>
  );
};
