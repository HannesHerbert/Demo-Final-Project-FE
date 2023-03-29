import { useState } from "react";




function UserProfile() {
    // todo Store mit Zustand schreiben
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAuthor, setIsAuthor] = useState();
    const [isUser, setIsUser] = useState();


    // todo im authStore gucken ob admin oder author wenn 
    //todo wenn user - navigate zurück / zur fehlerseite
    //todo wenn author - 
    // todo wenn admin - 

    

    return (
        <>
            <div>Userdate</div>

            {isAdmin && <AdminDashboard />}
            {isAuthor && <AuthorDashboard />}

        </>
    )
}

export default UserProfile;