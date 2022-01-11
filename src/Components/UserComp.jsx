import { LinkContainer } from 'react-router-bootstrap';

export const UserComp = ( {user, disabled} ) => {

    return (
        <>
        <h6>{user.name}</h6>
        {!disabled 
        ?
        <LinkContainer to={`/users/${user.username}`}>
        <h6>@{user.username}</h6>
        </LinkContainer>
        :  <h6>@{user.username}</h6>
}
        <img src={user.avatar_url} style={{width: "50px"}}></img>
        </>
    )
}
