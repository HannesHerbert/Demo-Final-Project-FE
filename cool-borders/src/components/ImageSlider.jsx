import React, { useEffect, useState } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import { GrPrevious, GrNext } from 'react-icons/gr';
import {MdArrowBackIosNew, MdArrowForwardIos} from 'react-icons/md';


function ImageSlider({ slides, setCurrSlide }) {
    const [current, setCurrent] = useState(0);
    const [hoveredLeft, setHoveredLeft] = useState(false);
    const [hoveredRight, setHoveredRight] = useState(false);


    // Next picture
    const nextSlide = () => {
        setCurrent(current === slides.length - 1 ? 0 : current + 1);
        // Slider Anzeige umschalten
        setCurrSlide(prev => current === slides.length - 1 ? 1 : prev + 1);
    };
    // Prev picture
    const prevSlide = () => {
        setCurrent(current === 0 ? slides.length - 1 : current - 1);
        // Slider Anzeige umschalten
        setCurrSlide(prev => current === 0 ? slides.length : prev - 1);
    };

    if (!Array.isArray(slides) || slides.length <= 0) {
        return null;
    }

    useEffect(() => {
        console.log(hoveredLeft);
        console.log(hoveredRight);
    }, [hoveredLeft, hoveredRight]);
    function isVideo(url) {

        console.log(url.substring(url.indexOf(':'), url.indexOf("/")));
        let index = url.lastIndexOf('.');

        if (url.substring(index + 1, url.length) === 'mp4' || (url.substring(url.indexOf(':'), url.indexOf("/")) === ':video')) {
            return true
        } else {
            return false
        }
    }


    function getSlideElement(url) {

        if ((url.substring(url.lastIndexOf('.'), url.length) === '.mp4') || (url.substring(url.indexOf(':'), url.indexOf("/")) === ':video')) {

        }
    }


    return (

        <section className='container relative w-full h-full flex flex-row justify-center items-center'>

            {slides.length > 1 &&
                <div 

                className='absolute top-0 left-0 w-full h-full z-50'
                >
                    {/* NAVH LINKS BUTTON */}
                    <button
                        className='relative h-full w-1/2 opacity-30 hover:opacity-100 '
                        onClick={prevSlide}
                        
                    >
                        <GrPrevious 
                            className='absolute  left-2 xl:left-28  top-1/2 '
                            size={50} 
                            color='fill-red-700'
                        />
                        
                    </button>

                    {/* NAVH RECHTS BUTTON */}
                    <button
                    className='relative h-full w-1/2 opacity-30 hover:opacity-100 '
                        onClick={nextSlide}>

                            <GrNext 
                                className='absolute right-2 xl:right-32 top-1/2 '
                                size={50} 
                            />
                            
                    </button>
                </div>
            }
            {slides.map((slide, index) => {
                return (
                    <div
                        className={index === current ? 'flex flex-col items-center opacity-100 transition duration-100 w-full h-[50vh] md:h-[60vh]' : 'opacity-0 transition duration-100 ease-in'}
                        key={index}
                    >

                        {index === current &&

                            (isVideo(slide) ?

                                <video controls  data-setup=''>
                                    <source src={slide} type='video/mp4'/>
                                </video>
                            :
                            <img src={slide} alt='travel image' className='w-full h-full object-contain rounded-md md:scale-100 ' />
                            )

                        }

                    </div>
                );
            })}
        </section>
    );
};

export default ImageSlider;
