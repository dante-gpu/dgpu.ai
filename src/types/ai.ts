export interface AIModel {
  id: string;
  name: string;
  description: string;
  performance: number;
  pricePerHour: number;
  vram: number;
  imageUrl: string;
  features: string[];
  type: 'training' | 'inference';
}