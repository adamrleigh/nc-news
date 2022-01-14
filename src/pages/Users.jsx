import { LoadingSpinner } from "../Components/LoadingSpinner";
import { fetchUsers } from "../Utils/api";
import { Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { UserPage } from "./UserPage";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    try {
      const { users } = await fetchUsers();
      setUsers(users);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }, []);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Row xs={3} className="g-4">
            {users.map((user) => (
              <UserPage user={user} key={user.username} />
            ))}
          </Row>
        </>
      )}
    </>
  );
};
