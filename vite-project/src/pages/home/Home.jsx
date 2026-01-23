import React from "react";
import { useEffect, useState } from "react";
import { getItems } from "../../api";

export default function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems()
      .then(data => setItems(data.items))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Lost & Found Items</h1>
      <div className="grid grid-cols-4 gap-4">
        {items.map(item => (
          <div key={item.id} className="border p-3 rounded">
            <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded mb-3" />
            <p className="font-bold">{item.title}</p>
            <p className="text-sm text-gray-500">{item.location}</p>
            <p className="text-sm">{item.type}</p>
            <p className="text-sm">{item.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
