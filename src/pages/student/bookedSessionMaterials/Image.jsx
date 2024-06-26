
import { useParams } from "react-router-dom";
import useImage from "../../../HOOKS/useImage";
import { FiDownload } from "react-icons/fi";
import { Helmet } from "react-helmet-async";

const Image = () => {
    const { id } = useParams();
    const { material } = useImage(id);

    const handleDownloadImage = async () => {
        try {
            const response = await fetch(material.image);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${material.title || 'download'}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    };


    return (
        <div className="w-[90%] md:w-[70%] lg:w-[55%] mx-auto">
            <Helmet>
                <title>Material Image | EduConnect</title>
            </Helmet>
            
           <p className='pt-24 text-3xl font-bold text-center pb-4'>Material Images</p>
            <img src={material.image} className="w-full" alt="Material" />
            <div className="mb-8 flex justify-center">
                <button className="btn btn-outline border-0 border-b-4 border-t-2 border-black px-8 font-bold" onClick={handleDownloadImage}>
                    <span>Download</span> <FiDownload />
                </button>
            </div>
        </div>
    );
};

export default Image;
