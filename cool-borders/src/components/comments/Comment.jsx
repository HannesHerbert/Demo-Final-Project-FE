


function Comment({comment}) {
    console.log(comment);

    return (
        <li className="px-5 py-3 bg-gray-800 rounded-xl">
            <span className="text-gray-500">{comment.author.fullname}</span>
            <li className="px-5 py-3 bg-gray-800">{comment.text}</li>
        </li>
    )
}

export default Comment;