import axios from "axios";

const myApi = axios.create({
  baseURL: "https://adam-northcoders-news.herokuapp.com/api",
});

const fetch = async (path, parameters) => {
  const { data } = await myApi.get(`/${path}`, { params: parameters });
  return data;
};

const post = async (path, body) => {
  const { data } = await myApi.post(`/${path}`, body);
  return data;
};

const patch = async (path, inc = 1) => {
  const { data } = await myApi.patch(`/${path}`, { inc_votes: inc });
  return data;
};

const remove = async (path) => myApi.delete(`/${path}`);

export const fetchArticles = async (params) => await fetch("articles", params);

export const fetchArticleById = async (article_id) =>
  await fetch(`articles/${article_id}`);

export const fetchComments = async (article_id) =>
  await fetch(`articles/${article_id}/comments`);

export const fetchUserComments = async (username) =>
  await fetch(`users/${username}/comments`);

export const fetchUserArticles = async (username) => {
  const { articles } = await fetch(`articles`);
  return articles.filter((article) => article.username === username);
};

export const fetchTopics = async () => await fetch(`topics`);

export const fetchUsers = async () => await fetch(`users`);

export const fetchUser = async (username) => await fetch(`users/${username}`);

export const postUser = async (body) => await post("users", body);

export const deleteComment = async (comment_id) =>
  remove(`comments/${comment_id}`);

export const deleteArticle = async (article_id) =>
  remove(`articles/${article_id}`);

export const likeArticle = async (article_id, inc) =>
  patch(`articles/${article_id}`, inc);

export const likeComment = async (comment_id, inc) =>
  patch(`comments/${comment_id}`, inc);

export const postComment = async (article_id, body) =>
  await post(`articles/${article_id}/comments`, body);

export const postArticle = async (body) => await post(`articles`, body);

const formatTimeStamp = (timeStamp, getDate = true) => {
  const [year, month, other] = timeStamp.split("-");
  const [day, time] = [other.slice(0, 2), other.slice(3, 8)];
  return getDate ? `${day}/${month}/${year}` : time;
};

export const getDate = (timeStamp) => formatTimeStamp(timeStamp);

export const getTime = (timeStamp) => formatTimeStamp(timeStamp, false);

export const handleChange = (event, setThis) => setThis(event.target.value);

export const getStorageValue = (key, defaultValue) => {
  const saved = localStorage.getItem(key);
  const initial = JSON.parse(saved);
  return initial || defaultValue;
};
