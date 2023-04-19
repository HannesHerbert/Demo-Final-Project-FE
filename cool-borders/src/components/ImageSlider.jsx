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
        <section className='relative w-auto h-1/3 flex flex-row justify-center items-center p-2'>
            <FaArrowAltCircleLeft className='absolute top-1/2 left-2 text-2xl text-black hover:text-orange-500 z-10 cursor-pointer select-none' onClick={prevSlide} />
            <FaArrowAltCircleRight className='absolute top-1/2 right-2 text-2xl text-black hover:text-orange-500 z-10 cursor-pointer select-none' onClick={nextSlide} />
            {SliderData.map((slide, index) => {
                return (
                    <div
                        className={index === current ? 'opacity-100 transition duration-100 scale-105' : 'opacity-0 transition duration-100 ease-in'}
                        key={index}
                    >
                        {index === current && (
                            <img src={slide.image} alt='travel image' className='w-full h-full md:h-96 rounded-md' />
                        )}
                    </div>
                );
            })}
        </section>
    );
};

export default ImageSlider;
