import { FaRegThumbsUp } from 'react-icons/fa';
import { ToggleButton } from 'react-bootstrap'; 
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export const LikeButton = ( {votes, onClick} ) => {

    const {user} = useContext(UserContext);

    return (
        <>
        {user
        ? <ToggleButton type="checkbox" variant="primary" onClick={onClick}><FaRegThumbsUp /> {votes}</ToggleButton>   
        : <ToggleButton type="checkbox" variant="primary" disabled><FaRegThumbsUp /> {votes}</ToggleButton> 
        }
        </>
    )
}



