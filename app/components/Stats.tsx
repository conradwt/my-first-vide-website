'use client';

import { BloodPressureReading } from '@/app/types';
import { categorizeBloodPressure } from '@/app/utils/storage';

interface StatsProps {
  readings: BloodPressureReading[];
}

export default function Stats({ readings }: StatsProps) {
  if (readings.length === 0) {
    return null;
  }

  const avgSystolic = Math.round(
    readings.reduce((sum, r) => sum + r.systolic, 0) / readings.length
  );
  const avgDiastolic = Math.round(
    readings.reduce((sum, r) => sum + r.diastolic, 0) / readings.length
  );
  const avgHeartRate = Math.round(
    readings.reduce((sum, r) => sum + r.heartRate, 0) / readings.length
  );

  const latestReading = [...readings].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )[0];

  const categories = readings.map(r => categorizeBloodPressure(r.systolic, r.diastolic));
  const normalCount = categories.filter(c => c === 'normal').length;
  const elevatedCount = categories.filter(c => c === 'elevated').length;
  const highCount = categories.filter(c => c === 'high1' || c === 'high2').length;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Statistics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
          <p className="text-gray-600 text-sm font-semibold">Average Systolic</p>
          <p className="text-3xl font-bold text-gray-800">{avgSystolic}</p>
          <p className="text-gray-500 text-xs mt-1">mmHg</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
          <p className="text-gray-600 text-sm font-semibold">Average Diastolic</p>
          <p className="text-3xl font-bold text-gray-800">{avgDiastolic}</p>
          <p className="text-gray-500 text-xs mt-1">mmHg</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
          <p className="text-gray-600 text-sm font-semibold">Average Heart Rate</p>
          <p className="text-3xl font-bold text-gray-800">{avgHeartRate}</p>
          <p className="text-gray-500 text-xs mt-1">BPM</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border-l-4 border-green-500 pl-4">
          <p className="text-gray-600 text-sm font-semibold">Latest Reading</p>
          <p className="text-2xl font-bold text-gray-800">
            {latestReading.systolic}/{latestReading.diastolic}
          </p>
          <p className="text-gray-500 text-xs">
            {latestReading.heartRate} BPM • {latestReading.arm} arm
          </p>
        </div>
        
        <div>
          <p className="text-gray-600 text-sm font-semibold mb-2">Reading Categories</p>
          <div className="space-y-1 text-sm">
            <p className="text-green-600">✓ Normal: {normalCount}</p>
            <p className="text-yellow-600">⚠ Elevated: {elevatedCount}</p>
            <p className="text-red-600">✗ High: {highCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
