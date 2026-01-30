import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">About Lost & Found</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-purple-600 mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Lost & Found is dedicated to reuniting people with their lost belongings. We understand how stressful 
            it can be to lose something important, and we're here to make the recovery process as simple and 
            efficient as possible.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-purple-600 mb-4">How It Works</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">1. Report Lost Items</h3>
              <p className="text-gray-700">
                Found something? Create an account and post the item with details and photos to help 
                the rightful owner identify it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">2. Search for Your Items</h3>
              <p className="text-gray-700">
                Lost something? Browse our database of found items using our powerful search and filter 
                features to find what you're looking for.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">3. Connect & Reunite</h3>
              <p className="text-gray-700">
                When you find a match, connect with the person who found your item and arrange for its return.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-purple-600 mb-4">Our Values</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">✓</span>
              <span><strong>Community:</strong> Building a trustworthy community of helpful individuals</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">✓</span>
              <span><strong>Integrity:</strong> Promoting honesty and ethical behavior</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">✓</span>
              <span><strong>Efficiency:</strong> Making the process quick and easy for everyone</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">✓</span>
              <span><strong>Security:</strong> Protecting user privacy and data at all times</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
