export interface RentalTimer {
  endTime: Date;
  remainingTime: number; // in seconds
}

export interface RentalHistory {
  id: string;
  gpu: GPU;
  hours: number;
  price: number;
  timestamp: Date;
  status: 'active' | 'completed' | 'expired';
  timer?: RentalTimer;
}