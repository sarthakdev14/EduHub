import { useState } from 'react';
import { FaCalendar, FaClock, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';

const ExamCalendar = () => {
  const [selectedMonth, setSelectedMonth] = useState('March');

  const exams = [
    {
      id: 1,
      name: "JEE Main 2025 Session 2",
      date: "March 10-15, 2025",
      registration: "Closed",
      status: "Upcoming",
      important: [
        "Admit card release: March 5",
        "Results expected: March 31",
        "Carry valid ID proof"
      ]
    },
    {
      id: 2,
      name: "BITSAT 2025",
      date: "March 20-25, 2025",
      registration: "Open till March 10",
      status: "Registration Open",
      important: [
        "Slot booking starts: March 15",
        "Mock test available",
        "Keep passport size photo ready"
      ]
    },
    {
      id: 3,
      name: "VITEEE 2025",
      date: "April 5-10, 2025",
      registration: "Open till March 30",
      status: "Registration Open",
      important: [
        "Application fee: ₹1200",
        "Online mode only",
        "Multiple attempts allowed"
      ]
    }
  ];

  return (
    <div className="w-full py-12">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-primary mb-4">Upcoming Exams</h3>
          <p className="text-gray-600">Stay updated with important exam dates and deadlines</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {exams.map(exam => (
            <div key={exam.id} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-xl font-bold text-primary">{exam.name}</h4>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  exam.status === "Registration Open"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}>
                  {exam.status}
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <FaCalendar className="text-primary" />
                  <span className="text-gray-600">{exam.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-primary" />
                  <span className="text-gray-600">Registration: {exam.registration}</span>
                </div>
              </div>

              <div>
                <h5 className="font-semibold mb-2 flex items-center gap-2">
                  <FaExclamationCircle className="text-primary" />
                  Important Notes:
                </h5>
                <ul className="space-y-2">
                  {exam.important.map((note, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                      <FaCheckCircle className="text-green-500 flex-shrink-0" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-primary/5 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-primary mb-6">Quick Tips</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-semibold mb-2">Documents Checklist</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  <span>Valid ID Proof</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  <span>Passport Size Photos</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  <span>Class 12 Marksheet</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-semibold mb-2">Exam Day Guidelines</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  <span>Reach center 1 hour early</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  <span>Carry admit card</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  <span>Check allowed items</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-semibold mb-2">Important Links</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  <span>Download Sample Papers</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  <span>Mock Test Portal</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  <span>FAQs</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamCalendar;