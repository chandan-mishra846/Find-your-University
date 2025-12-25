import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Search } from 'lucide-react';

export default function HeroSection({ onSearch, countries }) {
  const handleSearch = () => {
    const country = document.getElementById('country').value;
    const degreeLevel = document.getElementById('degree').value;
    onSearch(country, degreeLevel);
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
      
      {/* Animated Circles */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        {/* Headline with slide up animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center mb-6"
          >
            <GraduationCap className="w-16 h-16" />
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="block"
            >
              Find Your Dream University
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="block text-blue-200"
            >
              Study Anywhere, Anytime
            </motion.span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-xl sm:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto"
          >
            Compare universities based on your scores, budget, and preferences. Apply with confidence.
          </motion.p>
        </motion.div>

        {/* Quick Search Bar with fade in animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-6">
              <Search className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">Quick Search</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <select
                  id="country"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  onChange={handleSearch}
                >
                  <option value="all">All Countries</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-2">
                  Degree Level
                </label>
                <select
                  id="degree"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  onChange={handleSearch}
                >
                  <option value="all">All Levels</option>
                  <option value="Bachelor's">Bachelor's</option>
                  <option value="Master's">Master's</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-sm text-gray-600">
              <span className="font-medium">Popular:</span>
              <button 
                className="text-blue-600 hover:underline"
                onClick={() => onSearch('United States', 'all')}
              >
                USA
              </button>
              <span>•</span>
              <button 
                className="text-blue-600 hover:underline"
                onClick={() => onSearch('United Kingdom', 'all')}
              >
                UK
              </button>
              <span>•</span>
              <button 
                className="text-blue-600 hover:underline"
                onClick={() => onSearch('Canada', 'all')}
              >
                Canada
              </button>
              <span>•</span>
              <button 
                className="text-blue-600 hover:underline"
                onClick={() => onSearch('all', "Master's")}
              >
                Master's Programs
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
