



function UserPost({post}) {
    
    console.log(post);

    return (
        <div className="h-full ">
            <img className="w-full h-36 md:h-48  object-cover" src={post.images[0]} alt={post.title} />
        </div>
    )
}


export default UserPost;