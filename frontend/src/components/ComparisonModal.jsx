import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function ComparisonModal({ universities, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Compare Universities</h2>
          <button
            onClick={onClose}
            className="hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Comparison Table */}
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">
                    Feature
                  </th>
                  {universities.map((uni) => (
                    <th key={uni.program_id} className="text-center py-4 px-4 min-w-[200px]">
                      <div className="font-bold text-gray-900">{uni.name}</div>
                      <div className="text-sm font-normal text-gray-600 mt-1">
                        {uni.program_name}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Country & City */}
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 font-medium text-gray-700">Location</td>
                  {universities.map((uni) => (
                    <td key={uni.program_id} className="py-4 px-4 text-center">
                      {uni.city}, {uni.country}
                    </td>
                  ))}
                </tr>

                {/* Ranking */}
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 font-medium text-gray-700">World Ranking</td>
                  {universities.map((uni) => (
                    <td key={uni.program_id} className="py-4 px-4 text-center">
                      <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                        #{uni.ranking}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Degree Level */}
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 font-medium text-gray-700">Degree Level</td>
                  {universities.map((uni) => (
                    <td key={uni.program_id} className="py-4 px-4 text-center">
                      {uni.degree_level}
                    </td>
                  ))}
                </tr>

                {/* Tuition Fee */}
                <tr className="border-b border-gray-100 hover:bg-gray-50 bg-green-50">
                  <td className="py-4 px-4 font-medium text-gray-700">Annual Tuition</td>
                  {universities.map((uni) => (
                    <td key={uni.program_id} className="py-4 px-4 text-center">
                      <span className="font-bold text-green-700">
                        ${uni.tuition_fee.toLocaleString()}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Duration */}
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 font-medium text-gray-700">Duration</td>
                  {universities.map((uni) => (
                    <td key={uni.program_id} className="py-4 px-4 text-center">
                      {uni.duration_years} years
                    </td>
                  ))}
                </tr>

                {/* Min GPA */}
                <tr className="border-b border-gray-100 hover:bg-gray-50 bg-yellow-50">
                  <td className="py-4 px-4 font-medium text-gray-700">Min GPA Required</td>
                  {universities.map((uni) => (
                    <td key={uni.program_id} className="py-4 px-4 text-center">
                      <span className="font-bold text-yellow-700">{uni.min_gpa}</span>
                    </td>
                  ))}
                </tr>

                {/* Min IELTS */}
                <tr className="border-b border-gray-100 hover:bg-gray-50 bg-purple-50">
                  <td className="py-4 px-4 font-medium text-gray-700">Min IELTS Required</td>
                  {universities.map((uni) => (
                    <td key={uni.program_id} className="py-4 px-4 text-center">
                      <span className="font-bold text-purple-700">{uni.min_ielts}</span>
                    </td>
                  ))}
                </tr>

                {/* Total Tuition */}
                <tr className="border-b border-gray-100 hover:bg-gray-50 bg-blue-50">
                  <td className="py-4 px-4 font-medium text-gray-700">Total Tuition Fee</td>
                  {universities.map((uni) => (
                    <td key={uni.program_id} className="py-4 px-4 text-center">
                      <span className="font-bold text-blue-700 text-lg">
                        ${(uni.tuition_fee * uni.duration_years).toLocaleString()}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Application Fee */}
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-4 font-medium text-gray-700">Application Fee</td>
                  {universities.map((uni) => (
                    <td key={uni.program_id} className="py-4 px-4 text-center">
                      ${uni.application_fee.toLocaleString()}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
