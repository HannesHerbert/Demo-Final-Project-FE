
import { RiAlarmWarningLine } from 'react-icons/ri';
import { AiFillStar } from 'react-icons/ai';
import ImageSlider from '../../components/ImageSlider.jsx';
// CLOUDINARY
import CLOUD from "../../services/cloudinary.js";
import { AdvancedImage } from '@cloudinary/react';

// Import required actions and qualifiers.
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import Comment from '../comments/Comment.jsx';


function Favorite({fav}) {


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

    return (

        // Container
        <div className="flex container justify-center items-center ">
            
            <div className=" container flex flex-col gap-7  justify-center items-center w-3/4 md:w-3/4 h-full  rounded-md">

                <ImageSlider slides={fav.images} />

                {/* Section 2 */}
                <section className="text-justify flex flex-col w-full gap-5">

                    <div className="flex flex-row justify-between gap-2 mb-3">

                        <div className="flex items-center">
                            
                            <div className="relative shadow mx-auto h-10 w-10 border-white rounded-full overflow-hidden border-4">
                                {/* {<img className="object-cover w-full h-full" src={fav.author.image} alt="" />} */}
                                <AdvancedImage cldImg={profileImg} />
                            </div>
                            <h3 className="ml-2 text-white text-xs font-bold ">{fav.author.fullname}</h3>
                        </div>

                        <span className=" text-xs text-red-500">{fav.category}</span>
                    </div>
                    
                    <h2 className='md:text-sm text-gray-400 ml-1'>{fav.title}</h2>
                    <p className="text-xs md:text-sm text-gray-400 ml-1">
                            {fav.text}
                    </p>

                    <ul className='w-full bg-gray-500 text-gray-400  rounded-xl p-4 flex flex-col gap-5'>
                        <li className=" text-black ">Comments</li>
                        {fav.comments.map(comment => {
                            return <Comment key={comment._id} comment={comment} />
                        })}
                        <button className='bg-indigo-700 w-fit px-3 py-1 text-white rounded-md hover:bg-indigo-500 hover:text-black transition-colors duration-150'>Add comment</button>
                    </ul>
                   
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