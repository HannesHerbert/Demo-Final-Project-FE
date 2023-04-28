import { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../../store/useAuthStore";
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import ReportTableRow from "./ReportTableRow";



function ReportManagement() {

    const token = useAuthStore(state => state.getToken());
    const [reportsArr, setReportsArr] = useState([]);
    const [dirArrow, setDirArrow] = useState(<BsArrowDown className="self-center" />);
    const [sortVal, setSortVal] = useState({ key: "username", upDir: false })
    const [isInit, setIsInit] = useState(true);

    async function getAllReports() {

        // const sortDir = sortVal.upDir ? -1 : 1

        try {
            const response = await axios.get(`http://localhost:8080/protected/report`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            setReportsArr(response.data.reports);

            setDirArrow(sortVal.upDir ? <BsArrowUp className="self-center" /> : <BsArrowDown className="self-center" />)

        } catch (error) {

            console.log(error);
            // Display eine Fehlermeldung
            // alertFailHandler(error.response.message);
        }
    };


    useEffect(() => {
        if (isInit) {
            getAllReports();
            setIsInit(false);
        }
    }, []);


    const reportsTable = reportsArr.map(report => {

        return (
            <ReportTableRow report={report} key={report._id} />
        )
    });


    return (
        <div className="container flex flex-col justify-center items-center min-h-full">

            {/* <form method="get" onSubmit={handleSubmit} className="w-xs mx-auto w-full md:w-1/2 flex flex-col md:flex-row justify-center items-center">

                <input
                    type="search"
                    name="search"
                    value={searchString}
                    onChange={(event) => setSearchString(event.target.value)}
                    className="focus:caret-orange-500 shadow  border rounded w-full py-2 px-3 text-orange-500 leading-tight m-3"
                    placeholder='Search for User'
                />

                <button className="w-32 flex justify-center items-center bg-orange-500 font-bold hover:bg-orange-600 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline ease-in-out delay-150 bg-gradient-to-r from-orange-600 duration-300">
                    <IoMdSearch className="text-2xl" />
                </button>

            </form> */}

            <div className="flex flex-col justify-center items-center w-full bg-gray-900 rounded mt-4 p-4">
                <table className="table-fixed w-full w-full md:text-sm">
                    <thead className="text-white">
                        <tr>
                            <th className="" colSpan="1"></th>

                            <th className="border-l" colSpan="2">
                                <button name="username" onClick={(evt) => handleSortClick(evt)} className="flex align-middle w-full pl-1">
                                    Reported By
                                    {sortVal.key === "username" ? dirArrow : null}
                                </button>
                            </th>

                            <th className="border-l">
                                <button name="role" onClick={(evt) => handleSortClick(evt)} className="flex align-middle w-full pl-1">
                                    Doc-Type
                                    {sortVal.key === "role" ? dirArrow : null}
                                </button>
                            </th>

                            <th className="border-l">
                                <button className="flex align-middle w-full pl-1">
                                    Date
                                    {sortVal.key === "posts" ? dirArrow : null}
                                </button>
                            </th>

                            <th className="border-l">
                                <span className="flex align-middle pl-1">
                                    Reports
                                    </span>
                            </th>
                        </tr>
                    </thead>

                    <tbody className="text-center text-black">
                        {reportsTable}
                    </tbody>

                </table>
            </div>

        </div>
    )
}


export default ReportManagement;