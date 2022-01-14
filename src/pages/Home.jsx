import { Articles } from "../Components/Articles";
import { useParams } from "react-router";
import { Nav, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router";

export const Home = ({ topics }) => {
  const { topic_slug } = useParams();
  const current = topic_slug || "All";
  const navigate = useNavigate();

  const title = <h1 style={{ display: "inline" }}>{current}</h1>;

  return (
    <>
      <Nav className="justify-content-center">
        <NavDropdown title={title} id="nav-dropdown">
          <NavDropdown.Item>
            <strong>{current}</strong>
          </NavDropdown.Item>
          {[...topics, { slug: "All" }]
            .filter((topic) => topic.slug !== current)
            .map((topic) => (
              <NavDropdown.Item
                key={`${topic.slug}`}
                onClick={() => {
                  if (topic.slug !== "All") navigate(`/topics/${topic.slug}`);
                  else navigate("/");
                }}
              >
                {topic.slug}
              </NavDropdown.Item>
            ))}
        </NavDropdown>
      </Nav>
      <Articles topic={topic_slug} />
    </>
  );
};
