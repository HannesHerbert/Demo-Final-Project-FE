import { useState } from "react";
import { Navigate } from "react-router-dom";
import AdminDashboard from "../components/admin/AdminDashboard";
import AuthorDashboard from "../components/author/AuthorDashBoard";
import News from "./News";




function Management() {

    // todo Store mit Zustand schreiben
    const [isAdmin, setIsAdmin] = useState();
    const [isUser, setIsUser] = useState();


    // todo im authStore gucken ob admin oder author wenn 
    //todo wenn user - navigate zurück / zur fehlerseite
    //todo wenn author - 
    // todo wenn admin - 



    return (
        <>
            {isUser && <Navigate to="/news"/>}
            {isAdmin ? <AdminDashboard /> : <AuthorDashboard />}

        </>
    )
}


export default Management;