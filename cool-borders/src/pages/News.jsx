
import { Link } from "react-router-dom";
import { FaUserAlt } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';


function News(props) {


  return (
    <div className="h-full flex flex-col justify-center items-center">

      <div className="flex flex-col justify-between items-center w-full md:w-3/4 h-full mt-2 md:mt-8 p-3 bg-slate-200 rounded-md">

        <div className="self-end flex flex-row justify-end items-center text-gray-600 mb-2">
          <h3 className="text-sm md:text-lg mr-3">Author</h3>
          <FaUserAlt className="text-lg md:text-2xl" />
        </div>

        {/* <ImageSlider slides={sliderData} /> */}

        <section className="text-justify flex flex-col mt-4 md:mt-10">
          <p className="text-xs md:text-sm text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum nobis, voluptas dignissimos culpa ullam commodi
            magnam numquam. Recusandae sed quod adipisci ipsa illum odit aliquid! Eius ipsam explicabo modi esse tempora
            perspiciatis odit rerum, fugiat numquam placeat architecto facere, doloribus sapiente ea eligendi eveniet cupiditate
            debitis inventore. Nostrum, eos numquam.
          </p>

          <AiFillStar className="text-2xl self-end text-gray-600 hover:text-yellow-400 active:text-yellow-400 cursor-pointer" />
        </section>
      </div>

    </div>

  );
};


export default News;