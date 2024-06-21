
import banner from '../../../assets/banner.avif'

const Banner = () => {
    return (
        <div className="max-w-screen-xl ">
            
            <img src={banner} className='w-full relative h-[650px] ' />
            <div className='absolute top-[30%] left-[10%] w-[80%] md:w-2/5 '>
                <h1 className='text-white text-3xl md:text-5xl font-bold pb-2 md:pb-4'>Experience a new era of</h1>
                <h1 className='text-white text-3xl md:text-5xl font-bold'> AI-enhanced learning</h1>
                <br></br>
                <br></br>
                <p className='text-white  italic'>
                <span className='font-bold text-xl'>EduConnect</span> is the #1 global learning platform.* Join our community of 300 million learners using EduConnect’s practice tests, digital flashcards and AI-powered tools to improve their marks and reach their goals.
                </p>
                <br></br>
               
            </div>
            

            </div>
            
            
  
        
    );
};

export default Banner;