import { useState } from 'react';
import { GPU } from '../types/gpu';
import { PublicKey } from '@solana/web3.js';
import { createPaymentTransaction } from '../utils/solana';
import { RentalHistory } from '../types/rental';

export const useRentals = () => {
  const [rentals, setRentals] = useState<RentalHistory[]>([]);

  const handleRent = async (gpu: GPU, hours: number, userPublicKey: PublicKey) => {
    try {
      if (!window.solflare) {
        throw new Error('Solflare not found');
      }

      if (!window.solflare.isConnected) {
        await window.solflare.connect();
      }

      // Transaction'ı oluştur
      const transaction = await createPaymentTransaction(
        userPublicKey,
        gpu.pricePerHour * hours
      );

      // İmza için cüzdana gönder
      const signature = await window.solflare.signAndSendTransaction(transaction);

      if (signature) {
        // Başarılı işlem
        const newRental: RentalHistory = {
          id: signature.signature,
          gpu,
          hours,
          price: gpu.pricePerHour * hours,
          timestamp: new Date(),
          status: 'active',
          timer: {
            endTime: new Date(Date.now() + hours * 60 * 60 * 1000),
            remainingTime: hours * 60 * 60
          }
        };

        setRentals(prev => [...prev, newRental]);
        return { success: true, signature };
      }

      return { success: false };
    } catch (error) {
      console.error('Rental transaction error:', error);
      throw error;
    }
  };

  const handleExpire = (rentalId: string) => {
    setRentals(prev =>
      prev.map(rental =>
        rental.id === rentalId
          ? { ...rental, status: 'expired' }
          : rental
      )
    );
  };

  const getTotalSpent = () => {
    return rentals.reduce((total, rental) => total + rental.price, 0);
  };

  return {
    rentals,
    handleRent,
    handleExpire,
    getTotalSpent,
  };
};