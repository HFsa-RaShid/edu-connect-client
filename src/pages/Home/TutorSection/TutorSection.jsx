import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/autoplay'; 
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import useTutorsData from '../../../HOOKS/useTutorData';
import { useEffect } from 'react';


const TutorSection = () => {
  const { tutors,refetch } = useTutorsData();

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 5000);
    return () => clearInterval(interval);
  }, [refetch]);

  
  return (
    <div id="app" className="h-full my-20">
      
      <h1 className='text-center font-bold text-3xl'>Tutors</h1>
      <p className='w-[60%] mx-auto text-center italic py-6'>Our respected tutors combine extensive expertise with a passion for teaching, ensuring each student reaches their full potential.</p>
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000, 
          disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]} 
        className="mySwiper w-full pt-12 pb-12"
      >
        {tutors.map((tutor) => (
          <SwiperSlide key={tutor._id} className="w-[280px] h-[320px] bg-center bg-cover">
            <img src={tutor.image} alt={tutor.name} className="block w-full h-[90%]" />
            <div className="text-center mt-2">
              <h3 className="text-lg font-bold">{tutor.name}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TutorSection;