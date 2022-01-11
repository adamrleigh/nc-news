import axios from 'axios';

const myApi = axios.create({
    baseURL: "https://adam-northcoders-news.herokuapp.com/api"
})

const fetch = async (path, parameters) => {
    const {data} = await myApi.get(`/${path}`,{params: parameters});
    return data;
}

export const fetchArticles = async (params) => 
await fetch('articles', params);


export const fetchArticleById = async (article_id) => 
await fetch(`articles/${article_id}`);


export const fetchComments = async (article_id) => 
await fetch(`articles/${article_id}/comments`);

export const fetchTopics = async () => 
await fetch(`topics`);



const formatTimeStamp = (timeStamp, getDate=true) => {
    const [year, month, other] = timeStamp.split('-');
    const [day, time] = [other.slice(0,2), other.slice(3, 8)];
    return getDate 
    ? `${day}/${month}/${year}`
    : time;
}

export const getDate = (timeStamp) => 
formatTimeStamp(timeStamp);

export const getTime = (timeStamp) => 
formatTimeStamp(timeStamp, false);


export const handleChange = (event, setThis) =>
    setThis(event.target.value)