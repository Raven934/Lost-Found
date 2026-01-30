import React from 'react';

export default function AdminItemCard({ item, onDelete, onStatusChange, onTypeChange }) {
  return (
    <div className="border border-gray-200 p-4 rounded-lg bg-white shadow-sm flex flex-col h-full">
      <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded mb-3" />
      
      <p className="font-bold text-lg mb-2">{item.title}</p>
      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
      <p className="text-sm text-gray-500 mb-1">📍 {item.location}</p>
      <p className="text-sm text-gray-500 mb-3">📅 {item.date}</p>
      
      <div className="space-y-2 mt-auto">
        <div className="flex gap-2">
          <select
            value={item.type}
            onChange={(e) => onTypeChange(item.id, e.target.value)}
            className="flex-1 px-2 py-1 border rounded text-sm font-medium"
          >
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>
          
          <select
            value={item.status}
            onChange={(e) => onStatusChange(item.id, e.target.value)}
            className="flex-1 px-2 py-1 border rounded text-sm"
            disabled={item.type === 'lost'}
          >
            <option value="unclaimed">Unclaimed</option>
            {item.type === 'found' && <option value="claimed">Claimed</option>}
          </select>
        </div>
        
        <button
          onClick={() => onDelete(item.id)}
          className="w-full bg-red-500 text-white px-3 py-2 rounded text-sm hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
