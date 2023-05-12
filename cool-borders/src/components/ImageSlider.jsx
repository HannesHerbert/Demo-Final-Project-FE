import React, { useEffect, useState } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import { GrPrevious, GrNext } from 'react-icons/gr';


function ImageSlider ({ slides, setCurrSlide }) {
    const [current, setCurrent] = useState(0);
    const [hovered, setHovered] = useState(false);

    // Next picture
    const nextSlide = () => {
        setCurrent(current === slides.length - 1 ? 0 : current + 1);
        // Slider Anzeige umschalten
        setCurrSlide(prev => current === slides.length - 1 ? 1 :  prev + 1); 
    };
    // Prev picture
    const prevSlide = () => {
        setCurrent(current === 0 ? slides.length - 1 : current - 1);
        // Slider Anzeige umschalten
        setCurrSlide(prev => current === 0 ? slides.length  :  prev - 1);
    };
 
    if (!Array.isArray(slides) || slides.length <= 0) {
        return null;
    }

    return (
        // <section className='container relative w-full h-full flex flex-row justify-center items-center'>
        //     {slides.length > 1 &&
        //     <>
        //         <FaArrowAltCircleLeft className='absolute top-1/2 left-2 text-lg md:text-2xl text-gray-900 hover:text-green-600 z-10 cursor-pointer select-none' onClick={prevSlide} />
        //         <FaArrowAltCircleRight className='absolute top-1/2 right-2 text-lg md:text-2xl text-gray-900 hover:text-green-600 z-10 cursor-pointer select-none' onClick={nextSlide} />
        //     </>
        //     }
        //     {slides.map((slide, index) => {
        //         return (
        //             <div
        //                 className={index === current ? 'flex flex-col items-center opacity-100 transition duration-100 w-full h-[50vh] md:h-[60vh]' : 'opacity-0 transition duration-100 ease-in'}
        //                 key={index}
        //             >
                        
        //                 {index === current && (
        //                     <img src={slide} alt='travel image' className='w-full h-full object-contain rounded-md md:scale-100 hover:opacity-70' />
        //                 )}
                        
        //             </div>
        //         );
        //     })}
        // </section>
        <section className='container relative w-full h-full flex flex-row justify-center items-center'>
            {/* {slides.length > 1 &&
            <>
                 <button className='absolute left-0 z-10 cursor-pointer w-40 bg-gray-300 h-full ' onClick={prevSlide}></button>
                 <button className='absolute right-0 z-10 cursor-pointer w-40 bg-gray-300  h-full hover:bg-gray-00 opacity-5' onClick={nextSlide}></button>
            </>
            } */}
            {slides.length > 1 &&
                <div style={{
                    position: "absolute",
                    // backgroundColor: "yellow",
                    width: "100%",
                    height: "100%",
                    zIndex: 1000
                }}>
                    <button
                        style={{
                            height: "100%",
                            width: "50%",
                            position: "relative"
                            
                        }}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        onClick={prevSlide}
                        
                    >
                        {hovered && <GrPrevious style={{
                            position: "absolute",
                            opacity:'0.1',
                            left: "10",
                            top: "50%",
                            transform: "translate(-50%, -50%)"
                        }} size={20} />}
                        
                        
                    </button>
                    <button
                        style={{
                            height: "100%",
                            width: "50%",
                            position: "relative"
                        }}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        onClick={nextSlide}>
                            {hovered && <GrNext style={{
                            position: "absolute",
                            opacity:'0.1',
                            right: "10",
                            top: "50%",
                            transform: "translate(50%, -50%)"
                        }} size={20} />}
                            
                    </button>
                </div>
            }
            {slides.map((slide, index) => {
                return (
                    <div
                        className={index === current ? 'flex flex-col items-center opacity-100 transition duration-100 w-full h-[50vh] md:h-[60vh]' : 'opacity-0 transition duration-100 ease-in'}
                        key={index}
                    >
                        
                        {index === current && (
                            <img src={slide} alt='travel image' className='w-full h-full object-contain rounded-md md:scale-100 hover:opacity-70' />
                        )}
                        
                    </div>
                );
            })}
        </section>
    );
};

export default ImageSlider;
