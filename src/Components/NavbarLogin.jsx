import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { FaUserCircle } from "react-icons/fa";
import { Navbar } from "react-bootstrap";

export const NavbarLogin = ({ setShowUserPage }) => {
  const { user } = useContext(UserContext);

  return user.username ? (
    <>
      <Navbar.Text>{user.username} </Navbar.Text>
      <img
        src={user.avatar_url}
        style={{ width: "30px", height: "30px", borderRadius: "50%" }}
      />
    </>
  ) : (
    <>
      <Navbar.Text
        color="white"
        onClick={() => {
          setShowUserPage(true);
          console.log("yes");
        }}
      >
        Sign in{" "}
      </Navbar.Text>
      <FaUserCircle
        className="text-muted"
        placemenet="end"
        className="justify-content-end "
      />
    </>
  );
};
