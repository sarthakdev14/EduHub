import { Link } from 'react-scroll';
import { FaChalkboardTeacher, FaChartLine, FaBookReader, FaUniversity } from 'react-icons/fa';

const Hero = () => {
  const features = [
    {
      icon: <FaChalkboardTeacher className="text-4xl text-primary" />,
      title: "Expert Mentorship",
      desc: "Guidance from IIT/NIT professors and top rankers"
    },
    {
      icon: <FaChartLine className="text-4xl text-primary" />,
      title: "Exam Strategy",
      desc: "Personalized preparation for multiple exams"
    },
    {
      icon: <FaBookReader className="text-4xl text-primary" />,
      title: "Study Resources",
      desc: "Comprehensive material for all entrance exams"
    },
    {
      icon: <FaUniversity className="text-4xl text-primary" />,
      title: "College Guidance",
      desc: "Find the best college matching your profile"
    }
  ];

  return (
    <div name="home" className="min-h-screen w-full hero-pattern">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center justify-center h-full px-4 pt-24 pb-8">
        <div className="flex flex-col justify-center items-center text-center">
          <h2 className="text-4xl sm:text-7xl font-bold text-primary mb-6">
            Your Gateway to Top Engineering Colleges
          </h2>
          <p className="text-gray-600 py-4 max-w-2xl text-lg text-center">
            Expert guidance for JEE Main, Advanced, BITSAT, VITEEE, and other engineering entrance exams. 
            Get personalized mentorship, exam strategies, and college counseling from top rankers and professors.
          </p>
          <div className="flex gap-4 mb-12">
            <Link
              to="webinars"
              smooth
              duration={500}
              className="group w-fit px-8 py-4 text-lg font-semibold rounded-md bg-gradient-to-r from-primary to-secondary cursor-pointer text-white hover:scale-105 transition-all"
            >
              Book Free Counseling
            </Link>
            <Link
              to="exams"
              smooth
              duration={500}
              className="group w-fit px-8 py-4 text-lg font-semibold rounded-md border-2 border-primary text-primary cursor-pointer hover:bg-primary hover:text-white transition-all"
            >
              Explore Exams
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mt-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all">
              <div className="flex flex-col items-center text-center">
                {feature.icon}
                <h3 className="text-xl font-bold mt-4 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white p-8 rounded-xl shadow-lg w-full">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <h4 className="text-4xl font-bold text-primary">1000+</h4>
              <p className="text-gray-600 mt-2">Expert Mentors</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold text-primary">20,000+</h4>
              <p className="text-gray-600 mt-2">Students Guided</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold text-primary">95%</h4>
              <p className="text-gray-600 mt-2">Success Rate</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold text-primary">100+</h4>
              <p className="text-gray-600 mt-2">Partner Colleges</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;