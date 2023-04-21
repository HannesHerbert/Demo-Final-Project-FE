import React, { useState } from 'react';
import { SliderData } from './SliderData.js';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';


function ImageSlider ({ slides }) {
    const [current, setCurrent] = useState(0);
    const length = slides.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };
 
    if (!Array.isArray(slides) || slides.length <= 0) {
        return null;
    }

    return (
        <section className='container relative w-full md:w-3/4 h-full flex flex-row justify-center items-center'>
            <FaArrowAltCircleLeft className='absolute top-1/2 left-2 text-lg md:text-2xl text-gray-900 hover:text-green-600 z-10 cursor-pointer select-none' onClick={prevSlide} />
            <FaArrowAltCircleRight className='absolute top-1/2 right-2 text-lg md:text-2xl text-gray-900 hover:text-green-600 z-10 cursor-pointer select-none' onClick={nextSlide} />
            {SliderData.map((slide, index) => {
                return (
                    <div
                        className={index === current ? 'opacity-100 transition duration-100 scale-105' : 'opacity-0 transition duration-100 ease-in'}
                        key={index}
                    >
                        {index === current && (
                            <img src={slide.image} alt='travel image' className='w-full h-full md:h-3/4 rounded-md md:scale-100 hover:opacity-70' />
                        )}
                    </div>
                );
            })}
        </section>
    );
};

export default ImageSlider;
