import { Articles } from "../Components/Articles"
import { useState } from "react";
import { useParams } from "react-router"

export const Home = ( ) => {

    const {topic_slug} = useParams();



    return (
        <>
            <h1>{topic_slug || 'All'} Articles</h1>
            <Articles topic={topic_slug}/>
        </>
    )
}
