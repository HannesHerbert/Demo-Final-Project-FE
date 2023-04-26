
import { RiAlarmWarningLine } from 'react-icons/ri';
import { AiFillStar } from 'react-icons/ai';
import ImageSlider from '../../components/ImageSlider.jsx';
// CLOUDINARY
import CLOUD from "../../services/cloudinary.js";
import { AdvancedImage } from '@cloudinary/react';

// Import required actions and qualifiers.
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { useState } from 'react';
import Comments from '../comments/Comments.jsx';


function Favorite({fav}) {
    // States
    const [showComments, setShowComments] = useState(false);
    const [currSlide, setCurrSlide] = useState(1)

    // CLOUDINARY
    const publicId = getImgPublicId(fav.author.image)
    const profileImg = CLOUD.image(publicId);
    profileImg.resize(thumbnail().width(50).height(50)).roundCorners(byRadius(50));

    function getImgPublicId(url) {

        let publicId

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

    function handleComments() {
        setShowComments(prev => prev = !prev)
    }


    return (

        // Container
        <div className="flex container justify-center items-center bg-zinc-900 py-10 rounded-2xl ">
            
            <div className=" container flex flex-col gap-7  justify-center items-center w-3/4 md:w-3/4 h-full rounded-md">
                {/* Section 1 mit Bilder */}
                <span className='text-white'>{currSlide}/{fav.images.length}</span>
                <ImageSlider slides={fav.images} setCurrSlide={setCurrSlide} />

                {/* Section 2 */}
                <section className="text-justify flex flex-col w-full gap-5">

                    <div className="flex flex-row justify-between gap-2 mb-3">
                        {/* Profil image */}
                        <div className="flex items-center">
                            
                            <div className="relative shadow mx-auto h-10 w-10 border-white rounded-full overflow-hidden border-4">
                                <AdvancedImage cldImg={profileImg} />
                            </div>
                            <h3 className="ml-2 text-white text-xs font-bold ">{fav.author.fullname}</h3>
                        </div>

                        {/* Category */}
                        <span className=" text-xs text-red-500">{fav.category}</span>
                    </div>

                    {/* TITLE */}
                    <h2 className='font-bold text-xl text-gray-200 ml-1'>{fav.title}</h2>

                    {/* Text */}
                    <p className="text-xs md:text-lg text-gray-400 ml-1">
                            {fav.text}
                    </p>

                    {/* KOMMENTARE */}
                    <div className='w-full bg-gray-500 rounded-xl'>
                        <h5 
                            className="w-full bg-gray-500 text-gray-900  rounded-xl p-4 cursor-pointer"
                            onClick={handleComments}
                        >
                            Comments
                        </h5>

                        {showComments && <Comments fav={fav} />}
                    </div>

                    {/* BUTTONS Zu Favs & REPORT */}
                    <div className="flex flex-row justify-between items-center mt-4 ml-1">
                        <AiFillStar className="text-2xl self-center text-gray-100 hover:text-yellow-400 active:text-yellow-400 cursor-pointer" />
                        <RiAlarmWarningLine className=" text-2xl text-gray-100  hover:text-red-600 active:text-red-600 self-end cursor-pointer" />
                    </div>


                </section>

            </div>

        </div>
    )
}

export default Favorite;