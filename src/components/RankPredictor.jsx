import { useState } from 'react';
import { FaCalculator, FaChartLine, FaUniversity } from 'react-icons/fa';

const RankPredictor = () => {
  const [scores, setScores] = useState({
    physics: '',
    chemistry: '',
    maths: '',
  });
  const [predictedRank, setPredictedRank] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const collegeData = [
    {
      name: "IIT Bombay - CSE",
      cutoff: 5000,
      category: "Top IIT"
    },
    {
      name: "IIT Delhi - ECE",
      cutoff: 8000,
      category: "Top IIT"
    },
    {
      name: "NIT Trichy - Mechanical",
      cutoff: 15000,
      category: "Top NIT"
    },
    {
      name: "BITS Pilani - Chemical",
      cutoff: 20000,
      category: "Private"
    }
  ];

  const handleInputChange = (subject, value) => {
    if (value === '' || (value >= 0 && value <= 100)) {
      setScores({ ...scores, [subject]: value });
    }
  };

  const predictRank = () => {
    // Simple rank prediction algorithm (for demonstration)
    const totalScore = (Number(scores.physics) + Number(scores.chemistry) + Number(scores.maths)) / 3;
    const estimatedRank = Math.round(100000 * (1 - totalScore / 100));
    setPredictedRank(estimatedRank);

    // Suggest colleges based on rank
    const suggestedColleges = collegeData.filter(college => college.cutoff >= estimatedRank);
    setSuggestions(suggestedColleges);
  };

  return (
    <div className="w-full py-12">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <FaCalculator className="text-3xl text-primary" />
              <h3 className="text-2xl font-bold text-primary">Rank Predictor</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Physics Score (0-100)
                </label>
                <input
                  type="number"
                  value={scores.physics}
                  onChange={(e) => handleInputChange('physics', e.target.value)}
                  className="w-full p-3 border-2 rounded-md focus:outline-none focus:border-primary"
                  placeholder="Enter physics score"
                  min="0"
                  max="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chemistry Score (0-100)
                </label>
                <input
                  type="number"
                  value={scores.chemistry}
                  onChange={(e) => handleInputChange('chemistry', e.target.value)}
                  className="w-full p-3 border-2 rounded-md focus:outline-none focus:border-primary"
                  placeholder="Enter chemistry score"
                  min="0"
                  max="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mathematics Score (0-100)
                </label>
                <input
                  type="number"
                  value={scores.maths}
                  onChange={(e) => handleInputChange('maths', e.target.value)}
                  className="w-full p-3 border-2 rounded-md focus:outline-none focus:border-primary"
                  placeholder="Enter mathematics score"
                  min="0"
                  max="100"
                />
              </div>

              <button
                onClick={predictRank}
                className="w-full bg-primary text-white py-3 rounded-md hover:bg-secondary transition-all font-semibold"
                disabled={!scores.physics || !scores.chemistry || !scores.maths}
              >
                Predict Rank
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            {predictedRank !== null && (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <FaChartLine className="text-3xl text-primary" />
                  <h3 className="text-2xl font-bold text-primary">Your Predicted Rank</h3>
                </div>

                <div className="text-center mb-8">
                  <div className="text-5xl font-bold text-primary mb-2">
                    {predictedRank.toLocaleString()}
                  </div>
                  <p className="text-gray-600">Estimated JEE Main Rank</p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <FaUniversity className="text-2xl text-primary" />
                    <h4 className="text-xl font-semibold">Suggested Colleges</h4>
                  </div>

                  <div className="space-y-4">
                    {suggestions.map((college, index) => (
                      <div
                        key={index}
                        className="p-4 border-2 border-primary/10 rounded-lg hover:border-primary/30 transition-all"
                      >
                        <h5 className="font-semibold text-primary">{college.name}</h5>
                        <p className="text-gray-600">Previous Year Cutoff: {college.cutoff}</p>
                        <span className="inline-block mt-2 text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                          {college.category}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {predictedRank === null && (
              <div className="h-full flex items-center justify-center text-gray-500">
                Enter your scores to see predictions
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankPredictor;