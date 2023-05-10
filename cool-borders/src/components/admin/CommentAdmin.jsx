// CLOUDINARY
import CLOUD from "../../services/cloudinary.js";
import { AdvancedImage } from "@cloudinary/react";
// Import required actions and qualifiers.
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { Link } from "react-router-dom";
import useSearchStore from "../../store/useSearchStore.js";
import useAuthStore from "../../store/useAuthStore.js";
import { useState, useEffect } from "react";
import axios from "axios";



function CommentAdmin({ comment }) {

    const token = useAuthStore(state => state.getToken());
    const [author, setAuthor] = useState(null);
    const [isInit, setIsInit] = useState(true);
    const setSearchUser = useSearchStore(state => state.setSearchUser);

    useEffect(() => {
        if (isInit) {
            getAuthor(),
            setIsInit(false)
        }
    }, []);

    // CLOUDINARY
    let publicId
    let profileImg
    if (author !== null) {
        publicId = getImgPublicId(author.image)
        profileImg = CLOUD.image(publicId);
        profileImg.resize(thumbnail().width(50).height(50)).roundCorners(byRadius(50));
    } else {
        publicId = getImgPublicId("https://res.cloudinary.com/djiwww2us/image/upload/v1683293216/Asset-Images/deleted_user_pdfhxh.png")
        profileImg = CLOUD.image(publicId);
        profileImg.resize(thumbnail().width(50).height(50)).roundCorners(byRadius(50));
    };

    function getImgPublicId(url) {

        let publicId;

        if (!url || url.length < 1) {
            // Setzt Default Image aus Asset-Ordner (Cloudinary)
            publicId = "Asset-Images/anonym_bllrvm";
        } else {
            // Sucht nach dem zweitletzten "/" und speichert dessen Index
            const secondLastSlashIndex = url.lastIndexOf('/', url.lastIndexOf('/') - 1);
            // Extrahiert den Teilstring zwischen dem zweitletzten "/" und dem letzten "."
            publicId = url.substring(secondLastSlashIndex + 1, url.lastIndexOf('.'));
        }
        // Gibt den extrahierten Dateinamen zurück
        return publicId;
    };


    async function getAuthor() {
        try {

            let response = await axios.get(`http://localhost:8080/admin/user/${comment.author}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            setAuthor(response.data.data);

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <li className="relative px-5 py-3 bg-gray-800 rounded-xl flex flex-col gap-5 text-xs md:text-lg">

            <div className="flex items-center gap-3">

                {/* author image klickbar */}
                {author === null ?
                    <div
                        className="relative shadow mx-auto h-10 w-10 border-white rounded-full overflow-hidden border-4">
                        <AdvancedImage cldImg={profileImg} />
                    </div>
                    :

                    <div
                        className="relative shadow mx-auto h-10 w-10 border-white rounded-full overflow-hidden border-4 hover:border-green-400"
                        onClick={() => {
                            setSearchUser(author)
                        }}
                    >
                        <Link to={`/users/${author.username}`} >
                            <AdvancedImage cldImg={profileImg} />
                        </Link>

                    </div>
                }

                {/*  author name */}
                <span className="text-gray-500">{!author ? "User deleted" : author.fullname}</span>

                <span className="px-3  bg-gray-800 ">{comment.text}</span>

            </div>
        </li>
    )
}

export default CommentAdmin;