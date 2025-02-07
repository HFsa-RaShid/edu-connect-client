import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import TutorSection from "../TutorSection/TutorSection";
import StudySessions from "../studySessions/StudySessions";
import AboutEduConnect from "../aboutSection/AboutEduConnect";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | EduConnect</title>
            </Helmet>
            <Banner></Banner>
            <AboutEduConnect></AboutEduConnect>
            <StudySessions></StudySessions>
            <TutorSection></TutorSection>
            
        </div>
    );
};

export default Home;