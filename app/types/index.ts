export interface BloodPressureReading {
  id: string;
  systolic: number;
  diastolic: number;
  heartRate: number;
  arm: 'left' | 'right';
  timestamp: string;
  notes?: string;
}

export type BloodPressureCategory = 'normal' | 'elevated' | 'high1' | 'high2' | 'crisis';
