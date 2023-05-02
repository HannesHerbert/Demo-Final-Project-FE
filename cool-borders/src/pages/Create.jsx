import { useState } from "react"



function Create() {
    const [title, setTitle] = useState("");
    const [select, setSelect] = useState("");
    const [file, setFile] = useState("");


    const handleSubmit = (event) => {
        event.preventDefault();

    };


    return (
        <>
            {/* <h1 className="text-center text-3xl mb-6 text-title font-bold text-orange-500">New Post</h1> */}
            <form onSubmit={handleSubmit} className="mx-auto w-full md:w-1/3 font-sans text-xs md:text-sm shadow-lg shadow-gray-900/50 bg-black rounded-md p-4">

                <div className="mb-4">

                    <input
                        type="text"
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                        className="bg-slate-900  focus:caret-orange-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Title"
                        required
                    />
                </div>
                <div>
                    <textarea name="content" id="content" cols="30" rows="10" className=" bg-slate-900  focus:caret-orange-500  shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline" placeholder="Create your content ..."></textarea>
                </div>

                <div className="mb-4">
                    <select value={select} onChange={event => setSelect(event.target.value)} className="bg-slate-900  focus:caret-orange-500  shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option >Select</option>
                        <option>Stories</option>
                        <option>Reviews</option>
                        <option>Market</option>
                    </select>
                </div>

                <div className=" mb-4 w-full">

                    <input type="file" id="file" value={file} onChange={event => setFile(event.target.files)} className="mb-4 bg-gray-400 cursor-pointer" />
                    <input type="text" placeholder="Save Urls" className="bg-slate-900  focus:caret-orange-500  shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" />
                </div>
                <div className="flex flex-col items-center">
                    <button type="submit" className="w-full bg-indigo-500 font-bold  text-white py-2 px-4 focus:outline-none focus:shadow-outline ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300 rounded-full">Create Post</button>

                </div>

            </form>
        </>

    )
}

export default Create;