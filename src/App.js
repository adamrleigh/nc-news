import './App.css';
import { Navigation } from './Components/Navigation';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { SingleArticle } from './pages/SingleArticle';
import { Home } from './pages/Home';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {fetchTopics} from "./Utils/api"
import {Error} from "./pages/Error"
import {UserContext} from "./contexts/UserContext"
import {UserPage} from "./pages/UserPage"

function App() {

  const [user, setUser] = useState({});
  const [topics, setTopics] = useState([]);
  const [topicsError, setTopicsError] = useState(false)

  useEffect(async () => {
        try {
        const {topics} = await fetchTopics();
        setTopics(topics);
        setTopicsError(false);
        }
        catch {
          setTopicsError(true);
        }
    }, []);


  return (
    <UserContext.Provider value={{user, setUser}}>
    <div className="App">
      <BrowserRouter>
      <Navigation topics={topics}/>
        <Routes>
          <Route 
            path="/"
            element={<Home />} />
          <Route 
            path="/*"
            element={<Error />} />
          <Route 
            path="/login"
            element={<Login />} />
            <Route 
            path="/register"
            element={<Register />} />
            <Route 
            path="/topics/:topic_slug"
            element={<Home />} />
            <Route 
            path="/articles/:article_id"
            element={<SingleArticle />} />
            <Route
            path="/users/:username"
            element={<UserPage />} />
        </Routes>
      </BrowserRouter>
    </div>
    </UserContext.Provider>
  );
}

export default App;
