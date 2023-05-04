// import { RiAlarmWarningLine } from 'react-icons/ri';
import { AiFillStar } from 'react-icons/ai';
import {VscWarning} from 'react-icons/vsc';
import ImageSlider from '../../components/ImageSlider.jsx';
// CLOUDINARY
import CLOUD from "../../services/cloudinary.js";
import { AdvancedImage } from '@cloudinary/react';

// Import required actions and qualifiers.
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { useEffect, useState } from 'react';
import Comments from '../comments/Comments.jsx';
import axios from 'axios';
import usePostsStore from '../../store/usePostsStore.js';
import useAuthStore from '../../store/useAuthStore.js';
import useReportStore from '../../store/useReportStore.js';
import useUserSearchStore from '../../store/useUserSearchStore.js'
import { Link } from 'react-router-dom';


function Post({post}) {
    // States
    const [showComments, setShowComments] = useState(false);
    const [currSlide, setCurrSlide] = useState(1);
    const [favStyleToggle, setFavStyleToggle] = useState(false);
    const [favStyle, setFavStyle] = useState('text-gray-100');

    // report Store
    const sendReport = useReportStore(state => state.sendReport);
    // search user by avatar click
    const setSearchUser = useUserSearchStore(state => state.setSearchUser);
    
    // token
    const token = useAuthStore(state => state.getToken());
    // fetchFavs
    const fetchFavorites = usePostsStore(state => state.fetchFavorites);
    // Auth?
    const isAuthenticated = useAuthStore(state => state.isAuthenticated());
    // user
    const updateUser = useAuthStore(state => state.updateUser)
    // const favorites = usePostsStore(state => state.favorites);
    const user = useAuthStore(state => state.user);
    // CLOUDINARY
    const publicId = getImgPublicId(post.author.image)
    const profileImg = CLOUD.image(publicId);
    profileImg.resize(thumbnail().width(50).height(50)).roundCorners(byRadius(50));

    function getImgPublicId(url) {
        // CLOUDINARY
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
    // Schalter für Kommentare zeigen/ausblenden
    function handleComments() {
        setShowComments(prev => prev = !prev);
    }


    useEffect(() => {
        if (isAuthenticated) {
            if (user.favorites.includes(post._id)) {
                setFavStyle('text-green-500');
            } else {
                setFavStyle('text-gray-100');
            }
        }
    }, [favStyleToggle]);

    async function toggleToFavorites() {

        try {
            let user = await axios.put('http://localhost:8080/protected/favorites/' + post._id, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                  }  
            });
            // update userdata im userStore
            updateUser(user.data.data)
            // rerender favorites
            fetchFavorites();

            setFavStyleToggle(prev => prev = !prev);
        } catch (error) {
            console.log(error);
        }
    }


    return (

        // Container
        <div className="flex container justify-center items-center bg-zinc-900 py-10 rounded-2xl">
            
            <div className=" container flex flex-col gap-7  justify-center items-center w-3/4 md:w-3/4 h-full rounded-md">
                {/* Section 1 mit Bilder */}
                {post.images.length > 0 && <span className='text-white'>{currSlide}/{post.images.length}</span>}
                <ImageSlider slides={post.images} setCurrSlide={setCurrSlide} />

                {/* Section 2 Mit Text content*/}
                <section className="text-justify flex flex-col w-full gap-5">

                    <div className="flex flex-row justify-between gap-2 mb-3">
                        {/* Profil image klickbar*/}
                        <div className="flex items-center">
                            
                            <div 
                                className="relative shadow mx-auto h-10 w-10 border-white rounded-full overflow-hidden border-4"
                                onClick={() => setSearchUser(post.author)}
                            >
                                <Link to={`/users/${post.author.username}`} >
                                    <AdvancedImage cldImg={profileImg} />
                                </Link>

                            </div>
                            <h3 className="ml-2 text-white text-xs font-bold ">{post.author.fullname}</h3>
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

                    {/* KOMMENTARE */}
                    {  isAuthenticated &&                  
                        <div className='w-full bg-gray-500 rounded-xl'>
                            <h5 
                                className="w-full bg-gray-500 text-gray-900  rounded-xl p-4 cursor-pointer"
                                onClick={handleComments}
                            >
                                Comments
                            </h5>

                            {showComments && <Comments post={post} />}
                        </div>
                    }

                    {/* BUTTONS Zu Favs & REPORT */}
                        {     
                        isAuthenticated &&               
                        <div className="flex flex-row justify-between items-center mt-4 ml-1">
                            <AiFillStar
                            onClick={toggleToFavorites}
                            className={`${favStyle} text-2xl self-center  hover:text-yellow-400 active:text-yellow-400 cursor-pointer `}
                            />
                            <VscWarning 
                            onClick={() => sendReport(post.type, post._id)}
                            className=" text-2xl text-gray-100  hover:text-red-600 active:text-red-600 self-end cursor-pointer" 
                            />
                        </div>
                    }

                </section>

            </div>

        </div>
    )
}

export default Post;