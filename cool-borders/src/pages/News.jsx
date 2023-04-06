
import { Link } from "react-router-dom";
import { HiUserCircle } from 'react-icons/hi';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiFillStar } from 'react-icons/ai';
import ImageSlider from '../components/ImageSlider.jsx';
import { SliderData } from '../components/SliderData.js';


function News(props) {


  return (
    <>

      <div className="flex flex-col justify-between items-center w-full h-full mt-2 p-3 bg-black rounded">

        <div className="self-end flex flex-row justify-end items-center">
          <h3 className="text-xl mr-3">Author</h3>
          <HiUserCircle className="text-2xl" />
        </div>

        <ImageSlider slides={SliderData} />

        <section className="text-justify flex flex-col">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum nobis, voluptas dignissimos culpa ullam commodi
            magnam numquam. Recusandae sed quod adipisci ipsa illum odit aliquid! Eius ipsam explicabo modi esse tempora
            perspiciatis odit rerum, fugiat numquam placeat architecto facere, doloribus sapiente ea eligendi eveniet cupiditate
            debitis inventore. Nostrum, eos numquam.
          </p>

          <AiFillStar className="text-2xl self-end hover:text-yellow-400 active:text-yellow-400 cursor-pointer" />
        </section>

      </div>
    </>
  );
};


export default News;