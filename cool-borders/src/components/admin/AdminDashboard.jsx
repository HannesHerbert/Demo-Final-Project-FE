import UserManagement from "../../pages/UserManagement";
import {Link} from 'react-router-dom';


function AdminDashboard() {
    

    return (
        <div className="flex flex-col md:flex-row justify-center items-center">
            <button className="m-5 w-40 bg-orange-900 font-bold hover:bg-orange-700 text-orange-100  py-2 px-4 rounded focus:outline-none focus:shadow-outline ease-in-out delay-150 bg-gradient-to-r from-orange-600  hover:-translate-y-1 hover:scale-110 duration-300">
                Create Article
            </button>

            <button className="m-5 w-40 bg-orange-900 font-bold hover:bg-orange-700 text-orange-100  py-2 px-4 rounded focus:outline-none focus:shadow-outline ease-in-out delay-150 bg-gradient-to-r from-orange-600  hover:-translate-y-1 hover:scale-110 duration-300">
                <Link to='/usermanagement'>Manage Users</Link>
            </button>

            <button className="m-5 w-40 bg-orange-900 font-bold hover:bg-orange-700 text-orange-100  py-2 px-4 rounded focus:outline-none focus:shadow-outline ease-in-out delay-150 bg-gradient-to-r from-orange-600  hover:-translate-y-1 hover:scale-110 duration-300">
                Manage Content
            </button>
        </div>
    )
}


export default AdminDashboard;