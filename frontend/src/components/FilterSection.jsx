import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, DollarSign, Award } from 'lucide-react';

export default function FilterSection({ filters, onFilterChange, countries }) {
  const [showFilters, setShowFilters] = useState(true);

  const handleTuitionChange = (e) => {
    const value = parseInt(e.target.value);
    onFilterChange({ max_tuition: value });
  };

  const handleGpaChange = (e) => {
    onFilterChange({ gpa: e.target.value });
  };

  const handleIeltsChange = (e) => {
    onFilterChange({ ielts: e.target.value });
  };

  return (
    <div className="bg-white border-b sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium mb-4"
        >
          <SlidersHorizontal className="w-5 h-5" />
          {showFilters ? 'Hide' : 'Show'} Advanced Filters
        </button>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Tuition Fee Slider */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-5 h-5 text-green-600" />
                <label className="font-medium text-gray-900">
                  Max Tuition Fee
                </label>
              </div>
              <input
                type="range"
                min="0"
                max="80000"
                step="1000"
                value={filters.max_tuition}
                onChange={handleTuitionChange}
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>$0</span>
                <span className="font-semibold text-blue-600">
                  ${filters.max_tuition.toLocaleString()}
                </span>
                <span>$80,000</span>
              </div>
            </div>

            {/* GPA Input */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-yellow-600" />
                <label htmlFor="gpa" className="font-medium text-gray-900">
                  Your GPA
                </label>
              </div>
              <input
                id="gpa"
                type="number"
                min="0"
                max="10"
                step="0.01"
                placeholder="e.g., 8.5"
                value={filters.gpa}
                onChange={handleGpaChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-2">
                On a 10.0 scale (shows eligibility)
              </p>
            </div>

            {/* IELTS Input */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-purple-600" />
                <label htmlFor="ielts" className="font-medium text-gray-900">
                  Your IELTS Score
                </label>
              </div>
              <input
                id="ielts"
                type="number"
                min="0"
                max="9"
                step="0.5"
                placeholder="e.g., 7.0"
                value={filters.ielts}
                onChange={handleIeltsChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-2">
                Band score (shows eligibility)
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
