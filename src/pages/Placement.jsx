import React, { useState } from "react";
import { collegedata } from "../API/placement_data"; // Ensure correct path

const Placement = () => {
  const [search, setSearch] = useState({ college: "", year: "" });
  const [filteredData, setFilteredData] = useState([]);
  const [searched, setSearched] = useState(false); // New state to track if search was performed

  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    if (!search.college || !search.year) {
      setFilteredData([]); 
      setSearched(false); // Reset search state if input is empty
      return;
    }

    const result = collegedata.filter(
      (item) =>
        item.college.toLowerCase().includes(search.college.toLowerCase()) &&
        item.year.toString() === search.year
    );

    setFilteredData(result);
    setSearched(true); // Set search as performed
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary text-center">
        Placement Search
      </h2>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg md:max-w-xl lg:max-w-2xl">
        <input
          type="text"
          name="college"
          placeholder="Enter College Name"
          value={search.college}
          onChange={handleChange}
          className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary text-base sm:text-lg"
        />
        <input
          type="number"
          name="year"
          placeholder="Enter Year"
          value={search.year}
          onChange={handleChange}
          className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary text-base sm:text-lg"
        />
        <button
          onClick={handleSearch}
          className="w-full bg-primary text-white p-3 rounded-md font-semibold hover:bg-secondary transition-all text-base sm:text-lg"
        >
          Search
        </button>
      </div>

      <div className="mt-6 w-full max-w-7xl">
        {filteredData.length > 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredData.map((item, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h3 className="text-lg sm:text-xl font-bold text-primary">
                  {item.college} ({item.year})
                </h3>
                <p className="text-gray-700 text-sm sm:text-base">
                   Branch: {item.branch}
                </p>
                <p className="text-gray-700 text-sm sm:text-base">
                   Avg Package: {item.avg_package} LPA
                </p>
              </div>
            ))}
          </div>
        ) : (
          searched && ( // Show message only if search was performed
            <p className="mt-4 text-red-500 text-center text-sm sm:text-base">
              No results found.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default Placement;
