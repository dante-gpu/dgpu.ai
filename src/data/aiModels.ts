import { AIModel } from '../types/ai';

export const aiModels: AIModel[] = [
  {
    id: 'gpt-4',
    name: 'GPT-4 Training',
    description: 'High-performance model for large language model training and fine-tuning',
    performance: 100,
    pricePerHour: 0.08,
    vram: 48,
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2940',
    features: ['Multi-modal Training', 'Distributed Learning', 'Custom Architecture'],
    type: 'training'
  },
  {
    id: 'stable-xl',
    name: 'Stable Diffusion XL',
    description: 'Advanced image generation and training infrastructure',
    performance: 90,
    pricePerHour: 0.06,
    vram: 24,
    imageUrl: 'https://images.unsplash.com/photo-1686191128892-3e67c5f30820?auto=format&fit=crop&q=80&w=2940',
    features: ['LoRA Training', 'Custom Dataset Support', 'Hyperparameter Optimization'],
    type: 'training'
  },
  {
    id: 'llama-2',
    name: 'Llama 2 70B',
    description: 'Open-source large language model training and inference',
    performance: 85,
    pricePerHour: 0.05,
    vram: 32,
    imageUrl: 'https://images.unsplash.com/photo-1693520999631-6ac145c1dd15?auto=format&fit=crop&q=80&w=2940',
    features: ['Parameter-Efficient Training', 'Multi-node Support', 'Quantization'],
    type: 'inference'
  }
];