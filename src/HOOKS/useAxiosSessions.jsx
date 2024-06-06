import axios from "axios";

const axiosSessions = axios.create({
    baseURL: 'http://localhost:5000/sessions'
});

const useAxiosSessions = () => {
    return axiosSessions;
};

export default useAxiosSessions;
