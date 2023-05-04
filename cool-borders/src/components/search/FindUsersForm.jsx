import * as Styles from "../../services/styles.js";



function FindUsersForm({setSearch, search, setCategory, category}) {

    function searchCategoryHandler(category) {
        setSearch('');
        setCategory(category);
    }
 
    return (
        <div className="w-full flex flex-col items-center justify-center gap-8 mt-28">
                {/* Search category Buttons */}
            <div className="text-gray-400 flex gap-10 ">
                <button onClick={() => searchCategoryHandler('user')} className="">Users</button>
                <button onClick={() => searchCategoryHandler('news')} className="">News</button>
                <button onClick={() => searchCategoryHandler('blogs')} className="">Blogs</button>
            </div>
            {/* Form mit input */}
            <form className="w-full flex justify-center">

                <input 
                    className={`${Styles.input} w-2/5 text-center`}
                    type="text" 
                    id="find-user" 
                    placeholder={category === "user" ? 'username' : 'title'} 
                    value={search} 
                    onChange={e => setSearch(e.target.value)}
                />
            </form>
        </div>
    )
}


export default FindUsersForm;