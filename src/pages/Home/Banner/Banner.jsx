
import { useEffect } from 'react';
import banner from '../../../assets/banner.avif'
import AOS from "aos";
import "aos/dist/aos.css";

const Banner = () => {
    useEffect(() => {
        AOS.init({duration: 2000});
    }, []);

    return (
        <div className="max-w-screen-xl ">
            
            <img src={banner} className='w-full relative h-[650px] ' />
            <div className='absolute top-[30%] left-[10%] w-[80%] md:w-2/5 ' >
                <h1 className='text-white text-3xl md:text-5xl font-bold pb-2 md:pb-4' data-aos = "fade-right">Experience a new era of</h1>
                <h1 className='text-white text-3xl md:text-5xl font-bold' data-aos = "fade-right"> AI-enhanced learning</h1>
                <br></br>
                <br></br>
                <p className='text-white  italic' data-aos = "fade-left">
                <span className='font-bold text-xl'>EduConnect</span> is the #1 global learning platform.* Join our community of 300 million learners using EduConnect’s practice tests, digital flashcards and AI-powered tools to improve their marks and reach their goals.
                </p>
                <br></br>
               
            </div>
            

            </div>
            
            
  
        
    );
};

export default Banner;