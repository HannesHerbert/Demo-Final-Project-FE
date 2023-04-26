import Comment from "./Comment"



function Comments({fav}) {
    

    return (
        <ul className='w-full bg-gray-500 text-gray-400  rounded-xl p-4 flex flex-col gap-5'>
            
            {fav.comments.map(comment => {
                return <Comment key={comment._id} comment={comment} c />
            })}
            <button className='bg-indigo-700 w-fit px-3 py-1 text-white rounded-md hover:bg-indigo-500 hover:text-black transition-colors duration-150'>Add comment</button>
            
        </ul>
    )
}

export default Comments;