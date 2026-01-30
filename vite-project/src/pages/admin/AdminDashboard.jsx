import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getItems, deleteItem, updateItem } from '../../api';
import AdminFilters from './components/AdminFilters';
import AdminItemList from './components/AdminItemList';

export default function AdminDashboard() {
  const { user, token } = useAuth();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filters, setFilters] = useState({ type: '', location: '', status: '' });

  useEffect(() => {
    getItems()
      .then(data => {
        setItems(data.items);
        setFilteredItems(data.items);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    let filtered = items;
    
    if (filters.type) {
      filtered = filtered.filter(item => item.type === filters.type);
    }
    
    if (filters.location) {
      filtered = filtered.filter(item => 
        item.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    if (filters.status) {
      filtered = filtered.filter(item => item.status === filters.status);
    }
    
    setFilteredItems(filtered);
  }, [filters, items]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleDelete = (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteItem(itemId, token)
        .then(() => {
          setItems(items.filter(item => item.id !== itemId));
        })
        .catch(err => {
          alert('Failed to delete item');
          console.error(err);
        });
    }
  };

  const handleStatusChange = (itemId, newStatus) => {
    updateItem(itemId, { status: newStatus }, token)
      .then(() => {
        setItems(items.map(item => 
          item.id === itemId ? { ...item, status: newStatus } : item
        ));
      })
      .catch(err => {
        console.error('Update error:', err);
        console.error('Error response:', err.response?.data);
        alert(`Failed to update status: ${err.response?.data?.message || err.message}`);
      });
  };

  const handleTypeChange = (itemId, newType) => {
    updateItem(itemId, { type: newType }, token)
      .then(() => {
        setItems(items.map(item => 
          item.id === itemId ? { ...item, type: newType, status: 'unclaimed' } : item
        ));
      })
      .catch(err => {
        console.error('Update error:', err);
        console.error('Error response:', err.response?.data);
        alert(`Failed to update type: ${err.response?.data?.message || err.message}`);
      });
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="p-6 min-h-screen bg-gray-50">
        <h1 className="text-2xl font-bold text-red-600">Access Denied. Admin only.</h1>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">Admin Dashboard</h1>
      
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <p className="text-lg">Total Items: <span className="font-bold">{items.length}</span></p>
      </div>
      
      <AdminFilters onFilterChange={handleFilterChange} />
      
      <AdminItemList
        items={filteredItems}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
        onTypeChange={handleTypeChange}
      />
    </div>
  );
}
