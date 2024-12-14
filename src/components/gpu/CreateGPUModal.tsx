import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { GPU } from '../../types/gpu';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { X, Image as ImageIcon, Cpu, Zap, DollarSign, Info } from 'lucide-react';

interface CreateGPUModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (gpu: Omit<GPU, 'id'>) => Promise<void>;
}

interface FormData {
  name: string;
  description: string;
  imageUrl: string;
  performance: string;
  vram: string;
  pricePerHour: string;
  manufacturer: string;
  model: string;
}

export const CreateGPUModal: React.FC<CreateGPUModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    imageUrl: '',
    performance: '',
    vram: '',
    pricePerHour: '',
    manufacturer: '',
    model: ''
  });
  const [previewError, setPreviewError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({
        ...formData,
        performance: parseInt(formData.performance),
        vram: parseInt(formData.vram),
        pricePerHour: parseFloat(formData.pricePerHour)
      });
      onClose();
    } catch (error) {
      console.error('Error creating GPU:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'imageUrl') setPreviewError(false);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-dark-800 rounded-xl w-full max-w-2xl transform border border-dark-700 transition-all">
          <div className="relative">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-dark-700">
              <Dialog.Title className="text-xl font-bold gradient-text flex items-center gap-2">
                <Cpu className="w-6 h-6" />
                Add New GPU
              </Dialog.Title>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-dark-700 transition-colors group"
              >
                <X size={20} className="text-gray-400 group-hover:text-white transition-colors" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-400 flex items-center gap-2">
                      <Info size={16} />
                      Basic Information
                    </h3>
                    <Input
                      name="name"
                      label="GPU Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., NVIDIA RTX 4090"
                      icon={<Cpu className="text-glow-400" />}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        name="manufacturer"
                        label="Manufacturer"
                        value={formData.manufacturer}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., NVIDIA"
                      />
                      <Input
                        name="model"
                        label="Model"
                        value={formData.model}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., AD102-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-400 flex items-center gap-2">
                      <Zap size={16} />
                      Performance Details
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        name="performance"
                        label="Performance Score"
                        type="number"
                        value={formData.performance}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., 95"
                      />
                      <Input
                        name="vram"
                        label="VRAM (GB)"
                        type="number"
                        value={formData.vram}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., 24"
                      />
                    </div>
                    <Input
                      name="pricePerHour"
                      label="Price per Hour (SOL)"
                      type="number"
                      step="0.01"
                      value={formData.pricePerHour}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., 0.5"
                      icon={<DollarSign className="text-glow-400" />}
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-400 flex items-center gap-2">
                      <ImageIcon size={16} />
                      Media & Description
                    </h3>
                    <Input
                      name="imageUrl"
                      label="Image URL"
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter GPU image URL"
                    />
                    <div className={`
                      aspect-video rounded-lg border-2 border-dashed
                      ${formData.imageUrl ? 'border-dark-600' : 'border-dark-700'}
                      overflow-hidden relative group transition-colors
                    `}>
                      {formData.imageUrl ? (
                        <img
                          src={formData.imageUrl}
                          alt="GPU Preview"
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          onError={() => setPreviewError(true)}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                          <span>Image preview will appear here</span>
                        </div>
                      )}
                      {previewError && (
                        <div className="absolute inset-0 bg-dark-800/90 flex items-center justify-center text-red-400">
                          Invalid image URL
                        </div>
                      )}
                    </div>
                    <Input
                      name="description"
                      label="Description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      placeholder="Describe the GPU's capabilities and features"
                      multiline
                      className="h-[104px]"
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-dark-700">
                <Button
                  variant="secondary"
                  onClick={onClose}
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  loading={loading}
                >
                  Create GPU
                </Button>
              </div>
            </form>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}; 