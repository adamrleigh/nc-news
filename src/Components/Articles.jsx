import { useState, useEffect } from "react";
import { Form, Row } from "react-bootstrap";
import { fetchArticles } from "../Utils/api"
import { ArticlePreview } from "./ArticlePreview";
import { LoadingSpinner } from "./LoadingSpinner";
import { Error } from "../pages/Error";


export const Articles = ( {topic, author} ) => {

    const [articles, setArticles] = useState([]);
    const [topicError, setTopicError] = useState(false);
    const [sortBy, setSortBy] = useState("created_at");
    const [orderBy, setOrderBy] = useState("desc");
    const [loading, setLoading] = useState(true);

    
    useEffect(async () => {
    try {
        const {articles} = await fetchArticles({
            topic: topic,
            sort_by: sortBy,
            order: orderBy
        })
        if (author) setArticles(articles.filter(article=> article.author === author));
        else setArticles(articles);
        setTopicError(false);
        setLoading(false);
    }
    catch {
        setTopicError(true);
        setLoading(false);
    }
    }, [topic, sortBy, orderBy]);

    return (
        <>
        {loading 
        ? <LoadingSpinner />
        :
        <>
        {articles.length
        ? <>
        <Form onChange={(event)=>setSortBy(event.target.value)}>
            <Form.Label>Sort by: </Form.Label>
            <div key={`inline-radio`} className="mb-3">
        <Form.Check
        inline
        label="Date"
        value="created_at"
        name="group1"
        type='radio'
        id={`inline-1`}
      />
      <Form.Check
        inline
        label="Likes"
        value="votes"
        name="group1"
        type='radio'
        id={`inline-2`}
      />
      <Form.Check
        inline
        label="Comments"
        value="comment_count"
        name="group1"
        type='radio'
        id={`inline-radio-3`}
      />
            </div>
        </Form>
        <Form onChange={(event)=>setOrderBy(event.target.value)}>
            <Form.Label>Order by: </Form.Label>
            <div key={`inline-radio-2`} className="mb-3">
        <Form.Check
        inline
        label="Descending"
        value="desc"
        name="group2"
        type='radio'
        id='inline-order-desc'
      />
      <Form.Check
        inline
        label="Ascending"
        value="asc"
        name="group2"
        type='radio'
        id='inline-order-asc'
      />
            </div>
        </Form>
        <Row lg={1} className="g-4">
                {articles.map(article => 
                    <ArticlePreview article={article}/>
                )}
        </Row>
        </>
        : <h4>No articles found</h4>
        }
        </>
}
</>
        )

}
