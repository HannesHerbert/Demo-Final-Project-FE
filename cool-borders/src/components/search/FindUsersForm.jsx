import useDebounce from "../../hooks/debounce.js";
import * as Styles from "../../services/styles.js";



function FindUsersForm({setSearch, search}) {
 
    return (
        <form className="w-full flex  items-center justify-center gap-8 mt-28">
            <input 
                className={`${Styles.input} w-2/5 text-center`}
                type="text" 
                id="find-user" 
                placeholder="username" 
                value={search} 
                onChange={e => setSearch(e.target.value)}
            />
        </form>
    )
}


export default FindUsersForm;