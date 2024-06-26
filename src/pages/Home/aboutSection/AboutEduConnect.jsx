

const AboutEduConnect = () => {
    return (
        <div className="md:flex gap-10  md:h-[350px] my-20 justify-around">
            <div className="md:w-[50%] mx-2">
                <h1 className="text-3xl font-semibold py-8">
                    Know About EduConnect Learning Platform

                </h1>
                <h2>
                EduConnect Learning Platform offers a comprehensive suite of tools for educators and students to facilitate online learning, including interactive lessons, materials, and collaboration features. It aims to enhance the educational experience through technology-driven solutions.
                </h2>
                <div className="flex gap-10 my-8">
                    <div>
                        <button className="p-6 bg-blue-300 rounded-md font-bold text-xl ml-4 mb-2"><span className="text-blue-700">7+K</span></button>
                        <p className="text-blue-700 font-medium">Students Learning</p>
                    </div>
                    <div>
                        <button className="p-6 bg-red-300 rounded-md font-bold text-xl ml-2 mb-2"><span className="text-red-700">1+K</span></button>
                        <p className="text-red-700 font-medium">Active Courses</p>
                    </div>
                    <div>
                        <button className="p-6 bg-green-300 rounded-md font-bold text-xl ml-1 mb-2"><span className="text-green-700">200+</span></button>
                    <p className="text-green-700 font-medium">Free Courses</p>
                    </div>
                </div>

            </div>
            <div className="w-[50%">
                <img src="https://i.ibb.co/Wz3bzd8/about.jpg" className="rounded-full h-[300px] lg:h-full shadow-2xl flex mx-auto  border-black border-4 p-2 " />
            </div>
            
        </div>
    );
};

export default AboutEduConnect;