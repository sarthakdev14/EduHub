import { useState } from 'react';
import { FaSearch, FaFilter, FaUniversity } from 'react-icons/fa';

const CutoffExplorer = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const cutoffData = [
    {
      college: "IIT Bombay",
      branch: "Computer Science",
      category: "IIT",
      cutoffs: {
        "2023": { general: 2100, obc: 5500, sc: 8900, st: 9800 },
        "2022": { general: 2300, obc: 5800, sc: 9200, st: 10100 },
        "2021": { general: 2500, obc: 6000, sc: 9500, st: 10500 }
      }
    },
    {
      college: "IIT Delhi",
      branch: "Electrical Engineering",
      category: "IIT",
      cutoffs: {
        "2023": { general: 3200, obc: 6800, sc: 10200, st: 11500 },
        "2022": { general: 3500, obc: 7200, sc: 10800, st: 12000 },
        "2021": { general: 3800, obc: 7500, sc: 11200, st: 12500 }
      }
    },
    {
      college: "NIT Trichy",
      branch: "Mechanical Engineering",
      category: "NIT",
      cutoffs: {
        "2023": { general: 12000, obc: 18000, sc: 25000, st: 28000 },
        "2022": { general: 13000, obc: 19000, sc: 26000, st: 29000 },
        "2021": { general: 14000, obc: 20000, sc: 27000, st: 30000 }
      }
    }
  ];

  const filteredData = cutoffData.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.branch.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full py-12">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-primary mb-4">Cutoff Explorer</h3>
          <p className="text-gray-600">Analyze trends and plan your college choices</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search colleges or branches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 rounded-md focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-md ${
                selectedCategory === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedCategory('IIT')}
              className={`px-4 py-2 rounded-md ${
                selectedCategory === 'IIT'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              IITs
            </button>
            <button
              onClick={() => setSelectedCategory('NIT')}
              className={`px-4 py-2 rounded-md ${
                selectedCategory === 'NIT'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              NITs
            </button>
          </div>
        </div>

        <div className="grid gap-6">
          {filteredData.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-xl font-bold text-primary">{item.college}</h4>
                  <p className="text-gray-600">{item.branch}</p>
                </div>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  {item.category}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-3 text-left">Year</th>
                      <th className="p-3 text-left">General</th>
                      <th className="p-3 text-left">OBC</th>
                      <th className="p-3 text-left">SC</th>
                      <th className="p-3 text-left">ST</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(item.cutoffs).map(([year, ranks]) => (
                      <tr key={year} className="border-t">
                        <td className="p-3 font-semibold">{year}</td>
                        <td className="p-3">{ranks.general.toLocaleString()}</td>
                        <td className="p-3">{ranks.obc.toLocaleString()}</td>
                        <td className="p-3">{ranks.sc.toLocaleString()}</td>
                        <td className="p-3">{ranks.st.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex justify-end">
                <button className="text-primary hover:text-secondary transition-colors">
                  View More Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CutoffExplorer;