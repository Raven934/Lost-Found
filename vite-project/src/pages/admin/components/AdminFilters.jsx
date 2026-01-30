import React, { useState } from 'react';

export default function AdminFilters({ onFilterChange }) {
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('');

  const handleTypeChange = (value) => {
    setType(value);
    onFilterChange('type', value);
  };

  const handleLocationChange = (value) => {
    setLocation(value);
    onFilterChange('location', value);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    onFilterChange('status', value);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6 flex gap-4">
      <div>
        <label className="block text-sm font-medium mb-2">Type</label>
        <select
          value={type}
          onChange={(e) => handleTypeChange(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">All</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => handleLocationChange(e.target.value)}
          placeholder="Search location..."
          className="px-4 py-2 border rounded-lg"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Status</label>
        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">All</option>
          <option value="unclaimed">Unclaimed</option>
          <option value="claimed">Claimed</option>
        </select>
      </div>
    </div>
  );
}
