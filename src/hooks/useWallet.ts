import { useState, useCallback, useEffect } from 'react';
import { PublicKey } from '@solana/web3.js';
import { WalletAdapter } from '../types/wallet';

declare global {
  interface Window {
    solflare: any;
  }
}

export const useWallet = () => {
  const [wallet, setWallet] = useState<WalletAdapter | null>(null);
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null);
  const [connecting, setConnecting] = useState(false);

  const initWallet = useCallback(async () => {
    if (typeof window === 'undefined') return;

    try {
      const solflare = window.solflare;

      if (solflare) {
        if (!solflare.isReady) {
          await new Promise<void>((resolve) => {
            const listener = () => {
              solflare.off('ready', listener);
              resolve();
            };
            solflare.on('ready', listener);
          });
        }

        const adapter: WalletAdapter = {
          connected: solflare.connected,
          publicKey: solflare.publicKey,
          connect: async () => {
            try {
              await solflare.connect();
            } catch (error) {
              console.error('Connection error:', error);
              throw error;
            }
          },
          disconnect: async () => {
            try {
              await solflare.disconnect();
            } catch (error) {
              console.error('Disconnection error:', error);
              throw error;
            }
          },
          signAndSendTransaction: async (transaction) => {
            return await solflare.signAndSendTransaction(transaction);
          }
        };

        setWallet(adapter);

        if (solflare.connected) {
          setConnected(true);
          setPublicKey(solflare.publicKey);
        }
      }
    } catch (error) {
      console.error('Error initializing wallet:', error);
    }
  }, []);

  const connectWallet = async () => {
    if (!window.solflare) {
      window.open('https://solflare.com/download', '_blank');
      return;
    }

    try {
      setConnecting(true);
      await window.solflare.connect();
      setConnected(true);
      setPublicKey(window.solflare.publicKey);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    } finally {
      setConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    if (!window.solflare) return;

    try {
      await window.solflare.disconnect();
      setConnected(false);
      setPublicKey(null);
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  useEffect(() => {
    initWallet();

    const handleConnect = () => {
      if (window.solflare) {
        setConnected(true);
        setPublicKey(window.solflare.publicKey);
      }
    };

    const handleDisconnect = () => {
      setConnected(false);
      setPublicKey(null);
    };

    window.solflare?.on('connect', handleConnect);
    window.solflare?.on('disconnect', handleDisconnect);
    window.solflare?.on('accountChanged', handleConnect);

    return () => {
      window.solflare?.off('connect', handleConnect);
      window.solflare?.off('disconnect', handleDisconnect);
      window.solflare?.off('accountChanged', handleConnect);
    };
  }, [initWallet]);

  return {
    wallet,
    connected,
    publicKey,
    connecting,
    connectWallet,
    disconnectWallet
  };
};