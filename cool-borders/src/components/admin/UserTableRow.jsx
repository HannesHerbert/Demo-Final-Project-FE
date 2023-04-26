import { BsChevronUp, BsChevronDown } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import CLOUD from "../../services/cloudinary.js";
import { AdvancedImage } from '@cloudinary/react';

// Import required actions and qualifiers.
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";



export function UserTableRow(props) {

    const user = props.user;
    const [isDetailView, setIsDetailView] = useState(false);
    const [chevron, setChevron] = useState(<BsChevronDown />);

    const publicId = getImgPublicId(user.image)
    const profileImg = CLOUD.image(publicId);
    profileImg.resize(thumbnail().width(50).height(50)).roundCorners(byRadius(50));

    useEffect(() => {
        setChevron(isDetailView ? <BsChevronUp /> : <BsChevronDown />)
    }, [isDetailView])


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


    function handleShowDetails() {
        setIsDetailView(!isDetailView)
    }


    return (
        <>
            <tr className="even:bg-gray-100 odd:bg-white border-b" key={user._id}>
                <td className="p-1 flex justify-center bg-opacity-0"><AdvancedImage cldImg={profileImg} /></td>
                <td className="border-l text-left p-1 " colSpan="2"><b>{user.username}</b></td>
                <td className="border-l">{user.role}</td>
                <td className="border-l">1</td>
                <td className="border-l">1</td>
                <td className="border-l">
                    <button onClick={handleShowDetails} className="flex align-middle justify-center w-full">
                        {chevron}
                    </button>
                </td>
            </tr>
            <tr className={`even:bg-gray-100 odd:bg-white ${isDetailView ? null : 'hidden'}`}>
                <td className="table-span" colSpan="7">
                    <div className="w-full p-3 text-left">
                        <div className="w-full flex justify-between">
                            <p>Fullname: {user.fullname}</p>
                            <p>Last Login: {user.lastLogin === undefined ? "n/a" : user.lastLogin}</p>
                        </div>
                        <p>eMail: {user.email}</p>
                        <p className="underline mt-3">Description:</p>

                        <div className="w-full flex justify-between">

                            <div className="w-full flex">
                                <p className="mr-2">Preferred Stance:</p>
                                <p>{user.description === undefined ? "n/a" : user.description.prefStance}</p>
                            </div>

                            <div className="w-full flex justify-end">
                                <p className="mr-2">Style:</p>
                                <p>{user.description === undefined ? "n/a" : user.description.style}</p>
                            </div>

                        </div>

                        <div className="w-full flex">
                            <p className="mr-2">Equipment:</p>
                            <p>{user.description === undefined ? "n/a" : user.description.equipment}</p>
                        </div>

                        <div className="w-full flex">
                            <p className="mr-2">Favorite Locations:</p>
                            <p>{user.description === undefined ? "n/a" : user.description.favLocations}</p>
                        </div>

                        <p className="underline mt-3">About me:</p>
                        <div className="w-full text-center border">{user.description === undefined ? "n/a" : user.description.text}</div>

                        <div className="w-full flex justify-end mt-3">
                            <button className="w-auto px-3 mr-2 rounded-full p-1 text-gray-200 bg-indigo-500 hover:bg-white hover:text-indigo-600">Edit</button>
                            <button className="w-auto px-3 rounded-full p-1 text-gray-200 bg-indigo-500 hover:bg-white hover:text-indigo-600">Delete</button>
                        </div>
                    
                    </div>
                </td>
            </tr>
        </>
    )
};


export default UserTableRow;