import { useState } from "react"



function Create (){
    const [title, setTitle] = useState("");
    const [select, setSelect] = useState("");
    const [file, setFile] = useState("");

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleSelectChange = (event) => {
        setSelect(event.target.value);
    };

    const handleFileChange = (event) => {
        setFile(event.target.files);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
       
    };


    return (
        <>
            <h1 className="text-center text-3xl font-bold mb-6 font-mono text-orange-700">NEW POST</h1>
            <form onSubmit={handleSubmit} className="max-w-xs mx-auto w-full font-mono text-xs shadow-lg shadow-indigo-500/50 bg-gray-900 rounded-md p-4">
                
                <div className="mb-4">
                   
                    <input
                    type="text"
                    value={title}
                     onChange={handleTitleChange}
                    className="bg-slate-900  focus:caret-orange-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Title"   
                    required
                    />
                </div>
                <div>
                    <textarea name="content" id="content" cols="30" rows="10" className="w-full bg-slate-900  focus:caret-orange-500  shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline" placeholder="Create your content ..."></textarea>
                </div>

                <div className="mb-4">
                    <select value={select}onChange={handleSelectChange} className="bg-slate-900  focus:caret-orange-500  shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option value="">Select</option>
                    <option>Stories</option>
                    <option>Reviews</option>
                    <option>Market</option>
                    </select>
                </div>
               
                <div className=" mb-4 w-full">
                    
                    <input type="file" id="file" onChange={handleFileChange} className="mb-4 "/>
                    <input type="text" placeholder="Save Urls" className="bg-slate-900  focus:caret-orange-500  shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" />
                </div>
                <div className="flex flex-col items-center">
                    <button type="submit" className="w-40 bg-orange-900 font-bold hover:bg-orange-700 text-orange-100  py-2 px-4 rounded focus:outline-none focus:shadow-outline ease-in-out delay-150 bg-gradient-to-r from-orange-600  hover:-translate-y-1 hover:scale-110 duration-300">Create Post</button>

                </div>

            </form>
        </>
  
    )
}

export default Create;