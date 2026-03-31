'use client';

import { useState, useEffect } from 'react';
import BloodPressureFormDialog from './components/BloodPressureFormDialog';
import ReadingsList from './components/ReadingsList';
import Stats from './components/Stats';
import { BloodPressureReading } from './types';
import { getReadingsFromStorage, deleteReadingFromStorage } from './utils/storage';

export default function Home() {
  const [readings, setReadings] = useState<BloodPressureReading[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

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

        {/* Add Reading Button */}
        <div className="mb-8">
          <button
            onClick={() => setDialogOpen(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 text-lg"
          >
            + Add Reading
          </button>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <Stats readings={readings} />
        </div>

        {/* Readings List */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-md p-6">
          <ReadingsList readings={readings} onReadingDeleted={handleReadingDeleted} />
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-600">
          <p className="text-sm">
            💡 Tip: Your data is stored locally in your browser and won&apos;t be shared with anyone.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            This app is for tracking purposes only and not a substitute for medical advice.
          </p>
        </footer>
      </div>

      {/* Dialog */}
      <BloodPressureFormDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onReadingAdded={handleReadingAdded}
      />
    </main>
  );
}
