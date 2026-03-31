'use client';

import { BloodPressureReading } from '@/app/types';
import { categorizeBloodPressure, getCategoryColor, getCategoryLabel } from '@/app/utils/storage';
import { formatDistanceToNow } from 'date-fns';

interface ReadingCardProps {
  reading: BloodPressureReading;
  onDelete: (id: string) => void;
}

export default function ReadingCard({ reading, onDelete }: ReadingCardProps) {
  const category = categorizeBloodPressure(reading.systolic, reading.diastolic);
  const categoryColor = getCategoryColor(category);
  const categoryLabel = getCategoryLabel(category);
  const timeAgo = formatDistanceToNow(new Date(reading.timestamp), { addSuffix: true });

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="text-gray-500 text-sm">{timeAgo}</p>
          <p className="text-gray-600 text-sm">
            <span className="font-semibold capitalize">{reading.arm} arm</span>
          </p>
        </div>
        <button
          onClick={() => onDelete(reading.id)}
          className="text-red-500 hover:text-red-700 text-sm font-semibold transition"
        >
          Delete
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-3">
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-gray-600 text-xs font-semibold">Systolic</p>
          <p className="text-2xl font-bold text-gray-800">{reading.systolic}</p>
          <p className="text-gray-500 text-xs">mmHg</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-gray-600 text-xs font-semibold">Diastolic</p>
          <p className="text-2xl font-bold text-gray-800">{reading.diastolic}</p>
          <p className="text-gray-500 text-xs">mmHg</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-gray-600 text-xs font-semibold">Heart Rate</p>
          <p className="text-2xl font-bold text-gray-800">{reading.heartRate}</p>
          <p className="text-gray-500 text-xs">BPM</p>
        </div>
      </div>

      <div className={`${categoryColor} p-2 rounded text-sm font-semibold text-center mb-2`}>
        {categoryLabel}
      </div>

      {reading.notes && (
        <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
          <p className="text-sm text-gray-700">{reading.notes}</p>
        </div>
      )}
    </div>
  );
}
