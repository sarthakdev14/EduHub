import { useState } from 'react';
import { FaUniversity, FaGraduationCap, FaUsers, FaRupeeSign, FaCheckCircle, FaTrophy } from 'react-icons/fa';

const CollegeComparison = () => {
  const [selectedColleges, setSelectedColleges] = useState([]);
  
  const colleges = [
    {
      id: 1,
      name: "IIT Bombay",
      location: "Mumbai, Maharashtra",
      ranking: "1",
      courses: ["Computer Science", "Electrical", "Mechanical"],
      fees: "₹2.2L per year",
      placement: "₹25L average",
      cutoff: "JEE Advanced: 250",
      seats: 1200,
      highlights: [
        "World-class research facilities",
        "100% placement record",
        "International collaborations"
      ]
    },
    {
      id: 2,
      name: "IIT Delhi",
      location: "New Delhi",
      ranking: "2",
      courses: ["Computer Science", "Electronics", "Civil"],
      fees: "₹2.1L per year",
      placement: "₹22L average",
      cutoff: "JEE Advanced: 242",
      seats: 1100,
      highlights: [
        "Excellence in research",
        "Strong industry connections",
        "Modern infrastructure"
      ]
    },
    {
      id: 3,
      name: "BITS Pilani",
      location: "Pilani, Rajasthan",
      ranking: "3",
      courses: ["Computer Science", "Electronics", "Chemical"],
      fees: "₹4.5L per year",
      placement: "₹20L average",
      cutoff: "BITSAT: 340",
      seats: 900,
      highlights: [
        "Practice School Program",
        "Flexible curriculum",
        "Global exposure"
      ]
    }
  ];

  const handleCollegeSelect = (college) => {
    if (selectedColleges.find(c => c.id === college.id)) {
      setSelectedColleges(selectedColleges.filter(c => c.id !== college.id));
    } else if (selectedColleges.length < 3) {
      setSelectedColleges([...selectedColleges, college]);
    }
  };

  return (
    <div className="w-full py-12">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-primary mb-4">Compare Colleges</h3>
          <p className="text-gray-600">Select up to 3 colleges to compare</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {colleges.map(college => (
            <div
              key={college.id}
              className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                selectedColleges.find(c => c.id === college.id)
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-primary/50'
              }`}
              onClick={() => handleCollegeSelect(college)}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-bold text-primary">{college.name}</h4>
                  <p className="text-gray-600">{college.location}</p>
                </div>
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  Rank #{college.ranking}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FaGraduationCap className="text-primary" />
                  <span className="text-gray-600">{college.courses.join(", ")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaRupeeSign className="text-primary" />
                  <span className="text-gray-600">{college.fees}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaTrophy className="text-primary" />
                  <span className="text-gray-600">{college.placement}</span>
                </div>
              </div>

              <div className="mt-4">
                <h5 className="font-semibold mb-2">Key Highlights:</h5>
                <ul className="space-y-2">
                  {college.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                      <FaCheckCircle className="text-green-500 flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {selectedColleges.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-primary mb-6">Detailed Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary/5">
                    <th className="p-4 text-left">Parameters</th>
                    {selectedColleges.map(college => (
                      <th key={college.id} className="p-4 text-left">{college.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4 font-semibold">Location</td>
                    {selectedColleges.map(college => (
                      <td key={college.id} className="p-4">{college.location}</td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-4 font-semibold">Fees</td>
                    {selectedColleges.map(college => (
                      <td key={college.id} className="p-4">{college.fees}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Placement</td>
                    {selectedColleges.map(college => (
                      <td key={college.id} className="p-4">{college.placement}</td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-4 font-semibold">Cutoff</td>
                    {selectedColleges.map(college => (
                      <td key={college.id} className="p-4">{college.cutoff}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Total Seats</td>
                    {selectedColleges.map(college => (
                      <td key={college.id} className="p-4">{college.seats}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegeComparison;