import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../components/post/Post";


function News() {
  // State
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchNews();
    console.log(articles);
  }, []);

  // LAZY LOADING....
  // let options = {
  //   root: document.querySelector('#layout'),
  //   rootMargin: '0px',
  //   threshold: 1.0
  // }

  // let observer = new IntersectionObserver(fetchNews, options);
  // let target = <div id="trigger-div" className="w-full h-10"></div>;
  // console.log(target);
  // observer.observe(target);
  // ----------------------------------

  async function fetchNews(entries, observer) {
    try {
      let resp = await axios.get('http://localhost:8080/public/articles/' + articles?.length);
      // speichere articles in state
      console.log(resp);

      if (articles.length > 0) {
        setArticles(prev => [
          ...prev, 
          resp.data.data
        ]);
      } else {
        setArticles(resp.data.data)
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
      /* Render News */
      <div className="flex flex-col justify-center items-center p-2 w-full h-fit gap-14">

        {articles?.map(article => {
          return <Post key={article._id} post={article} />
        })}

        <div id="trigger-div" className="w-full h-10"></div>
  
      </div>
  );
};


export default News;