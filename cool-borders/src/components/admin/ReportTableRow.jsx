import { BsChevronUp, BsChevronDown } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import useNotificationStore from "../../store/useNotificationStore";
import axios from 'axios';
import useAuthStore from "../../store/useAuthStore";

// Clodinary
import CLOUD from "../../services/cloudinary.js";
import { AdvancedImage } from '@cloudinary/react';
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";



export function ReportTableRow(props) {

    const report = props.report;
    const token = useAuthStore(state => state.getToken());
    const [isDetailView, setIsDetailView] = useState(false);
    const [chevron, setChevron] = useState(<BsChevronDown />);
    const [isDelete, setIsDelete] = useState(false);
    const date = getDateString(report.createdAt);
    const time = getTimeString(report.createdAt);

    const publicId = getImgPublicId(report.reportedBy.image);
    const profileImg = CLOUD.image(publicId);
    profileImg.resize(thumbnail().width(50).height(50)).roundCorners(byRadius(50));

    useEffect(() => {
        setChevron(isDetailView ? <BsChevronUp /> : <BsChevronDown />)
    }, [isDetailView]);


    // Notification Handler function
    const notificationHandler = useNotificationStore(state => state.notificationHandler);

    // Wenn die Daten zum Server korrekt gesendet sind, wird ein Alert mit Success erzeugt
    function alertSuccessHandler(msg) {
        notificationHandler('success', msg)
    }
    // Wenn bei register ein Fehler, wird ein Alert mit Fehlermeldung erzeugt
    function alertFailHandler(msg) {
        notificationHandler('fail', msg)
    }


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
    };


    function toggleDeleteModal() {
        setIsDelete(isDelete => !isDelete)
    };


    function getDateString(date) {
        
        const dateObj = new Date(date);
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDay();

        const dateString = `${day < 10 ? 0 : ""}${day}.${month < 10 ? 0 : ""}${month}.${year}`

        return dateString
    };


    function getTimeString(date) {
        
        const dateObj = new Date(date);
        const hour = dateObj.getHours();
        const min = dateObj.getMinutes();
        const sec = dateObj.getSeconds();

        const timeString = `${hour < 10 ? 0 : ""}${hour}:${min < 10 ? 0 : ""}${min}:${sec < 10 ? 0 : ""}${sec}`

        return timeString
    };


    async function deleteReport() {

        try {
            const response = await axios.delete(`http://localhost:8080/protected/report/${report._id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            toggleDeleteModal();

            // display eine 'SUCCESS' Meldung und navigiere zu Login
            alertSuccessHandler(`Report was deleted!`);

        } catch (error) {

            console.log(error);
            // Display eine Fehlermeldung
            // alertFailHandler(error.response.message);
        }
    }


    return (
        <>
            <tr className="even:bg-gray-100 odd:bg-white border-b" key={report._id}>
                <td className="p-1 flex justify-center bg-opacity-0"><AdvancedImage cldImg={profileImg} /></td>
                <td className="border-l text-left p-1 " colSpan="2"><b>{report.reportedBy.username}</b></td>
                <td className="border-l">{report.docModel}</td>
                <td className="border-l">{date} <br/> {time}</td>
                <td className="border-l"  colSpan="2">{report.reasonText}</td>
                <td className="border-l">
                    <button onClick={handleShowDetails} className="flex align-middle justify-center w-full">
                        {chevron}
                    </button>
                </td>
            </tr>
            <tr className={`even:bg-gray-100 odd:bg-white ${isDetailView ? null : 'hidden'}`}>
                <td className="table-span" colSpan="8">
                    <div className="w-full p-3 text-left">
                        
                        {isDelete ?
                            (
                                <div className="bg-white w-full flex items-center mt-3">
                                    <p className="w-full">Are you sure you want to delete this report?</p>
                                    <button onClick={toggleDeleteModal} className="w-auto px-3 mr-2 rounded-full p-1 text-gray-200 bg-indigo-500 hover:bg-white hover:text-indigo-600">Cancel</button>
                                    <button onClick={deleteReport} className="w-auto px-3 rounded-full p-1 text-gray-200 bg-indigo-500 hover:bg-white hover:text-indigo-600">Delete</button>
                                </div>

                            ) :
                            (
                                <div className="w-full flex justify-end mt-3">
                                    <button className="w-auto px-3 mr-2 rounded-full p-1 text-gray-200 bg-indigo-500 hover:bg-white hover:text-indigo-600">Edit</button>
                                    <button onClick={toggleDeleteModal} className="w-auto px-3 rounded-full p-1 text-gray-200 bg-indigo-500 hover:bg-white hover:text-indigo-600">Delete</button>
                                </div>
                            )
                        }

                    </div>
                </td>
            </tr>
        </>
    )
};


export default ReportTableRow;