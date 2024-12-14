import { useState, useCallback } from 'react';
import { PublicKey } from '@solana/web3.js';
import { GPU } from '../types/gpu';
import { createPaymentTransaction, connection } from '../utils/solana';
import { RentalHistory } from '../types/rental';

export const useRentals = () => {
  const [rentals, setRentals] = useState<RentalHistory[]>([]);

  const handleRent = async (gpu: GPU, hours: number, publicKey: PublicKey) => {
    try {
      const price = gpu.pricePerHour * hours;
      const transaction = await createPaymentTransaction(publicKey, price);

      // @ts-ignore
      const { signature } = await window.solana.signAndSendTransaction(transaction);
      await connection.confirmTransaction(signature);

      const newRental: RentalHistory = {
        id: signature,
        gpu,
        hours,
        price,
        timestamp: new Date(),
        status: 'active'
      };

      setRentals(prev => [...prev, newRental]);
      return { success: true, rental: newRental };
    } catch (error) {
      console.error('Rental transaction error:', error);
      return { success: false, error };
    }
  };

  const handleExpire = useCallback((rentalId: string) => {
    setRentals(prev =>
      prev.map(rental =>
        rental.id === rentalId
          ? { ...rental, status: 'expired' }
          : rental
      )
    );
  }, []);

  const getActiveRentals = useCallback(() => {
    return rentals.filter(rental => rental.status === 'active');
  }, [rentals]);

  const getTotalSpent = useCallback(() => {
    return rentals.reduce((sum, rental) => sum + rental.price, 0);
  }, [rentals]);

  return {
    rentals,
    handleRent,
    handleExpire,
    getActiveRentals,
    getTotalSpent
  };
};