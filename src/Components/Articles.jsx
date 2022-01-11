import { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import { fetchArticles } from "../Utils/api"
import { ArticlePreview } from "./ArticlePreview";
import { LoadingSpinner } from "./LoadingSpinner";
import { Error } from "../pages//Error";


export const Articles = ( {topic} ) => {

    const [articles, setArticles] = useState([]);
    const [topicError, setTopicError] = useState(false);
    
    useEffect(async () => {
    try {
        const {articles} = await fetchArticles({topic: topic})
        setArticles(articles);
        setTopicError(false);
    }
    catch {
        setTopicError(true);
    }
    }, [topic]);

    return (
            <>
            {topicError 
            ? <Error thing={`${topic} articles`}/>
            : articles.length
            ? <Row lg={1} className="g-4">
                {articles.map(article => 
                    <ArticlePreview article={article}/>
                )}
            </Row>
            : <><h4>Loading articles...</h4><LoadingSpinner /></>
            }
            </>
    )
}
