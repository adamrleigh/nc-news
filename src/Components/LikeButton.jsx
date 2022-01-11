import { FaRegThumbsUp } from 'react-icons/fa';
import { Button } from 'react-bootstrap'; 
import { useState } from 'react';

export const LikeButton = ( {votes, clickFunc} ) => {

    const [liked, setLiked] = useState(false);

    return (
        <>
        {clickFunc 
        ? <Button variant="primary" onClick={clickFunc} ><FaRegThumbsUp /> {votes}</Button>
        : <Button variant="primary" disabled ><FaRegThumbsUp /> {votes}</Button>
    }
        </>
    )
}



