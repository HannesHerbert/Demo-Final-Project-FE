
import { Link } from "react-router-dom";
import PrivateRoute from "../services/PrivateRoute";
import { HiUserCircle } from 'react-icons/hi';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineStar } from 'react-icons/ai';
import blogImage from '../assets/boardergram-logo.png';


function Blogs(props) {


    return (
        <>
       {/*  <PrivateRoute /> */}
            <Link to='/auth/blogs'> <h2 className='text-5xl font-mono font-black tracking-widest text-orange-500 text-center'>BLOGS</h2></Link>

            <select name="blog-options" id="blog-options" className="form-select p-3 rounded-full">
                <option value="stories">Stories</option>
                <option value="reviews">Reviews</option>
                <option value="market">Market</option>
                <option value="friends">Friends</option>
                <option value="all">All</option>
            </select>

            <div className="flex flex-col justify-between items-center w-full h-full mt-2 p-3 bg-neutral-700  rounded">

                <div className="self-end flex flex-row justify-end items-center">
                    <span>{(blog-options.target.value)}</span>
                    <h3 className="text-xl mr-3">Author</h3>
                    <HiUserCircle className="text-2xl" />
                </div>

                <div
                    className="mb-3"
                    style={{
                        backgroundImage: `url(${blogImage})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        width: '300px',
                        height: '250px',
                        borderRadius: '7px'
                    }}>

                    <div className="flex flex-row justify-between items center relative mt-28">
                        <AiOutlineArrowLeft className="text-2xl text-black" />
                        <AiOutlineArrowRight className="text-2xl text-black" />
                    </div>

                </div>


                <section className="text-justify flex flex-col">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum nobis, voluptas dignissimos culpa ullam commodi
                        magnam numquam. Recusandae sed quod adipisci ipsa illum odit aliquid! Eius ipsam explicabo modi esse tempora
                        perspiciatis odit rerum, fugiat numquam placeat architecto facere, doloribus sapiente ea eligendi eveniet cupiditate
                        debitis inventore. Nostrum, eos numquam.
                    </p>

                    <div className="w-10 h-10 bg-red-600 rounded-full"></div>
                    {/* TODO: Icon */}
                    <AiOutlineStar className="text-2xl self-end" />
                </section>

            </div>
        </>
    )
}


export default Blogs;