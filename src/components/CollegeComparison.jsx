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
    jee_mains: [
      { input: { physics: 90, chemistry: 85, maths: 95 }, output: { rank: 5000 } },
      { input: { physics: 85, chemistry: 80, maths: 90 }, output: { rank: 8000 } },
      { input: { physics: 80, chemistry: 75, maths: 85 }, output: { rank: 12000 } },
      { input: { physics: 75, chemistry: 70, maths: 80 }, output: { rank: 15000 } },
      { input: { physics: 70, chemistry: 65, maths: 75 }, output: { rank: 20000 } },
      { input: { physics: 65, chemistry: 60, maths: 70 }, output: { rank: 25000 } },
    ],
    jee_advanced: [
      { input: { physics: 92, chemistry: 88, maths: 96 }, output: { rank: 800 } },
      { input: { physics: 88, chemistry: 85, maths: 92 }, output: { rank: 1200 } },
      { input: { physics: 85, chemistry: 82, maths: 88 }, output: { rank: 2000 } },
      { input: { physics: 82, chemistry: 78, maths: 85 }, output: { rank: 2500 } },
      { input: { physics: 78, chemistry: 75, maths: 82 }, output: { rank: 3000 } },
      { input: { physics: 75, chemistry: 72, maths: 78 }, output: { rank: 3500 } },
    ],
    bitsat: [
      { input: { physics: 90, chemistry: 85, maths: 90 }, output: { rank: 350 } },
      { input: { physics: 85, chemistry: 82, maths: 88 }, output: { rank: 500 } },
      { input: { physics: 82, chemistry: 80, maths: 85 }, output: { rank: 800 } },
      { input: { physics: 80, chemistry: 78, maths: 82 }, output: { rank: 1000 } },
      { input: { physics: 75, chemistry: 72, maths: 78 }, output: { rank: 1500 } },
      { input: { physics: 70, chemistry: 68, maths: 75 }, output: { rank: 2000 } },
    ],
  };

  // College data with cutoffs
  const collegeData = {
    jee_mains: [
      { name: "NIT Trichy - CSE", cutoff: 8000, category: "Top NIT" },
      { name: "NIT Warangal - ECE", cutoff: 10000, category: "Top NIT" },
      { name: "NIT Surathkal - Mechanical", cutoff: 12000, category: "Top NIT" },
      { name: "NIT Rourkela - Chemical", cutoff: 15000, category: "Top NIT" },
      { name: "NIT Calicut - Civil", cutoff: 18000, category: "Top NIT" },
    ],
    jee_advanced: [
      { name: "IIT Bombay - CSE", cutoff: 1000, category: "Top IIT" },
      { name: "IIT Delhi - ECE", cutoff: 1500, category: "Top IIT" },
      { name: "IIT Madras - Mechanical", cutoff: 2000, category: "Top IIT" },
      { name: "IIT Kanpur - Chemical", cutoff: 2500, category: "Top IIT" },
      { name: "IIT Kharagpur - Civil", cutoff: 3000, category: "Top IIT" },
    ],
    bitsat: [
      { name: "BITS Pilani - CSE", cutoff: 500, category: "BITS" },
      { name: "BITS Hyderabad - ECE", cutoff: 800, category: "BITS" },
      { name: "BITS Goa - Mechanical", cutoff: 1000, category: "BITS" },
      { name: "BITS Pilani - Chemical", cutoff: 1200, category: "BITS" },
      { name: "BITS Hyderabad - Civil", cutoff: 1500, category: "BITS" },
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