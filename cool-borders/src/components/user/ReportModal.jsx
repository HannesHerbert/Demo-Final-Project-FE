import { useEffect, useState } from "react";
import useAuthStore from "../../store/useAuthStore";




function ReportModal() {

    const user = useAuthStore(state => state.user)
    const [reportText, setReportText] = useState("");
    const docModel = "Comment";
    const docId = "ObjectId"

    useEffect(() => {
        console.log(reportText);
    }, [reportText])

    async function handleSubmit(evt) {

        evt.preventDefault()

        const report = {
            reportedBy: user._id,
            reasonText: reportText,
            doc: docId,
            docModel: docModel
        };

        try {
            const response = await axios.pot(`http://localhost:8080/protected/report`, report, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            // display eine 'SUCCESS' Meldung
            alertSuccessHandler(`Your report was successfully sended`);


        } catch (error) {
            console.log(error);
            // Display eine Fehlermeldung
            alertFailHandler(error.message);
        }
    };


    function cancelReport() {

    };


    return (
        <div className="w-screen h-screen bg-white/30 fixed top-0 left-0 flex justify-center items-center z-50 backdrop-blur-sm">
            <div className="px-4 text-xs text-white bg-gray-900 pb-6 w-full h-fit flex flex-col items-center overflow-hidden md:max-w-sm rounded-lg mx-auto shadow-lg shadow-indigo-500/50 ">

                <h2 className="text-lg">Create Report</h2>

                <div className="text-left w-full">

                    <p><b>Report on: </b>Comment</p>

                    <textarea onChange={evt => setReportText(evt.target.value)} className="text-left w-full self-center mt-3" placeholder="Write your Report" id="reportinput" cols="30" rows="6"></textarea>

                    <div className="flex justify-evenly mt-2">
                        <button
                            onClick={cancelReport}
                            className="w-1/4 rounded-full p-1 text-gray-200 bg-indigo-500 hover:bg-white hover:text-indigo-600">
                                Cancel
                        </button>

                        <button
                            onClick={handleSubmit}
                            className="w-1/4 rounded-full p-1 text-gray-200 bg-indigo-500 hover:bg-white hover:text-indigo-600">
                            Send
                        </button>
                    </div>

                </div>

            </div>
        </div>
    )
}


export default ReportModal