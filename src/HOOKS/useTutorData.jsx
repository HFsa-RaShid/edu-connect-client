import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useTutorsData = () => {
  const axiosPublic = useAxiosPublic();
  const { refetch, data: tutors = [], isLoading, isError } = useQuery({
    queryKey: ['tutors'],
    queryFn: async () => {
      const res = await axiosPublic.get('/tutors');
      return res.data;
    }
  });

  return { tutors, refetch, isLoading, isError };
};

export default useTutorsData;
