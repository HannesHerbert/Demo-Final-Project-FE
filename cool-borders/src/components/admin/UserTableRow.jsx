import CLOUD from "../../services/cloudinary.js";
import { AdvancedImage } from '@cloudinary/react';

// Import required actions and qualifiers.
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";



export function UserTableRow(props) {

    const user = props.user;

    const publicId = getImgPublicId(user.image)

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
        <>
            <tr className="even:bg-gray-100 odd:bg-white border-b" key={user._id}>
                <td className="p-1 flex justify-center"><AdvancedImage cldImg={profileImg} /></td>
                <td className="border-l" colspan="2"><p>{user.username}</p><p>{user.email}</p></td>
                <td className="border-l">{user.role}</td>
                <td className="border-l">1</td>
                <td className="border-l">1</td>
            </tr>
            <tr className="even:bg-gray-100 odd:bg-white">
                <td className="table-span" colSpan="6">Inhalt</td>
            </tr>
        </>
    )
};


export default UserTableRow;