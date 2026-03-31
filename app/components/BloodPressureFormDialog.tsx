'use client';

import { useState } from 'react';
import { BloodPressureReading } from '@/app/types';
import { saveReadingToStorage } from '@/app/utils/storage';
import Dialog from './Dialog';

interface BloodPressureFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onReadingAdded: (reading: BloodPressureReading) => void;
}

export default function BloodPressureFormDialog({
  isOpen,
  onClose,
  onReadingAdded,
}: BloodPressureFormDialogProps) {
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [arm, setArm] = useState<'left' | 'right'>('right');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!systolic || !diastolic || !heartRate) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const reading: BloodPressureReading = {
        id: Date.now().toString(),
        systolic: parseInt(systolic),
        diastolic: parseInt(diastolic),
        heartRate: parseInt(heartRate),
        arm,
        timestamp: new Date().toISOString(),
        notes: notes || undefined,
      };

      saveReadingToStorage(reading);
      onReadingAdded(reading);

      // Reset form
      setSystolic('');
      setDiastolic('');
      setHeartRate('');
      setNotes('');
      setArm('right');

      onClose();
    } catch (error) {
      console.error('Error saving reading:', error);
      alert('Failed to save reading');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Add Reading">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Systolic (mmHg) *
          </label>
          <input
            type="number"
            value={systolic}
            onChange={(e) => setSystolic(e.target.value)}
            placeholder="120"
            min="0"
            max="300"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Upper number</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Diastolic (mmHg) *
          </label>
          <input
            type="number"
            value={diastolic}
            onChange={(e) => setDiastolic(e.target.value)}
            placeholder="80"
            min="0"
            max="300"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Lower number</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Heart Rate (BPM) *
          </label>
          <input
            type="number"
            value={heartRate}
            onChange={(e) => setHeartRate(e.target.value)}
            placeholder="72"
            min="0"
            max="300"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Arm *
          </label>
          <select
            value={arm}
            onChange={(e) => setArm(e.target.value as 'left' | 'right')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="left">Left Arm</option>
            <option value="right">Right Arm</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes (optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any relevant notes..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            {loading ? 'Saving...' : 'Save Reading'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </Dialog>
  );
}
