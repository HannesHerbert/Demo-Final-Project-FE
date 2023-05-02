import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../components/post/Post";
import useAuthStore from "../store/useAuthStore";


function News() {
  // State
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {
    try {
      let resp = await axios.get('http://localhost:8080/public/articles');
      // speichere articles in state
      setArticles(resp.data.data)
    } catch (error) {
      console.log(error);
    }
  }

  return (
      /* Render News */
      <div className="flex flex-col justify-center items-center p-2 w-full h-fit gap-14">

        {articles.map(article => {
          return <Post key={article._id} post={article} />
        })}
  
      </div>
  );
};


export default News;