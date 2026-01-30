import React from "react";

export default function Filter({ onFilterChange }) {
  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    onFilterChange('type', selectedType);
  };

  const handleLocationChange = (e) => {
    const selectedLocation = e.target.value;
    onFilterChange('location', selectedLocation);
  };

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Filter Items</h2>
      
      <div className="flex gap-4">
        <div>
          <label className="block mb-2 font-medium">Type:</label>
          <select 
            onChange={handleTypeChange}
            className="px-4 py-2 border rounded"
          >
            <option value="">All Types</option>
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">Location:</label>
          <input 
            type="text"
            onChange={handleLocationChange}
            placeholder="Enter location"
            className="px-4 py-2 border rounded"
          />
        </div>
      </div>
    </div>
  );
}
