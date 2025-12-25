import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, DollarSign, Award, AlertCircle, CheckCircle } from 'lucide-react';

export default function UniversityCard({ university, isSelected, onCompareToggle, onApplyNow }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className={`bg-white rounded-xl shadow-lg overflow-hidden border-2 transition-all ${
        isSelected ? 'border-blue-600' : 'border-transparent'
      }`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">{university.name}</h3>
            <div className="flex items-center gap-2 text-sm text-blue-100">
              <MapPin className="w-4 h-4" />
              <span>{university.city}, {university.country}</span>
            </div>
          </div>
          <div className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-bold">
            #{university.ranking}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        {/* Program Info */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 mb-2">{university.program_name}</h4>
          <span className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
            {university.degree_level}
          </span>
        </div>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className="font-semibold text-gray-900">
              ${university.tuition_fee.toLocaleString()}/year
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4 text-orange-600" />
            <span>{university.duration_years} years</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Award className="w-4 h-4 text-yellow-600" />
            <span>Min CGPA: {university.min_gpa} | IELTS: {university.min_ielts}</span>
          </div>
        </div>

        {/* Eligibility Badge */}
        {!university.eligible && (
          <div className="flex items-center gap-2 bg-red-50 text-red-700 px-3 py-2 rounded-lg mb-4">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Not Eligible</span>
          </div>
        )}

        {university.eligible && (
          <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-lg mb-4">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Eligible</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onCompareToggle(university)}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              isSelected
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {isSelected ? 'Selected' : 'Compare'}
          </button>
          <button
            onClick={() => onApplyNow(university)}
            className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all"
          >
            Apply Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}
