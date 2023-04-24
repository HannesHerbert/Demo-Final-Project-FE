import FoundUsersList from "../components/search/FoundUsersList";
import FindUsersForm from "../components/search/FindUsersForm";




function Search() {
    
    

    

    return (
        <div className="container h-full flex flex-col items-center gap-10 ">

            <FindUsersForm />

            <FoundUsersList  />


        </div>
    )
}



export default Search;