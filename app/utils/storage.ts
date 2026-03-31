import { BloodPressureReading, BloodPressureCategory } from '@/app/types';

const STORAGE_KEY = 'blood_pressure_readings';

export const getReadingsFromStorage = (): BloodPressureReading[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveReadingToStorage = (reading: BloodPressureReading): void => {
  const readings = getReadingsFromStorage();
  readings.push(reading);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(readings));
};

export const deleteReadingFromStorage = (id: string): void => {
  const readings = getReadingsFromStorage();
  const filtered = readings.filter(r => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const categorizeBloodPressure = (systolic: number, diastolic: number): BloodPressureCategory => {
  if (systolic >= 180 || diastolic >= 120) return 'crisis';
  if (systolic >= 140 || diastolic >= 90) return 'high2';
  if (systolic >= 130 && diastolic < 90) return 'high1';
  if (systolic >= 120 && systolic < 130 && diastolic < 80) return 'elevated';
  return 'normal';
};

export const getCategoryColor = (category: BloodPressureCategory): string => {
  switch (category) {
    case 'normal':
      return 'text-green-600 bg-green-50';
    case 'elevated':
      return 'text-yellow-600 bg-yellow-50';
    case 'high1':
      return 'text-orange-600 bg-orange-50';
    case 'high2':
      return 'text-red-600 bg-red-50';
    case 'crisis':
      return 'text-red-700 bg-red-100';
  }
};

export const getCategoryLabel = (category: BloodPressureCategory): string => {
  switch (category) {
    case 'normal':
      return 'Normal';
    case 'elevated':
      return 'Elevated';
    case 'high1':
      return 'High Blood Pressure (Stage 1)';
    case 'high2':
      return 'High Blood Pressure (Stage 2)';
    case 'crisis':
      return 'Hypertensive Crisis';
  }
};
