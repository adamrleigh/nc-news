import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { FaSignInAlt } from "react-icons/fa";
import { Navbar } from "react-bootstrap";

export const NavbarLogin = ({ setShowUserPage }) => {
  const { user } = useContext(UserContext);

  return user.username ? (
    <>
      <Navbar.Text>{user.username} </Navbar.Text>
      <img
        src={user.avatar_url}
        style={{ width: "30px", height: "30px", borderRadius: "50%" }}
        alt={`${user.username}'s avatar`}
      />
    </>
  ) : (
    <>
      <Navbar.Text
        color="white"
        onClick={() => {
          setShowUserPage(true);
        }}
      >
        Sign in{" "}
      </Navbar.Text>
      <FaSignInAlt
        placemenet="end"
        className="justify-content-end "
        style={{ color: "white" }}
      />
    </>
  );
};
