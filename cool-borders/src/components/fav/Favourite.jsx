import { HiUserCircle } from 'react-icons/hi';
import { RiAlarmWarningLine } from 'react-icons/ri';
import { AiFillStar } from 'react-icons/ai';
import ImageSlider from '../../components/ImageSlider.jsx';
import { SliderData } from '../../components/SliderData.js';
import useAuthStore from "../../store/useAuthStore.js";


function Favorite({fav}) {
    const user = useAuthStore(state => state.user);

    return (

        // Container
        <div className="flex container justify-center items-center ">
            
            <div className=" container flex flex-col gap-10 m-10 justify-center items-center w-full md:w-3/4 h-full  rounded-md">

                <ImageSlider slides={SliderData} />

                {/* Section 2 */}
                <section className="text-justify flex flex-col ">

                    <div className="flex flex-row justify-between gap-2 mb-3">

                        <div className="flex items-center">
                            <HiUserCircle className="text-4xl text-white" />
                            <h3 className="ml-2 text-white text-xs font-bold ">{user.fullname}</h3>
                        </div>

                        <span className=" text-xs text-red-500">{fav.category}</span>
                    </div>
                    
                    <h2 className='md:text-sm text-gray-400 ml-1'>{fav.title}</h2>
                    <p className="text-xs md:text-sm text-gray-400 ml-1">
                            {fav.text}
                    </p>
                   
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