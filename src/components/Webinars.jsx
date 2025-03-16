import { FaCalendar, FaClock, FaUsers, FaRupeeSign, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const Webinars = () => {
  const navigate = useNavigate();

  const webinars = [
    {
      id: 1,
      title: "Master Multiple Engineering Exams",
      date: "March 15, 2024",
      time: "6:00 PM IST",
      mentor: "Dr. Rajesh Kumar",
      seats: 100,
      price: "Free",
      topics: [
        "JEE Main vs Advanced Strategy",
        "BITSAT Preparation Tips",
        "Time Management for Multiple Exams",
        "Common Topics Analysis"
      ]
    },
    {
      id: 2,
      title: "College Selection Strategy",
      date: "March 20, 2024",
      time: "5:00 PM IST",
      mentor: "Priya Sharma",
      seats: 150,
      price: "Free",
      topics: [
        "Understanding Cut-offs",
        "Branch Selection Guide",
        "College Comparison Framework",
        "Future Career Prospects"
      ]
    },
    {
      id: 3,
      title: "Engineering Entrance Roadmap",
      date: "March 25, 2024",
      time: "7:00 PM IST",
      mentor: "Amit Patel",
      seats: 120,
      price: "Free",
      topics: [
        "Exam Pattern Analysis",
        "Subject-wise Strategy",
        "Mock Test Approach",
        "Last Month Preparation"
      ]
    },
  ];

  return (
    <div name="webinars" className="w-full py-20 bg-gray-50">
      <div className="max-w-screen-xl mx-auto p-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary">Free Expert Sessions</h2>
          <p className="text-gray-600 mt-4 text-lg">Join our comprehensive sessions covering all engineering entrance exams</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {webinars.map(({ id, title, date, time, mentor, seats, price, topics }) => (
            <div
              key={id}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="bg-primary/10 text-primary font-semibold px-4 py-2 rounded-full w-fit mb-4">
                {price}
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
              <p className="text-gray-600 font-medium">by {mentor}</p>
              
              <div className="flex flex-col gap-3 mt-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaCalendar />
                  <span>{date}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaClock />
                  <span>{time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaUsers />
                  <span>{seats} seats available</span>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold mb-2">Session Highlights:</h4>
                <ul className="space-y-2">
                  {topics.map((topic, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                      <FaCheckCircle className="text-green-500" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className="w-full mt-6 bg-primary text-white py-3 rounded-md hover:bg-secondary transition-all font-semibold" 
               onClick={() => navigate(`/register?title=${encodeURIComponent(title)}`)} >
                Register Now
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Webinars;