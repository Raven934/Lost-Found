import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { getItems, updateItem } from "../../../api.js";

export default function Items({ typeFilter, locationFilter }) {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getItems()
      .then(data => setItems(data.items))
      .catch(err => console.error(err));
  }, []);

  const filteredItems = items.filter(item => {
    const typeMatch = !typeFilter || item.type === typeFilter;
    const locationMatch = !locationFilter || item.location.toLowerCase().includes(locationFilter.toLowerCase());
    return typeMatch && locationMatch;
  });

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const handleMarkAsFound = (itemId) => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (window.confirm('Are you sure you want to mark this item as found?')) {
      updateItem(itemId, { type: 'found' }, token)
        .then(() => {
          setItems(items.map(item => 
            item.id === itemId ? { ...item, type: 'found' } : item
          ));
          if (selectedItem?.id === itemId) {
            setSelectedItem({ ...selectedItem, type: 'found' });
          }
          alert('Item marked as found successfully!');
        })
        .catch(err => {
          console.error('Error marking as found:', err);
          alert('Failed to mark item as found');
        });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Lost & Found Items</h1>
      <div className="grid grid-cols-4 gap-6">
        {filteredItems.map(item => (
          <div 
            key={item.id} 
            onClick={() => handleItemClick(item)}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer bg-white"
          >
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-48 object-cover bg-gray-200"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/640x480/e5e7eb/6b7280?text=No+Image';
              }}
            />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2 text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-semibold">Location:</span> {item.location}
              </p>
              <p className="text-sm">
                <span className={`px-3 py-1 rounded-full text-white text-xs ${item.type === 'lost' ? 'bg-red-500' : 'bg-green-500'}`}>
                  {item.type.toUpperCase()}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70"
              >
                ✕
              </button>
              <img 
                src={selectedItem.image} 
                alt={selectedItem.title} 
                className="w-full h-64 object-cover rounded-t-lg"
              />
            </div>
            <div className="p-6">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">{selectedItem.title}</h2>
              
              <div className="space-y-3">
                <div>
                  <span className="font-semibold text-gray-700">Type:</span>
                  <span className={`ml-2 px-3 py-1 rounded-full text-white text-sm ${selectedItem.type === 'lost' ? 'bg-red-500' : 'bg-green-500'}`}>
                    {selectedItem.type.toUpperCase()}
                  </span>
                </div>
                
                <div>
                  <span className="font-semibold text-gray-700">Location:</span>
                  <span className="ml-2 text-gray-600">{selectedItem.location}</span>
                </div>
                
                <div>
                  <span className="font-semibold text-gray-700">Date:</span>
                  <span className="ml-2 text-gray-600">{selectedItem.date}</span>
                </div>
                
                <div>
                  <span className="font-semibold text-gray-700">Status:</span>
                  <span className="ml-2 text-gray-600">{selectedItem.status}</span>
                </div>
                
                <div>
                  <p className="font-semibold text-gray-700 mb-2">Description:</p>
                  <p className="text-gray-600 leading-relaxed">{selectedItem.description}</p>
                </div>
              </div>
              
              {selectedItem.type === 'lost' && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMarkAsFound(selectedItem.id);
                  }}
                  className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  I Found This Item
                </button>
              )}
              
              <button 
                onClick={closeModal}
                className="mt-4 w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
