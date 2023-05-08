import ImageSlider from '../ImageSlider.jsx';
import axios from 'axios';

// CLOUDINARY
import CLOUD from "../../services/cloudinary.js";
import { AdvancedImage } from '@cloudinary/react';

// Import required actions and qualifiers.
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { useState, useEffect } from 'react';
import useAuthStore from '../../store/useAuthStore.js';
import { Link } from 'react-router-dom';
import useSearchStore from '../../store/useSearchStore.js';


function PostAdmin({ post }) {

    // Auth?
    const token = useAuthStore(state => state.getToken());

    // States
    const [currSlide, setCurrSlide] = useState(1);
    const [author, setAuthor] = useState(null);
    const [isInit, setIsInit] = useState(true);

    // search user by avatar click
    const setSearchUser = useSearchStore(state => state.setSearchUser);

    useEffect(() => {
        if(isInit) {
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
            publicId = "Asset-Images/anonym_bllrvm"

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

            let response = await axios.get(`http://localhost:8080/admin/user/${post.author}`, {
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

        // Container
        <div className="flex container justify-center items-center bg-zinc-900 py-10 rounded-2xl" id={post._id}>

            <div className=" container flex flex-col gap-7  justify-center items-center w-3/4 md:w-3/4 h-full rounded-md">

                {/* Section 1 mit Bilder */}
                {post.images.length > 0 && <span className='text-white'>{currSlide}/{post.images.length}</span>}
                <ImageSlider slides={post.images} setCurrSlide={setCurrSlide} />

                {/* Section 2 Mit Text content*/}
                <section className="text-justify flex flex-col w-full gap-5">

                    <div className="flex flex-row justify-between gap-2 mb-3">

                        {/* Profil image klickbar*/}
                        <div className="flex items-center">

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
                            <h3 className="ml-2 text-white text-xs font-bold ">{!author ? "User deleted" : author.fullname}</h3>
                        </div>

                        {/* Category */}
                        {post.category !== 'article' && <span className=" text-xs text-red-500">{post.category}</span>}
                    </div>

                    {/* TITLE */}
                    <h2 className='font-bold md:text-xl text-gray-200 ml-1'>{post.title}</h2>

                    {/* Text */}
                    <p className="text-xs md:text-lg text-gray-400 ml-1">
                        {post.text}
                    </p>


                </section>

            </div>

        </div>
    )
}

export default PostAdmin;