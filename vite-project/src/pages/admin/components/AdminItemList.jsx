import React from 'react';
import AdminItemCard from './AdminItemCard';

export default function AdminItemList({ items, onDelete, onStatusChange, onTypeChange }) {
  if (items.length === 0) {
    return <p className="text-center text-gray-500 py-12">No items found</p>;
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {items.map(item => (
        <AdminItemCard
          key={item.id}
          item={item}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
          onTypeChange={onTypeChange}
        />
      ))}
    </div>
  );
}
