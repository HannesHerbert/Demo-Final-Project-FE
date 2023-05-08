import { BsChevronUp, BsChevronDown } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import useNotificationStore from "../../store/useNotificationStore";
import axios from 'axios';
import useAuthStore from "../../store/useAuthStore";
import { Link } from 'react-router-dom';
import CommentAdmin from './CommentAdmin';
import PostAdmin from './PostAdmin';



// Clodinary
import CLOUD from "../../services/cloudinary.js";
import { AdvancedImage } from '@cloudinary/react';
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";



export function ReportTableRow({ report, updateTable }) {

    const token = useAuthStore(state => state.getToken());
    const [isDetailView, setIsDetailView] = useState(false);
    const [chevron, setChevron] = useState(<BsChevronDown />);
    const [isAction, setIsAction] = useState(false);
    const [actionType, setActionType] = useState("");
    const date = getDateString(report.createdAt);
    const time = getTimeString(report.createdAt);


    const publicId = getImgPublicId(report.reportedBy.image);
    const profileImg = CLOUD.image(publicId);
    profileImg.resize(thumbnail().width(50).height(50)).roundCorners(byRadius(50));

    // Initialisiere Dokumenten-Variable zur Darstellung der Komponente
    let requestBody = {}
    let document
    let docSettings
    getDocument(report.docModel, report.doc);

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


    function toggleActionModal(evt) {
        setActionType(evt.target.name)
        setIsAction(isAction => !isAction)
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


    async function closeReport(evt) {

        try {
            const response = await axios.put(`http://localhost:8080/admin/report/${report._id}`, {}, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            toggleActionModal(evt);

            // display eine 'SUCCESS' Meldung und navigiere zu Login
            alertSuccessHandler(`Report was closed`);

            updateTable();

        } catch (error) {

            console.log(error);
            // Display eine Fehlermeldung
            alertFailHandler(error.message);
        }
    };


    async function doDocAction(evt) {

        console.log("docAction!!");

        if(report.docModel === "User") {
            requestBody = {...requestBody, banned: true}
        }

        try {
            const response = await axios.put(docSettings.requestUrl, requestBody, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            console.log(response);

            toggleActionModal(evt);

            // display eine 'SUCCESS' Meldung und navigiere zu Login
            alertSuccessHandler(docSettings.successMsg);

            updateTable();

        } catch (error) {

            console.log(error);
            // Display eine Fehlermeldung
            alertFailHandler(error.message);
        }
    };



    const actionBtns = isAction ?
        (
            <div className="bg-white w-full flex items-center justify-between mt-3">
                <p className="w-fit">{actionType === "close" ? 'Are you sure you want to close this report?' : docSettings.actionText}</p>
                <div>
                    <button onClick={toggleActionModal} className="w-fit px-3 mr-2 rounded-full p-1 text-gray-200 bg-indigo-500 hover:bg-white hover:text-indigo-600">Cancel</button>
                    <button onClick={(evt) => (actionType === "close" ? closeReport(evt) : doDocAction(evt))} className="w-fit px-3 rounded-full p-1 text-gray-200 bg-indigo-500 hover:bg-white hover:text-indigo-600">{actionType === "close" ? "Close Report" : docSettings.btnText}</button>
                </div>
            </div>

        ) :
        (
            <div className="w-full flex justify-end mt-3">
                {report.doc && <button name="doc-action" onClick={toggleActionModal} className="w-auto px-3 mr-2 rounded-full p-1 text-gray-200 bg-indigo-500 hover:bg-white hover:text-indigo-600">{docSettings.btnText}</button>}
                <button name="close" onClick={toggleActionModal} className="w-auto px-3 rounded-full p-1 text-gray-200 bg-indigo-500 hover:bg-white hover:text-indigo-600">Close Report</button>
            </div>
        )


    function getDocument(docModel, doc) {

        if (!doc) {
            document = <p>{docModel} already deleted!</p>;
            return
        }

        switch (docModel) {

            case 'Post':

                document = <PostAdmin post={doc} />
                docSettings = {
                    requestUrl: `http://localhost:8080/admin/post/${doc._id}`,
                    actionText: 'Are you sure you want to hide this post?',
                    btnText: "Hide Post",
                    successMsg: "Post is now hidden"
                }

                break;

            case 'Comment':

                document = <CommentAdmin comment={doc} />
                docSettings = {
                    requestUrl: `http://localhost:8080/admin/comment/${doc._id}`,
                    actionText: 'Are you sure you want to hide this comment?',
                    btnText: "Hide Comment",
                    successMsg: "Comment is now hidden"
                }
                break;

            case 'User':
                requestBody = {...doc}
                document = <Link className="w-1/2 rounded-full p-1 text-gray-200 bg-indigo-500 hover:bg-white hover:text-indigo-600 text-center">Go to User-Profile</Link>
                docSettings = {
                    requestUrl: `http://localhost:8080/admin/post/${doc._id}`,
                    actionText: 'Are you sure you want to ban this user?',
                    btnText: "Ban User",
                    successMsg: "User is now banned"
                }
                break;

            default:
                break;
        }
    }


    return (
        <>
            <tr className="even:bg-gray-100 odd:bg-white border-b" key={report._id}>
                <td className="p-1 flex justify-center bg-opacity-0"><AdvancedImage cldImg={profileImg} /></td>
                <td className="border-l text-left p-1 " colSpan="2"><b>{report.reportedBy.username}</b></td>
                <td className="border-l">{report.docModel}</td>
                <td className="border-l">{date} <br /> {time}</td>
                <td className="border-l" colSpan="2">{report.reasonText}</td>
                <td className="border-l">
                    <button onClick={handleShowDetails} className="flex align-middle justify-center w-full">
                        {chevron}
                    </button>
                </td>
            </tr>
            <tr className={`even:bg-gray-100 odd:bg-white ${isDetailView ? null : 'hidden'}`}>
                <td className="table-span" colSpan="8">
                    <div className="w-full p-3 text-left">

                        <div className="w-full flex justify-center">
                            {document}
                        </div>

                        {actionBtns}

                    </div>
                </td>
            </tr>
        </>
    )
};


export default ReportTableRow;