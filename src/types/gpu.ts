export interface GPU {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  performance: number;
  vram: number;
  pricePerHour: number;
  manufacturer: string;
  model: string;
  createdAt?: string;
}