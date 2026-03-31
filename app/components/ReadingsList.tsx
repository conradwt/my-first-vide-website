'use client';

import { BloodPressureReading } from '@/app/types';
import ReadingCard from './ReadingCard';

interface ReadingsListProps {
  readings: BloodPressureReading[];
  onReadingDeleted: (id: string) => void;
}

export default function ReadingsList({ readings, onReadingDeleted }: ReadingsListProps) {
  if (readings.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <p className="text-gray-500 text-lg">No readings yet. Add your first reading to get started!</p>
      </div>
    );
  }

  const sortedReadings = [...readings].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">
        Reading History ({sortedReadings.length})
      </h2>
      <div className="space-y-3">
        {sortedReadings.map((reading) => (
          <ReadingCard
            key={reading.id}
            reading={reading}
            onDelete={onReadingDeleted}
          />
        ))}
      </div>
    </div>
  );
}
