import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';

const RECIPIENT_WALLET = new PublicKey('B99ZeAHD4ZxGfSwbQRqbpQPpAigzwDCyx4ShHTcYCAtS');
const NETWORK = 'devnet';

export const connection = new Connection(
  `https://api.${NETWORK}.solana.com`,
  'confirmed'
);

export const calculatePrice = (pricePerHour: number, hours: number): number => {
  return Math.max(0.01, pricePerHour * hours);
};

export const createPaymentTransaction = async (
  fromPubkey: PublicKey,
  amount: number
): Promise<Transaction> => {
  try {
    const transaction = new Transaction();
    
    const transferInstruction = SystemProgram.transfer({
      fromPubkey,
      toPubkey: RECIPIENT_WALLET,
      lamports: Math.floor(amount * LAMPORTS_PER_SOL),
    });

    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    
    transaction.add(transferInstruction);
    transaction.recentBlockhash = blockhash;
    transaction.lastValidBlockHeight = lastValidBlockHeight;
    transaction.feePayer = fromPubkey;
    
    return transaction;
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
};

export const getBalance = async (publicKey: PublicKey): Promise<number> => {
  try {
    const balance = await connection.getBalance(publicKey);
    return balance / LAMPORTS_PER_SOL;
  } catch (error) {
    console.error('Error getting balance:', error);
    throw error;
  }
};