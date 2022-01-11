import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"
import { useParams } from "react-router";

export const UserPage = () => {
    
    const {user} = useContext(UserContext);
    const {username} = useParams();


    return (
        <h1>{username}s page</h1>
    )
}
