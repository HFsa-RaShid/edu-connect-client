import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../HOOKS/useAxiosSecure";

const NoteDetails = () => {
    const {id} = useParams();
    const axiosSecure = useAxiosSecure();
    const [notes, setNotes] = useState('');
    const [IsLoading, setIsLoading] = useState(true);


    useEffect(() => {
      
            axiosSecure.get(`/notes/${id}`)
                .then(res => {
                    setNotes(res.data);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching note:', error);
                    setIsLoading(false);
                });
        },[axiosSecure, id]);


        const {
            title,
            description
        } = notes;


    return (
        <div className="min-h-screen ">
            
            <p className="pt-28 text-center pb-10 font-bold text-2xl">{title}</p>
            <p>{description}</p>
           
            
        </div>
    );
};

export default NoteDetails;