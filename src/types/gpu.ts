export interface GPU {
  id: string;
  name: string;
  vram: number;
  performance: number;
  pricePerHour: number; // in SOL
  imageUrl: string;
}