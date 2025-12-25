import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeroSection from './components/HeroSection.jsx';
import FilterSection from './components/FilterSection.jsx';
import UniversityCard from './components/UniversityCard.jsx';
import ComparisonModal from './components/ComparisonModal.jsx';
import ApplicationModal from './components/ApplicationModal.jsx';

function App() {
  const [universities, setUniversities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [filters, setFilters] = useState({
    country: 'all',
    degree_level: 'all',
    min_tuition: 0,
    max_tuition: 80000,
    gpa: '',
    ielts: ''
  });
  const [selectedForComparison, setSelectedForComparison] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [showApplication, setShowApplication] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch countries on mount
  useEffect(() => {
    fetchCountries();
    fetchUniversities();
  }, []);

  // Fetch universities when filters change
  useEffect(() => {
    fetchUniversities();
  }, [filters]);

  const fetchCountries = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/countries');
      setCountries(response.data.countries);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchUniversities = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          params.append(key, filters[key]);
        }
      });
      
      const response = await axios.get(`http://localhost:5000/api/universities?${params.toString()}`);
      setUniversities(response.data.universities);
    } catch (error) {
      console.error('Error fetching universities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickSearch = (country, degreeLevel) => {
    setFilters(prev => ({
      ...prev,
      country,
      degree_level: degreeLevel
    }));
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleCompareToggle = (university) => {
    setSelectedForComparison(prev => {
      const exists = prev.find(u => u.program_id === university.program_id);
      if (exists) {
        return prev.filter(u => u.program_id !== university.program_id);
      } else {
        if (prev.length >= 3) {
          alert('You can compare up to 3 universities only');
          return prev;
        }
        return [...prev, university];
      }
    });
  };

  const handleApplyNow = (university) => {
    setSelectedUniversity(university);
    setShowApplication(true);
  };

  return (
    <div className="min-h-screen">
      <HeroSection 
        onSearch={handleQuickSearch} 
        countries={countries}
      />
      
      <FilterSection 
        filters={filters}
        onFilterChange={handleFilterChange}
        countries={countries}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Comparison Button */}
        {selectedForComparison.length >= 2 && (
          <div className="fixed bottom-8 right-8 z-50">
            <button
              onClick={() => setShowComparison(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-full shadow-2xl font-semibold text-lg flex items-center gap-2 transition-all transform hover:scale-105"
            >
              Compare Now ({selectedForComparison.length})
            </button>
          </div>
        )}

        {/* University Cards */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading universities...</p>
          </div>
        ) : universities.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">No universities found matching your criteria</p>
            <p className="text-gray-500 mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {universities.map(university => (
              <UniversityCard
                key={university.program_id}
                university={university}
                isSelected={selectedForComparison.some(u => u.program_id === university.program_id)}
                onCompareToggle={handleCompareToggle}
                onApplyNow={handleApplyNow}
              />
            ))}
          </div>
        )}
      </div>

      {/* Comparison Modal */}
      {showComparison && (
        <ComparisonModal
          universities={selectedForComparison}
          onClose={() => setShowComparison(false)}
        />
      )}

      {/* Application Modal */}
      {showApplication && (
        <ApplicationModal
          university={selectedUniversity}
          onClose={() => {
            setShowApplication(false);
            setSelectedUniversity(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
