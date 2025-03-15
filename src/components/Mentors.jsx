import { FaGraduationCap, FaStar, FaChalkboardTeacher, FaUsers, FaClock } from 'react-icons/fa';

const Mentors = () => {
  const mentors = [
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      role: "IIT Delhi Professor",
      expertise: "Multi-Exam Strategy",
      rank: "Former AIR 45",
      experience: "15+ years",
      students: "1000+",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      specialization: ["JEE Advanced", "BITSAT", "State CETs"]
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "IIT Bombay Alumna",
      expertise: "College Counseling",
      rank: "AIR 128",
      experience: "8+ years",
      students: "800+",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      specialization: ["College Selection", "Branch Guidance", "Career Planning"]
    },
    {
      id: 3,
      name: "Amit Patel",
      role: "BITS Pilani Professor",
      expertise: "Exam Preparation",
      rank: "BITSAT 340/450",
      experience: "12+ years",
      students: "1200+",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      specialization: ["JEE Main", "VITEEE", "COMEDK"]
    }
  ];

  return (
    <div name="mentors" className="w-full py-20 bg-white">
      <div className="max-w-screen-xl mx-auto p-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary">Expert Mentors</h2>
          <p className="text-gray-600 mt-4 text-lg">Get guidance from experienced professors and successful alumni</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mentors.map(({ id, name, role, expertise, rank, experience, students, image, specialization }) => (
            <div
              key={id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
            >
              <div className="relative">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <h3 className="text-2xl font-bold text-white">{name}</h3>
                  <p className="text-white/90">{role}</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-gray-600 mt-2">
                  <FaGraduationCap className="text-primary" />
                  <span>{expertise}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaStar className="text-yellow-500" />
                  <span>{rank}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaClock className="text-primary" />
                  <span>{experience} Experience</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaUsers className="text-primary" />
                  <span>{students} Students Guided</span>
                </div>

                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Expert in:</h4>
                  <div className="flex flex-wrap gap-2">
                    {specialization.map((spec, index) => (
                      <span
                        key={index}
                        className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex gap-2">
                  <button className="flex-1 bg-primary text-white py-2 rounded-md hover:bg-secondary transition-all">
                    Book Counseling
                  </button>
                  <button className="flex-1 border-2 border-primary text-primary py-2 rounded-md hover:bg-primary hover:text-white transition-all">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-primary/5 rounded-xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-primary mb-4">Why Choose Our Mentors?</h3>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="flex flex-col items-center">
                <FaGraduationCap className="text-4xl text-primary mb-4" />
                <h4 className="text-lg font-semibold mb-2">Multi-Exam Expertise</h4>
                <p className="text-gray-600 text-center">Guidance for all major engineering entrance exams</p>
              </div>
              <div className="flex flex-col items-center">
                <FaChalkboardTeacher className="text-4xl text-primary mb-4" />
                <h4 className="text-lg font-semibold mb-2">Personalized Strategy</h4>
                <p className="text-gray-600 text-center">Custom study plans for your target colleges</p>
              </div>
              <div className="flex flex-col items-center">
                <FaUsers className="text-4xl text-primary mb-4" />
                <h4 className="text-lg font-semibold mb-2">College Counseling</h4>
                <p className="text-gray-600 text-center">Expert advice on college and branch selection</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentors;