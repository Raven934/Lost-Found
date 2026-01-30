import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getMyItems, updateItem, deleteItem } from '../../api.js';

export default function User() {
  const { user, token } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    type: '',
    location: '',
    date: '',
    status: ''
  });

  useEffect(() => {
    if (token) {
      fetchItems();
    }
  }, [token]);

  const fetchItems = () => {
    getMyItems(token)
      .then(data => {
        const itemsWithImages = data.items.map(item => ({
          ...item,
          image: item.image?.startsWith('http') ? item.image : `http://127.0.0.1:8000${item.image}`
        }));
        setItems(itemsWithImages);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsEditing(false);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setEditForm({
      title: selectedItem.title,
      description: selectedItem.description,
      type: selectedItem.type,
      location: selectedItem.location,
      date: selectedItem.date,
      status: selectedItem.status
    });
    setIsEditing(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateItem(selectedItem.id, editForm, token)
      .then(() => {
        alert('Item updated successfully!');
        fetchItems();
        closeModal();
      })
      .catch(err => {
        console.error('Error updating item:', err);
        alert('Failed to update item');
      });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteItem(selectedItem.id, token)
        .then(() => {
          alert('Item deleted successfully!');
          setItems(items.filter(item => item.id !== selectedItem.id));
          closeModal();
        })
        .catch(err => {
          console.error('Error deleting item:', err);
          alert('Failed to delete item');
        });
    }
  };

  if (!user) {
    return (
      <div className="p-6 min-h-screen bg-gray-50">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Please log in to view your items</h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 min-h-screen bg-gray-50">
        <p className="text-center">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Items</h1>
      {items.length === 0 ? (
        <p className="text-center text-gray-500 py-12">No items found. Start by adding your first item!</p>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {items.map(item => (
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
                  <span className={`ml-2 px-3 py-1 rounded-full text-white text-xs ${item.status === 'unclaimed' ? 'bg-purple-500' : 'bg-gray-500'}`}>
                    {item.status.toUpperCase()}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

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
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 z-10"
              >
                ✕
              </button>
              <img 
                src={selectedItem.image} 
                alt={selectedItem.title} 
                className="w-full h-64 object-cover rounded-t-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/640x480/e5e7eb/6b7280?text=No+Image';
                }}
              />
            </div>
            <div className="p-6">
              {!isEditing ? (
                <>
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
                      <span className={`ml-2 px-3 py-1 rounded-full text-white text-sm ${selectedItem.status === 'unclaimed' ? 'bg-purple-500' : 'bg-gray-500'}`}>
                        {selectedItem.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div>
                      <p className="font-semibold text-gray-700 mb-2">Description:</p>
                      <p className="text-gray-600 leading-relaxed">{selectedItem.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-6">
                    <button 
                      onClick={handleEdit}
                      className="flex-1 bg-purple-500 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={handleDelete}
                      className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </div>
                  
                  <button 
                    onClick={closeModal}
                    className="mt-3 w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
                  >
                    Close
                  </button>
                </>
              ) : (
                <form onSubmit={handleUpdate} className="space-y-4">
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Item</h2>
                  
                  <div>
                    <label className="block font-medium mb-2">Title</label>
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-2">Description</label>
                    <textarea
                      value={editForm.description}
                      onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg h-24"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-2">Type</label>
                    <select
                      value={editForm.type}
                      onChange={(e) => setEditForm({...editForm, type: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg"
                    >
                      <option value="lost">Lost</option>
                      <option value="found">Found</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium mb-2">Location</label>
                    <input
                      type="text"
                      value={editForm.location}
                      onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-2">Date</label>
                    <input
                      type="date"
                      value={editForm.date}
                      onChange={(e) => setEditForm({...editForm, date: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-2">Status</label>
                    <select
                      value={editForm.status}
                      onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg"
                    >
                      <option value="unclaimed">Unclaimed</option>
                      <option value="claimed">Claimed</option>
                    </select>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
