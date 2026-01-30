import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-500 to-purple-600 text-white py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Lost & Found</h3>
            <p className="text-sm text-gray-200">
              Helping reunite lost items with their rightful owners.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-gray-300 transition">Home</a></li>
              <li><a href="/about" className="hover:text-gray-300 transition">About Us</a></li>
              <li><a href="/contact" className="hover:text-gray-300 transition">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <p className="text-sm text-gray-200">
              Email: support@lostandfound.com<br />
              Phone: +1 (555) 123-4567
            </p>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-6 text-center text-sm text-gray-200">
          <p>&copy; {new Date().getFullYear()} Lost & Found. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
