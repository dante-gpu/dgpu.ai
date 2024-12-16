import { ChatMessage } from '../types/chat';
import { GPU } from '../types/gpu';
import { RentalHistory } from '../types/rental';

// Örnek GPU verileri
const AVAILABLE_GPUS: GPU[] = [
  {
    id: '1',
    name: 'NVIDIA RTX 4090',
    description: 'En yüksek performanslı GPU, AI ve görüntü işleme için ideal',
    imageUrl: '/images/gpus/rtx4090.png',
    performance: 100,
    vram: 24,
    pricePerHour: 0.5,
    manufacturer: 'NVIDIA',
    model: 'RTX 4090',
    status: 'available'
  },
  {
    id: '2',
    name: 'NVIDIA RTX 3090',
    description: 'Yüksek performanslı GPU, büyük model eğitimi için uygun',
    imageUrl: '/images/gpus/rtx3090.png',
    performance: 85,
    vram: 24,
    pricePerHour: 0.3,
    manufacturer: 'NVIDIA',
    model: 'RTX 3090',
    status: 'available'
  },
  {
    id: '3',
    name: 'NVIDIA RTX 4080',
    description: 'Dengeli performans, çoğu AI görevi için yeterli',
    imageUrl: '/images/gpus/rtx4080.png',
    performance: 90,
    vram: 16,
    pricePerHour: 0.4,
    manufacturer: 'NVIDIA',
    model: 'RTX 4080',
    status: 'available'
  },
  {
    id: '4',
    name: 'NVIDIA RTX 3080',
    description: 'Maliyet-etkin GPU, orta ölçekli işler için ideal',
    imageUrl: '/images/gpus/rtx3080.png',
    performance: 75,
    vram: 12,
    pricePerHour: 0.25,
    manufacturer: 'NVIDIA',
    model: 'RTX 3080',
    status: 'available'
  }
];

// AI görev tipleri ve önerilen GPU'lar
type TaskType = 'image_generation' | 'training' | 'inference' | 'video_processing';

interface TaskRecommendation {
  description: string;
  recommended_gpus: string[];
  min_vram: number;
}

const AI_TASK_RECOMMENDATIONS: Record<TaskType, TaskRecommendation> = {
  'image_generation': {
    description: 'Görüntü oluşturma (Stable Diffusion, DALL-E vb.)',
    recommended_gpus: ['RTX 4090', 'RTX 4080', 'RTX 3090'],
    min_vram: 16
  },
  'training': {
    description: 'Model eğitimi ve fine-tuning',
    recommended_gpus: ['RTX 4090', 'RTX 3090'],
    min_vram: 24
  },
  'inference': {
    description: 'Model çıkarımı ve tahmin',
    recommended_gpus: ['RTX 4080', 'RTX 3080'],
    min_vram: 8
  },
  'video_processing': {
    description: 'Video işleme ve AI upscaling',
    recommended_gpus: ['RTX 4080', 'RTX 3080'],
    min_vram: 12
  }
};

// AI görev tipini belirle
function determineAITask(message: string): TaskType {
  message = message.toLowerCase();
  
  if (message.includes('resim') || message.includes('görüntü') || message.includes('stable diffusion')) {
    return 'image_generation';
  }
  if (message.includes('eğitim') || message.includes('training') || message.includes('fine-tune')) {
    return 'training';
  }
  if (message.includes('tahmin') || message.includes('inference') || message.includes('çıkarım')) {
    return 'inference';
  }
  if (message.includes('video') || message.includes('upscale')) {
    return 'video_processing';
  }
  
  return 'inference';
}

// En uygun GPU'yu seç
function findBestGPU(taskType: TaskType): GPU | null {
  const task = AI_TASK_RECOMMENDATIONS[taskType];
  if (!task) return null;

  // Minimum VRAM gereksinimini karşılayan ve önerilen GPU'lar arasında olan GPU'ları filtrele
  const suitableGPUs = AVAILABLE_GPUS.filter(gpu => 
    gpu.vram >= task.min_vram && 
    task.recommended_gpus.includes(gpu.model)
  );

  // Performansa göre sırala ve en iyisini seç
  return suitableGPUs.sort((a, b) => b.performance - a.performance)[0] || null;
}

// Yanıt şablonları
const RESPONSE_TEMPLATES = {
  image_generation: (gpu: GPU) => `
Stable Diffusion ve benzeri görüntü oluşturma modelleri için ${gpu.name} mükemmel bir seçim! 

Bu GPU:
- ${gpu.vram}GB VRAM ile büyük modelleri rahatlıkla çalıştırabilir
- Yüksek performansı sayesinde hızlı görüntü oluşturma sağlar
- ${gpu.pricePerHour} SOL/saat gibi uygun bir fiyata sahip

Hemen kiralamak için kart üzerindeki seçenekleri kullanabilirsiniz.`,
  training: (gpu: GPU) => `
Model eğitimi için ${gpu.name} ideal bir seçim! 

Özellikleri:
- ${gpu.vram}GB VRAM ile büyük veri setlerini işleyebilir
- Yüksek performansı ile eğitim süresini kısaltır
- ${gpu.pricePerHour} SOL/saat fiyatıyla maliyet-etkin

Kiralama işlemi için kartı kullanabilirsiniz.`,
  inference: (gpu: GPU) => `
Model çıkarımı için ${gpu.name} çok uygun bir seçim! 

Bu GPU ile:
- ${gpu.vram}GB VRAM sayesinde birçok modeli çalıştırabilirsiniz
- Hızlı inference performansı elde edersiniz
- ${gpu.pricePerHour} SOL/saat ekonomik fiyatla çalışabilirsiniz

Hemen kiralamak için kartı kullanın.`,
  video_processing: (gpu: GPU) => `
Video işleme için ${gpu.name} harika bir tercih! 

Avantajları:
- ${gpu.vram}GB VRAM ile yüksek çözünürlüklü videoları işleyebilir
- Güçlü performansı ile hızlı sonuçlar alırsınız
- ${gpu.pricePerHour} SOL/saat uygun fiyatlı

Kiralama için kartı kullanabilirsiniz.`
};

// RentalHistory oluştur
function createRentalHistory(gpu: GPU): RentalHistory {
  return {
    id: crypto.randomUUID(),
    gpu,
    hours: 1,
    price: gpu.pricePerHour,
    timestamp: new Date().toISOString(),
    status: 'available',
    renterAddress: '',
    usageStats: {
      cpuUsage: 0,
      memoryUsage: 0,
      powerUsage: 0,
      temperature: 0,
      gpuUsage: 0
    },
    performanceMetrics: {
      throughput: '0',
      latency: '0',
      successRate: 0
    }
  };
}

export const chatService = {
  async sendMessage(message: string): Promise<ChatMessage> {
    try {
      // Yapay gecikme
      await new Promise(resolve => setTimeout(resolve, 500));

      // AI görev tipini belirle
      const taskType = determineAITask(message);
      const recommendedGPU = findBestGPU(taskType);

      if (!recommendedGPU) {
        throw new Error('Uygun GPU bulunamadı');
      }

      const responseText = RESPONSE_TEMPLATES[taskType](recommendedGPU);
      const rental = createRentalHistory(recommendedGPU);

      // Yanıtı ve kiralama verilerini birleştir
      const content = `${responseText}\n\n${JSON.stringify(rental)}`;

      return {
        id: crypto.randomUUID(),
        role: 'assistant',
        content,
        timestamp: new Date(),
        status: 'sent'
      };
    } catch (error) {
      console.error('Chat error:', error);
      throw new Error(error instanceof Error ? error.message : 'Bir hata oluştu');
    }
  }
}; 