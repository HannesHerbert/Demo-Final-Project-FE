import { BsChevronUp, BsChevronDown } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import useNotificationStore from "../../store/useNotificationStore";
import axios from 'axios';
import useAuthStore from "../../store/useAuthStore";
import { Link } from 'react-router-dom';
import CommentAdmin from './CommentAdmin';
import PostAdmin from './PostAdmin';
import Post from '../post/Post';
import useSearchStore from '../../store/useSearchStore';



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
    const setSearchUser = useSearchStore(state => state.setSearchUser);
    const [isInit, setIsInit] = useState(true);


    const publicId = getImgPublicId(report.reportedBy.image);
    const profileImg = CLOUD.image(publicId);
    profileImg.resize(thumbnail().width(50).height(50)).roundCorners(byRadius(50));

    // Initialisiere Dokumenten-Variable zur Darstellung der Komponente
    let requestBody = {}
    let document
    let docSettings
    getDocument(report.docModel, report.doc);
    const [dynBtnText, setDynBtnText] = useState("");
    const [dynActionText, setDynActionText] = useState("");

    useEffect(() => {
        setChevron(isDetailView ? <BsChevronUp /> : <BsChevronDown />)
    }, [isDetailView]);


    useEffect(() => {
        if (!isInit) {
            if (actionType === "close") {
                setDynBtnText("Close Report");
                setDynActionText("Are you sure you want to close this report?")
            } else if (actionType === "delete") {
                setDynBtnText("Delete Report")
                setDynActionText("Are you sure you want to delete this report?")
            } else {
                setDynBtnText(docSettings.btnText)
                setDynActionText(docSettings.actionText)
            }
        }
        setIsInit(false)
    }, [actionType]);


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
        setActionType(evt.target.name);
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
            alertSuccessHandler(`Report has been closed`);

            updateTable();

        } catch (error) {

            console.log(error);
            // Display eine Fehlermeldung
            alertFailHandler(error.message);
        }
    };


    async function deleteReport(evt) {

        try {
            const response = await axios.delete(`http://localhost:8080/admin/report/${report._id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            toggleActionModal(evt);

            // display eine 'SUCCESS' Meldung und navigiere zu Login
            alertSuccessHandler(`Report has been deleted`);

            updateTable();

        } catch (error) {

            console.log(error);
            // Display eine Fehlermeldung
            alertFailHandler(error.message);
        }
    };


    async function doDocAction(evt) {

        if (report.docModel === "User") {
            requestBody = { ...requestBody, banned: !requestBody.banned }
        } else {requestBody = {visible: !report.doc.visible}}

        try {
            if (actionType === 'delete') {

                const response = await axios.delete(`http://localhost:8080/admin/report/${report._id}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                alertSuccessHandler(`Report has been deleted`);

            } else if (actionType === 'close') {

                const response = await axios.put(`http://localhost:8080/admin/report/${report._id}`, {}, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                alertSuccessHandler(`Report has been closed`);

            } else {

                const response = await axios.put(docSettings.requestUrl, requestBody, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                alertSuccessHandler(docSettings.successMsg);

            };

            toggleActionModal(evt);

            updateTable()

        } catch (error) {

            console.log(error);
            // Display eine Fehlermeldung
            alertFailHandler(error.message);
        }

    };



    const actionBtns = isAction ?
        (
            <div className="bg-white w-full flex items-center justify-between mt-3">
                <p className="w-fit">{dynActionText}</p>
                <div>
                    <button onClick={toggleActionModal} className="w-fit px-3 mr-2 rounded-full p-1 text-gray-200 bg-indigo-500 hover:bg-white hover:text-indigo-600">Cancel</button>
                    <button onClick={(evt) => (doDocAction(evt))} className="w-fit px-3 rounded-full p-1 text-gray-200 bg-indigo-500 hover:bg-white hover:text-indigo-600">{dynBtnText}</button>
                </div>
            </div>

        ) :
        (report.closed ?
            (
                <div className="w-full flex justify-end mt-3">
                    {report.doc && <button name={docSettings.btnName} onClick={toggleActionModal} className="w-auto px-3 mr-2 rounded-full p-1 text-gray-200 bg-indigo-500 hover:bg-white hover:text-indigo-600">{docSettings.btnText}</button>}
                    <button name="delete" onClick={toggleActionModal} className="w-auto px-3 rounded-full p-1 text-gray-200 bg-indigo-500 hover:bg-white hover:text-indigo-600">Delete Report</button>
                </div>
            )
            :
            (
                <div className="w-full flex justify-end mt-3">
                    {report.doc && <button name={docSettings.btnName} onClick={toggleActionModal} className="w-auto px-3 mr-2 rounded-full p-1 text-gray-200 bg-indigo-500 hover:bg-white hover:text-indigo-600">{docSettings.btnText}</button>}
                    <button name="close" onClick={toggleActionModal} className="w-auto px-3 rounded-full p-1 text-gray-200 bg-indigo-500 hover:bg-white hover:text-indigo-600">Close Report</button>
                </div>
            )
        )


    function getDocument(docModel, doc) {

        if (!doc) {
            document = <p>{docModel} already deleted!</p>;
            return
        }

        switch (docModel) {

            case 'Post':

                // document = <PostAdmin post={doc} />
                document = <Post post={doc} />
                docSettings = {
                    requestUrl: `http://localhost:8080/admin/post/${doc._id}`,
                    actionText: 'Are you sure you want to hide this post?',
                    btnText: (doc.visible ? "Hide Post" : "Show Post"),
                    successMsg: (doc.visible ? "Post is now hidden" : "Post is now visible"),
                    btnName: (doc.visible ? "hide" : "show")
                }

                break;

            case 'Comment':

                document = <CommentAdmin comment={doc} updateTable={updateTable} />
                docSettings = {
                    requestUrl: `http://localhost:8080/admin/comment/${doc._id}`,
                    actionText: 'Are you sure you want to hide this comment?',
                    btnText: (doc.visible ? "Hide Comment" : "Show Comment"),
                    successMsg: (doc.visible ? "Comment is now hidden" : "Comment is now visible"),
                    btnName: (doc.visible ? "hide" : "show")
                }
                break;

            case 'User':

                requestBody = { ...doc };
                const publicId = getImgPublicId(doc.image);
                const profileImg = CLOUD.image(publicId);
                profileImg.resize(thumbnail().width(100).height(100)).roundCorners(byRadius(50));

                document = <div className="flex items-center">
                    <div
                        className="relative shadow mx-auto h-auto w-auto border-white rounded-full overflow-hidden border-4 hover:border-green-400"
                        onClick={() => {
                            setSearchUser(doc)
                        }}
                    >
                        <Link to={`/users/${doc.username}`} >
                            <AdvancedImage cldImg={profileImg} />
                        </Link>
                    </div>
                    <h3 className="ml-2 text-black text-lg font-bold ">{doc.fullname}</h3>
                </div>

                docSettings = {
                    requestUrl: `http://localhost:8080/admin/user/${doc._id}`,
                    actionText: `Are you sure you want to ${doc.banned ? "ban" : "unban"} this user?`,
                    btnText: (doc.banned ? "Ban User" : "Unban User"),
                    successMsg: (doc.banned ? "User is now banned" : "User is now unbanned"),
                    btnName: (doc.banned ? "ban" : "unban")
                }
                break;

            default:
                break;
        }
    };



    return (
        <>
            <tr className="even:bg-gray-100 odd:bg-white border-b" key={report._id}>
                <td className="p-1 flex justify-center bg-opacity-0">
                    <div
                        className="relative shadow mx-auto h-10 w-10 border-white rounded-full overflow-hidden border-4 hover:border-green-400"
                        onClick={() => {
                            setSearchUser(report.reportedBy)
                        }}
                    >
                        <Link to={`/users/${report.reportedBy.username}`} >
                            <AdvancedImage cldImg={profileImg} />
                        </Link>

                    </div>
                </td>
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