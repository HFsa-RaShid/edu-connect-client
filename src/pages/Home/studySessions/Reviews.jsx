

import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../../HOOKS/useAxiosPublic';
import { useEffect, useState } from 'react';
import { Rating } from '@smastrom/react-rating';

import '@smastrom/react-rating/style.css';
import { Helmet } from 'react-helmet-async';

const Reviews = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axiosPublic.get(`/reviews/${id}`)
            .then((res) => {
                setReviews(res.data.reviews); 
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching reviews:', error);
                setIsLoading(false);
            });
    }, [id, axiosPublic]);

    return (
        <div className='min-h-screen'>
            <Helmet>
                <title>Reviews | EduConnect</title>
            </Helmet>
            <p className='pt-20 text-2xl text-center font-bold pb-4'>Reviews</p>
            {isLoading ? (
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            ) : (
                <>
                    {reviews.length === 0 ? (
                        <p className='text-center'>No reviews found for this session.</p>
                    ) : (
                        <>
                            {reviews.map(review => (
                                <div key={review._id} className='p-3 w-[70%] mx-auto border mb-4 'data-aos="fade-up">
                                    <div className="flex gap-2 mb-2 ">
                                        <div className=" w-12 h-12 rounded-full border border-black">
                                            <img src={review.userImage} className='rounded-full w-full h-full' alt="User" />
                                        </div>
                                        <div className=''>
                                            <p className='text-[18px] font-semibold'>{review.userName}</p>
                                            <p className='text-[12px]'>{review.dateTime}</p>
                                        </div>
                                    </div>
                                    <p className='py-2'>{review.reviewText}</p>
                                    <div className='flex gap-2 items-center my-1'>
                                        <Rating
                                            style={{ maxWidth: 100 }}
                                            value={review.rating}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </>
            )}
           
        </div>
    );
};

export default Reviews;
