import { useState, useEffect } from 'react';
import * as ml5 from 'ml5';
import { FaCalculator, FaChartLine, FaUniversity } from 'react-icons/fa';

const CollegeComparison = () => {
  const [examType, setExamType] = useState('');
  const [scores, setScores] = useState({ physics: '', chemistry: '', maths: '' });
  const [predictedRank, setPredictedRank] = useState(null);
  const [suggestedColleges, setSuggestedColleges] = useState([]);
  const [regressor, setRegressor] = useState(null);

  // Training data for different exams
  const trainingData = {
    jee_mains:[
  { input: { physics: 100, chemistry: 100, maths: 100 }, output: { rank: 1 } },
  { input: { physics: 99, chemistry: 99, maths: 99 }, output: { rank: 100 } },
  { input: { physics: 98, chemistry: 98, maths: 98 }, output: { rank: 300 } },
  { input: { physics: 97, chemistry: 97, maths: 97 }, output: { rank: 600 } },
  { input: { physics: 96, chemistry: 96, maths: 96 }, output: { rank: 900 } },
  { input: { physics: 95, chemistry: 95, maths: 95 }, output: { rank: 1500 } },
  { input: { physics: 94, chemistry: 94, maths: 94 }, output: { rank: 2000 } },
  { input: { physics: 93, chemistry: 93, maths: 93 }, output: { rank: 3000 } },
  { input: { physics: 92, chemistry: 92, maths: 92 }, output: { rank: 4000 } },
  { input: { physics: 91, chemistry: 91, maths: 91 }, output: { rank: 5000 } },
  { input: { physics: 90, chemistry: 90, maths: 90 }, output: { rank: 6000 } },
  { input: { physics: 89, chemistry: 89, maths: 89 }, output: { rank: 7000 } },
  { input: { physics: 88, chemistry: 88, maths: 88 }, output: { rank: 8000 } },
  { input: { physics: 87, chemistry: 87, maths: 87 }, output: { rank: 9000 } },
  { input: { physics: 86, chemistry: 86, maths: 86 }, output: { rank: 10000 } },
  { input: { physics: 85, chemistry: 85, maths: 85 }, output: { rank: 12000 } },
  { input: { physics: 84, chemistry: 84, maths: 84 }, output: { rank: 14000 } },
  { input: { physics: 83, chemistry: 83, maths: 83 }, output: { rank: 16000 } },
  { input: { physics: 82, chemistry: 82, maths: 82 }, output: { rank: 18000 } },
  { input: { physics: 81, chemistry: 81, maths: 81 }, output: { rank: 20000 } },
  { input: { physics: 80, chemistry: 80, maths: 80 }, output: { rank: 22000 } },
  { input: { physics: 78, chemistry: 78, maths: 78 }, output: { rank: 25000 } },
  { input: { physics: 75, chemistry: 75, maths: 75 }, output: { rank: 30000 } },
  { input: { physics: 73, chemistry: 73, maths: 73 }, output: { rank: 35000 } },
  { input: { physics: 70, chemistry: 70, maths: 70 }, output: { rank: 40000 } },
  { input: { physics: 68, chemistry: 68, maths: 68 }, output: { rank: 45000 } },
  { input: { physics: 65, chemistry: 65, maths: 65 }, output: { rank: 50000 } },
  { input: { physics: 63, chemistry: 63, maths: 63 }, output: { rank: 55000 } },
  { input: { physics: 60, chemistry: 60, maths: 60 }, output: { rank: 60000 } },
  { input: { physics: 58, chemistry: 58, maths: 58 }, output: { rank: 65000 } },
  { input: { physics: 55, chemistry: 55, maths: 55 }, output: { rank: 70000 } },
  { input: { physics: 53, chemistry: 53, maths: 53 }, output: { rank: 75000 } },
  { input: { physics: 50, chemistry: 50, maths: 50 }, output: { rank: 80000 } },
  { input: { physics: 48, chemistry: 48, maths: 48 }, output: { rank: 85000 } },
  { input: { physics: 45, chemistry: 45, maths: 45 }, output: { rank: 90000 } },
  { input: { physics: 43, chemistry: 43, maths: 43 }, output: { rank: 95000 } },
  { input: { physics: 40, chemistry: 40, maths: 40 }, output: { rank: 100000 } },
  { input: { physics: 38, chemistry: 38, maths: 38 }, output: { rank: 110000 } },
  { input: { physics: 35, chemistry: 35, maths: 35 }, output: { rank: 120000 } },
  { input: { physics: 33, chemistry: 33, maths: 33 }, output: { rank: 130000 } },
  { input: { physics: 30, chemistry: 30, maths: 30 }, output: { rank: 140000 } },
  { input: { physics: 28, chemistry: 28, maths: 28 }, output: { rank: 150000 } },
  { input: { physics: 25, chemistry: 25, maths: 25 }, output: { rank: 160000 } },
  { input: { physics: 23, chemistry: 23, maths: 23 }, output: { rank: 170000 } },
  { input: { physics: 20, chemistry: 20, maths: 20 }, output: { rank: 180000 } },
  { input: { physics: 18, chemistry: 18, maths: 18 }, output: { rank: 190000 } },
  { input: { physics: 15, chemistry: 15, maths: 15 }, output: { rank: 200000 } },
  { input: { physics: 10, chemistry: 10, maths: 10 }, output: { rank: 220000 } },
  { input: { physics: 8, chemistry: 8, maths: 8 }, output: { rank: 240000 } },
  { input: { physics: 5, chemistry: 5, maths: 5 }, output: { rank: 260000 } },
],
    jee_advanced: [
  { input: { physics: 120, chemistry: 120, maths: 120 }, output: { rank: 1 } },
  { input: { physics: 118, chemistry: 119, maths: 118 }, output: { rank: 50 } },
  { input: { physics: 115, chemistry: 116, maths: 117 }, output: { rank: 100 } },
  { input: { physics: 110, chemistry: 112, maths: 113 }, output: { rank: 250 } },
  { input: { physics: 105, chemistry: 108, maths: 110 }, output: { rank: 500 } },
  { input: { physics: 100, chemistry: 105, maths: 108 }, output: { rank: 1000 } },
  { input: { physics: 98, chemistry: 102, maths: 105 }, output: { rank: 1500 } },
  { input: { physics: 95, chemistry: 98, maths: 100 }, output: { rank: 2000 } },
  { input: { physics: 92, chemistry: 95, maths: 98 }, output: { rank: 2500 } },
  { input: { physics: 90, chemistry: 92, maths: 95 }, output: { rank: 3000 } },
  { input: { physics: 85, chemistry: 90, maths: 92 }, output: { rank: 4000 } },
  { input: { physics: 82, chemistry: 88, maths: 90 }, output: { rank: 5000 } },
  { input: { physics: 80, chemistry: 85, maths: 88 }, output: { rank: 6000 } },
  { input: { physics: 78, chemistry: 82, maths: 86 }, output: { rank: 7000 } },
  { input: { physics: 75, chemistry: 80, maths: 83 }, output: { rank: 8000 } },
  { input: { physics: 72, chemistry: 78, maths: 80 }, output: { rank: 9000 } },
  { input: { physics: 70, chemistry: 75, maths: 78 }, output: { rank: 10000 } },
  { input: { physics: 68, chemistry: 73, maths: 75 }, output: { rank: 11000 } },
  { input: { physics: 65, chemistry: 70, maths: 73 }, output: { rank: 12000 } },
  { input: { physics: 62, chemistry: 68, maths: 70 }, output: { rank: 13000 } },
  { input: { physics: 60, chemistry: 65, maths: 68 }, output: { rank: 14000 } },
  { input: { physics: 58, chemistry: 63, maths: 65 }, output: { rank: 15000 } },
  { input: { physics: 55, chemistry: 60, maths: 63 }, output: { rank: 16000 } },
  { input: { physics: 53, chemistry: 58, maths: 60 }, output: { rank: 17000 } },
  { input: { physics: 50, chemistry: 55, maths: 58 }, output: { rank: 18000 } },
  { input: { physics: 48, chemistry: 53, maths: 55 }, output: { rank: 19000 } },
  { input: { physics: 45, chemistry: 50, maths: 53 }, output: { rank: 20000 } },
  { input: { physics: 42, chemistry: 48, maths: 50 }, output: { rank: 21000 } },
  { input: { physics: 40, chemistry: 45, maths: 48 }, output: { rank: 22000 } },
  { input: { physics: 38, chemistry: 42, maths: 45 }, output: { rank: 23000 } },
  { input: { physics: 35, chemistry: 40, maths: 43 }, output: { rank: 24000 } },
  { input: { physics: 33, chemistry: 38, maths: 40 }, output: { rank: 25000 } },
  { input: { physics: 30, chemistry: 35, maths: 38 }, output: { rank: 26000 } },
  { input: { physics: 28, chemistry: 32, maths: 35 }, output: { rank: 27000 } },
  { input: { physics: 25, chemistry: 30, maths: 33 }, output: { rank: 28000 } },
  { input: { physics: 23, chemistry: 28, maths: 30 }, output: { rank: 29000 } },
  { input: { physics: 20, chemistry: 25, maths: 28 }, output: { rank: 30000 } },
],
  };

  // College data with cutoffs
  const collegeData = {
    jee_mains: [
    { name: "NIT Trichy - CSE", cutoff: 8000, category: "Top NIT" },
    { name: "NIT Warangal - CSE", cutoff: 8500, category: "Top NIT" },
    { name: "NIT Surathkal - CSE", cutoff: 9000, category: "Top NIT" },
    { name: "NIT Calicut - CSE", cutoff: 9500, category: "Top NIT" },
    { name: "NIT Rourkela - CSE", cutoff: 10000, category: "Top NIT" },
    { name: "NIT Allahabad - CSE", cutoff: 10500, category: "Top NIT" },
    { name: "NIT Jaipur - CSE", cutoff: 11000, category: "Top NIT" },
    { name: "NIT Bhopal - CSE", cutoff: 11500, category: "Top NIT" },
    { name: "NIT Kurukshetra - CSE", cutoff: 12000, category: "Top NIT" },
    { name: "NIT Durgapur - CSE", cutoff: 12500, category: "Top NIT" },

    { name: "NIT Trichy - ECE", cutoff: 10000, category: "Top NIT" },
    { name: "NIT Warangal - ECE", cutoff: 10500, category: "Top NIT" },
    { name: "NIT Surathkal - ECE", cutoff: 11000, category: "Top NIT" },
    { name: "NIT Calicut - ECE", cutoff: 11500, category: "Top NIT" },
    { name: "NIT Rourkela - ECE", cutoff: 12000, category: "Top NIT" },
    { name: "NIT Allahabad - ECE", cutoff: 12500, category: "Top NIT" },
    { name: "NIT Jaipur - ECE", cutoff: 13000, category: "Top NIT" },
    { name: "NIT Bhopal - ECE", cutoff: 13500, category: "Top NIT" },
    { name: "NIT Kurukshetra - ECE", cutoff: 14000, category: "Top NIT" },
    { name: "NIT Durgapur - ECE", cutoff: 14500, category: "Top NIT" },

    { name: "NIT Trichy - Electrical", cutoff: 12000, category: "Top NIT" },
    { name: "NIT Warangal - Electrical", cutoff: 12500, category: "Top NIT" },
    { name: "NIT Surathkal - Electrical", cutoff: 13000, category: "Top NIT" },
    { name: "NIT Calicut - Electrical", cutoff: 13500, category: "Top NIT" },
    { name: "NIT Rourkela - Electrical", cutoff: 14000, category: "Top NIT" },
    { name: "NIT Allahabad - Electrical", cutoff: 14500, category: "Top NIT" },
    { name: "NIT Jaipur - Electrical", cutoff: 15000, category: "Top NIT" },
    { name: "NIT Bhopal - Electrical", cutoff: 15500, category: "Top NIT" },
    { name: "NIT Kurukshetra - Electrical", cutoff: 16000, category: "Top NIT" },
    { name: "NIT Durgapur - Electrical", cutoff: 16500, category: "Top NIT" },

    { name: "NIT Trichy - Mechanical", cutoff: 14000, category: "Top NIT" },
    { name: "NIT Warangal - Mechanical", cutoff: 14500, category: "Top NIT" },
    { name: "NIT Surathkal - Mechanical", cutoff: 15000, category: "Top NIT" },
    { name: "NIT Calicut - Mechanical", cutoff: 15500, category: "Top NIT" },
    { name: "NIT Rourkela - Mechanical", cutoff: 16000, category: "Top NIT" },
    { name: "NIT Allahabad - Mechanical", cutoff: 16500, category: "Top NIT" },
    { name: "NIT Jaipur - Mechanical", cutoff: 17000, category: "Top NIT" },
    { name: "NIT Bhopal - Mechanical", cutoff: 17500, category: "Top NIT" },
    { name: "NIT Kurukshetra - Mechanical", cutoff: 18000, category: "Top NIT" },
    { name: "NIT Durgapur - Mechanical", cutoff: 18500, category: "Top NIT" },

    { name: "DTU - CSE", cutoff: 9000, category: "Top State College" },
    { name: "DTU - ECE", cutoff: 12000, category: "Top State College" },
    { name: "DTU - Electrical", cutoff: 14000, category: "Top State College" },
    { name: "DTU - Mechanical", cutoff: 16000, category: "Top State College" },

    { name: "NSUT - CSE", cutoff: 9500, category: "Top State College" },
    { name: "NSUT - ECE", cutoff: 12500, category: "Top State College" },
    { name: "NSUT - Electrical", cutoff: 14500, category: "Top State College" },
    { name: "NSUT - Mechanical", cutoff: 16500, category: "Top State College" },

    { name: "NIT Jalandhar - CSE", cutoff: 13000, category: "Good NIT" },
    { name: "NIT Jalandhar - ECE", cutoff: 15000, category: "Good NIT" },
    { name: "NIT Jalandhar - Electrical", cutoff: 17000, category: "Good NIT" },
    { name: "NIT Jalandhar - Mechanical", cutoff: 19000, category: "Good NIT" },

    { name: "NIT Silchar - CSE", cutoff: 14000, category: "Good NIT" },
    { name: "NIT Silchar - ECE", cutoff: 16000, category: "Good NIT" },
    { name: "NIT Silchar - Electrical", cutoff: 18000, category: "Good NIT" },
    { name: "NIT Silchar - Mechanical", cutoff: 20000, category: "Good NIT" },

    { name: "NIT Hamirpur - CSE", cutoff: 15000, category: "Good NIT" },
    { name: "NIT Hamirpur - ECE", cutoff: 17000, category: "Good NIT" },
    { name: "NIT Hamirpur - Electrical", cutoff: 19000, category: "Good NIT" },
    { name: "NIT Hamirpur - Mechanical", cutoff: 21000, category: "Good NIT" },

    { name: "NIT Patna - CSE", cutoff: 16000, category: "Good NIT" },
    { name: "NIT Patna - ECE", cutoff: 18000, category: "Good NIT" },
    { name: "NIT Patna - Electrical", cutoff: 20000, category: "Good NIT" },
    { name: "NIT Patna - Mechanical", cutoff: 22000, category: "Good NIT" },
    ],
    jee_advanced: [
    { name: "IIT Bombay - CSE", cutoff: 65, category: "Top IIT" },
    { name: "IIT Delhi - CSE", cutoff: 100, category: "Top IIT" },
    { name: "IIT Kanpur - CSE", cutoff: 200, category: "Top IIT" },
    { name: "IIT Madras - CSE", cutoff: 250, category: "Top IIT" },
    { name: "IIT Kharagpur - CSE", cutoff: 350, category: "Top IIT" },
    { name: "IIT Roorkee - CSE", cutoff: 500, category: "Top IIT" },
    { name: "IIT Guwahati - CSE", cutoff: 600, category: "Top IIT" },
    { name: "IIT Hyderabad - CSE", cutoff: 750, category: "Top IIT" },
    { name: "IIT Indore - CSE", cutoff: 1100, category: "Top IIT" },
    { name: "IIT BHU - CSE", cutoff: 1300, category: "Top IIT" },

    { name: "IIT Bombay - ECE", cutoff: 500, category: "Top IIT" },
    { name: "IIT Delhi - ECE", cutoff: 700, category: "Top IIT" },
    { name: "IIT Kanpur - ECE", cutoff: 900, category: "Top IIT" },
    { name: "IIT Madras - ECE", cutoff: 1000, category: "Top IIT" },
    { name: "IIT Kharagpur - ECE", cutoff: 1200, category: "Top IIT" },
    { name: "IIT Roorkee - ECE", cutoff: 1500, category: "Top IIT" },
    { name: "IIT Guwahati - ECE", cutoff: 1700, category: "Top IIT" },
    { name: "IIT Hyderabad - ECE", cutoff: 2000, category: "Top IIT" },
    { name: "IIT Indore - ECE", cutoff: 2500, category: "Top IIT" },
    { name: "IIT BHU - ECE", cutoff: 2800, category: "Top IIT" },

    { name: "IIT Bombay - Electrical", cutoff: 1000, category: "Top IIT" },
    { name: "IIT Delhi - Electrical", cutoff: 1300, category: "Top IIT" },
    { name: "IIT Kanpur - Electrical", cutoff: 1600, category: "Top IIT" },
    { name: "IIT Madras - Electrical", cutoff: 1800, category: "Top IIT" },
    { name: "IIT Kharagpur - Electrical", cutoff: 2000, category: "Top IIT" },
    { name: "IIT Roorkee - Electrical", cutoff: 2500, category: "Top IIT" },
    { name: "IIT Guwahati - Electrical", cutoff: 2800, category: "Top IIT" },
    { name: "IIT Hyderabad - Electrical", cutoff: 3000, category: "Top IIT" },
    { name: "IIT Indore - Electrical", cutoff: 3500, category: "Top IIT" },
    { name: "IIT BHU - Electrical", cutoff: 4000, category: "Top IIT" },

    { name: "IIT Bombay - Mechanical", cutoff: 2000, category: "Top IIT" },
    { name: "IIT Delhi - Mechanical", cutoff: 2500, category: "Top IIT" },
    { name: "IIT Kanpur - Mechanical", cutoff: 3000, category: "Top IIT" },
    { name: "IIT Madras - Mechanical", cutoff: 3500, category: "Top IIT" },
    { name: "IIT Kharagpur - Mechanical", cutoff: 4000, category: "Top IIT" },
    { name: "IIT Roorkee - Mechanical", cutoff: 4500, category: "Top IIT" },
    { name: "IIT Guwahati - Mechanical", cutoff: 5000, category: "Top IIT" },
    { name: "IIT Hyderabad - Mechanical", cutoff: 5500, category: "Top IIT" },
    { name: "IIT Indore - Mechanical", cutoff: 6000, category: "Top IIT" },
    { name: "IIT BHU - Mechanical", cutoff: 6500, category: "Top IIT" },

    { name: "IIT Bhubaneswar - CSE", cutoff: 2800, category: "New IIT" },
    { name: "IIT Bhubaneswar - ECE", cutoff: 4000, category: "New IIT" },
    { name: "IIT Bhubaneswar - Electrical", cutoff: 5000, category: "New IIT" },
    { name: "IIT Bhubaneswar - Mechanical", cutoff: 6000, category: "New IIT" },

    { name: "IIT Gandhinagar - CSE", cutoff: 3200, category: "New IIT" },
    { name: "IIT Gandhinagar - ECE", cutoff: 4500, category: "New IIT" },
    { name: "IIT Gandhinagar - Electrical", cutoff: 5500, category: "New IIT" },
    { name: "IIT Gandhinagar - Mechanical", cutoff: 7000, category: "New IIT" },

    { name: "IIT Jodhpur - CSE", cutoff: 3500, category: "New IIT" },
    { name: "IIT Jodhpur - ECE", cutoff: 4800, category: "New IIT" },
    { name: "IIT Jodhpur - Electrical", cutoff: 6000, category: "New IIT" },
    { name: "IIT Jodhpur - Mechanical", cutoff: 7500, category: "New IIT" },

    { name: "IIT Patna - CSE", cutoff: 3800, category: "New IIT" },
    { name: "IIT Patna - ECE", cutoff: 5000, category: "New IIT" },
    { name: "IIT Patna - Electrical", cutoff: 6500, category: "New IIT" },
    { name: "IIT Patna - Mechanical", cutoff: 8000, category: "New IIT" },

    { name: "IIT Ropar - CSE", cutoff: 4000, category: "New IIT" },
    { name: "IIT Ropar - ECE", cutoff: 5300, category: "New IIT" },
    { name: "IIT Ropar - Electrical", cutoff: 7000, category: "New IIT" },
    { name: "IIT Ropar - Mechanical", cutoff: 8500, category: "New IIT" },

    { name: "IIT Mandi - CSE", cutoff: 4200, category: "New IIT" },
    { name: "IIT Mandi - ECE", cutoff: 5500, category: "New IIT" },
    { name: "IIT Mandi - Electrical", cutoff: 7500, category: "New IIT" },
    { name: "IIT Mandi - Mechanical", cutoff: 9000, category: "New IIT" },
    ],
  };
  useEffect(() => {
    if (!examType) return;

    // Initialize and train ML model when exam type changes
    const model = ml5.neuralNetwork({
      task: 'regression',
      debug: true,
      layers: [
        { type: 'dense', units: 16, activation: 'relu' },
        { type: 'dense', units: 8, activation: 'relu' },
        { type: 'dense', units: 1, activation: 'linear' },
      ],
    });

    // Add training data for selected exam
    trainingData[examType].forEach(data => {
      model.addData(data.input, data.output);
    });

    // Normalize and train the model
    model.normalizeData();
    model.train({ epochs: 100 }, () => {
      setRegressor(model);
    });
  }, [examType]);

  const handleInputChange = (subject, value) => {
    if (value === '' || (value >= 0 && value <= 100)) {
      setScores({ ...scores, [subject]: value });
    }
  };

  const predictRank = () => {
    if (!regressor) return;

    const inputs = {
      physics: Number(scores.physics),
      chemistry: Number(scores.chemistry),
      maths: Number(scores.maths)
    };

    regressor.predict(inputs, (error, results) => {
      if (!error) {
        const predictedRank = Math.round(results[0].rank);
        setPredictedRank(predictedRank);

        // Suggest colleges based on predicted rank
        const suggestions = collegeData[examType]
          .filter(college => college.cutoff >= predictedRank)
          .slice(0, 5);
        setSuggestedColleges(suggestions);
      }
    });
  };

  const examNames = {
    jee_mains: "JEE Mains",
    jee_advanced: "JEE Advanced",
    bitsat: "BITSAT"
  };

  return (
    <div className="w-full py-12">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <FaCalculator className="text-3xl text-primary" />
              <h3 className="text-2xl font-bold text-primary">Rank Predictor</h3>
            </div>

            {/* Exam Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Exam
              </label>
              <select
                value={examType}
                onChange={(e) => {
                  setExamType(e.target.value);
                  setPredictedRank(null);
                  setSuggestedColleges([]);
                }}
                className="w-full p-3 border-2 rounded-md focus:outline-none focus:border-primary"
              >
                <option value="">-- Choose an Exam --</option>
                <option value="jee_mains">JEE Mains</option>
                <option value="jee_advanced">JEE Advanced</option>
                <option value="bitsat">BITSAT</option>
              </select>
            </div>

            {examType && (
              <div className="space-y-6">
                {/* Subject Scores */}
                {['physics', 'chemistry', 'maths'].map(subject => (
                  <div key={subject}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {subject.charAt(0).toUpperCase() + subject.slice(1)} Score (0-100)
                    </label>
                    <input
                      type="number"
                      value={scores[subject]}
                      onChange={(e) => handleInputChange(subject, e.target.value)}
                      className="w-full p-3 border-2 rounded-md focus:outline-none focus:border-primary"
                      placeholder={`Enter ${subject} score`}
                      min="0"
                      max="100"
                    />
                  </div>
                ))}

                <button
                  onClick={predictRank}
                  className="w-full bg-primary text-white py-3 rounded-md hover:bg-secondary transition-all font-semibold"
                  disabled={!scores.physics || !scores.chemistry || !scores.maths}
                >
                  Predict Rank
                </button>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            {predictedRank !== null ? (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <FaChartLine className="text-3xl text-primary" />
                  <h3 className="text-2xl font-bold text-primary">
                    Predicted {examNames[examType]} Rank
                  </h3>
                </div>

                <div className="text-center mb-8">
                  <div className="text-5xl font-bold text-primary mb-2">
                    {predictedRank.toLocaleString()}
                  </div>
                  <p className="text-gray-600">Based on your scores</p>
                </div>

                {suggestedColleges.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <FaUniversity className="text-2xl text-primary" />
                      <h4 className="text-xl font-semibold">Suggested Colleges</h4>
                    </div>

                    <div className="space-y-4">
                      {suggestedColleges.map((college, index) => (
                        <div
                          key={index}
                          className="p-4 border-2 border-primary/10 rounded-lg hover:border-primary/30 transition-all"
                        >
                          <h5 className="font-semibold text-primary">{college.name}</h5>
                          <p className="text-gray-600">Previous Year Cutoff: {college.cutoff.toLocaleString()}</p>
                          <span className="inline-block mt-2 text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                            {college.category}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                {examType ? 'Enter your scores to see predictions' : 'Select an exam to begin'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeComparison;
