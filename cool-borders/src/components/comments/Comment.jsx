// CLOUDINARY
import CLOUD from "../../services/cloudinary.js";
import { AdvancedImage } from "@cloudinary/react";
// Import required actions and qualifiers.
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";

function Comment({comment}) {

     // CLOUDINARY
     const publicId = getImgPublicId(comment.author.image)
     const profileImg = CLOUD.image(publicId);
     profileImg.resize(thumbnail().width(50).height(50)).roundCorners(byRadius(50));
 
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

    return (
        <li className="px-5 py-3 bg-gray-800 rounded-xl flex flex-col gap-5">
            {/* Commentator image , name and text*/}
            <div className="flex items-center gap-3">
                <div className="h-8 w-8 border-white rounded-full overflow-hidden border-4">
                    <AdvancedImage cldImg={profileImg} />
                </div>
                <span className="text-gray-500">{comment.author.fullname}</span>
            </div>
            <span className="px-3  bg-gray-800 ">{comment.text}</span>
        </li>
    )
}

export default Comment;