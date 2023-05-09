import { Link } from "react-router-dom";
import useSearchStore from "../../store/useSearchStore";




function UserPost({post}) {
    const setSearchPost = useSearchStore(state => state.setSearchPost)
 
    return (
        <button onClick={() => setSearchPost(post)} className="h-fit cursor-pointer">
            <Link to={`/posts/${post.title}`} > 
                <img className="w-full h-28 md:h-48 object-cover" src={post.images[0]} alt={post.title} />
            </Link>
            
        </button>
    )
}


export default UserPost;