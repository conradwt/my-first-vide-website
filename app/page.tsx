'use client';

import { useState, useEffect } from 'react';
import BloodPressureForm from './components/BloodPressureForm';
import ReadingsList from './components/ReadingsList';
import Stats from './components/Stats';
import { BloodPressureReading } from './types';
import { getReadingsFromStorage, deleteReadingFromStorage } from './utils/storage';

export default function Home() {
  const [readings, setReadings] = useState<BloodPressureReading[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load readings from localStorage on component mount
    const savedReadings = getReadingsFromStorage();
    setReadings(savedReadings);
    setIsLoading(false);
  }, []);

  const handleReadingAdded = (newReading: BloodPressureReading) => {
    setReadings([...readings, newReading]);
  };

  const handleReadingDeleted = (id: string) => {
    deleteReadingFromStorage(id);
    setReadings(readings.filter(r => r.id !== id));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 mt-4">Loading your data...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            Blood Pressure Tracker
          </h1>
          <p className="text-gray-600 text-lg">
            Monitor your blood pressure, heart rate, and arm readings over time
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Form */}
          <div className="lg:col-span-1">
            <BloodPressureForm onReadingAdded={handleReadingAdded} />
          </div>

          {/* Stats */}
          <div className="lg:col-span-2">
            <Stats readings={readings} />
          </div>
        </div>

        {/* Readings List */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-md p-6">
          <ReadingsList readings={readings} onReadingDeleted={handleReadingDeleted} />
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-600">
          <p className="text-sm">
            💡 Tip: Your data is stored locally in your browser and won't be shared with anyone.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            This app is for tracking purposes only and not a substitute for medical advice.
          </p>
        </footer>
      </div>
    </main>
  );
}
