import Comment from "./Comment"
import * as Styles from "../../services/styles.js";
import { useRef, useState } from "react";
import axios from "axios";
import useAuthStore from "../../store/useAuthStore";
import useFavoritesStore from "../../store/useFavoritesStore";


function Comments({post}) {
    const token = useAuthStore(state => state.getToken());
    const commentText = useRef();
    const fetchFavorites = useFavoritesStore(state => state.fetchFavorites);




    // Sende neues Kommentar zur DB und fetche favorites neu
    async function addCommentSubmitHandler(e) {
        e.preventDefault();
        // prüfe ob comment field nicht leer ist
        if (commentText.current.value.trim().length < 1) {
            return;
        }
        // erstelle body 
        let commentBody = {
            text: commentText.current.value
        }
        try {
            // server post anfrage um das neue Kommentar zu erstellen
            await axios.post('http://localhost:8080/protected/comments/' + post._id, commentBody, {
                headers: {
                    'Authorization': `Bearer ${token}`
                  }  
            });
            // rerender favorites
            fetchFavorites();
            // Input feld leer machen
            commentText.current.value = '';

        } catch (error) {
            console.log(error);
        }
    }

    return (
        // Kommentar liste
        <ul className='w-full bg-gray-500 text-gray-400  rounded-xl p-4 flex flex-col gap-5'>
            {/* render alle Kommentare */}
            {post.comments.map(comment => {
                return <Comment key={comment._id} comment={comment} c />
            })}
            {/* Add Komment Form */}
            <form 
                className="flex flex-col gap-3"
                onSubmit={addCommentSubmitHandler}
                >
                    {/* BUTTON */}
                <button type="submit" className='bg-indigo-700 w-fit px-3 py-1 text-white rounded-md hover:bg-indigo-500 hover:text-black transition-colors duration-150'
                >Add comment
                </button>

                {/* Text Feld von Kommentar */}
                <textarea 
                    className="bg-gray-800 w-full rounded-lg py-2 px-3 text-gray-200 leading-tight outline-none"
                    name="comment-input" 
                    id="comment-input" 
                    cols="1" 
                    rows="3"
                    ref={commentText}
                ></textarea>
            </form>
            
        </ul>
    )
}

export default Comments;