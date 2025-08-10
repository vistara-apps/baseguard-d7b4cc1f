
'use client';

import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { NFTCard } from './nft-card';
import { WalletConnectButton } from './wallet-connect-button';
import { Button } from './ui/button';
import { RefreshCw } from 'lucide-react';
import { NFTVerificationService } from '../services/nft-verification';
import type { NFT } from '../types/nft';

export function WalletNFTScanner() {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const [walletConnected, setWalletConnected] = useState(false);

  // Mock wallet connection for demo
  useEffect(() => {
    // Simulate wallet connection detection
    const timer = setTimeout(() => {
      setWalletConnected(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const scanWallet = async () => {
    if (!walletConnected) return;
    
    setIsLoading(true);
    try {
      // Mock wallet address for demo
      const mockWalletAddress = '0x742d35Cc4Af927c19be179FfD86e52C9532e6C6';
      const walletNFTs = await NFTVerificationService.getWalletNFTs(mockWalletAddress);
      setNfts(walletNFTs);
    } catch (error) {
      console.error('Failed to scan wallet:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNFTClick = (nft: NFT) => {
    setSelectedNFT(nft);
  };

  const closeNFTDetails = () => {
    setSelectedNFT(null);
  };

  if (selectedNFT) {
    return (
      <Card title="NFT Details">
        <div className="space-y-4">
          <NFTCard 
            nft={selectedNFT} 
            variant={selectedNFT.isVerified ? 'verified' : 'unverified'} 
          />
          
          <div className="space-y-2">
            <h4 className="text-body font-medium">Verification Details:</h4>
            <div className="text-caption text-muted space-y-1">
              <p><strong>Status:</strong> {selectedNFT.isVerified ? 'Verified' : 'Unverified'}</p>
              <p><strong>Chain:</strong> {selectedNFT.chain}</p>
              <p><strong>Owner:</strong> {selectedNFT.ownerWalletAddress}</p>
              {selectedNFT.metadata.attributes && (
                <div>
                  <strong>Attributes:</strong>
                  <ul className="mt-1 ml-4">
                    {selectedNFT.metadata.attributes.map((attr, index) => (
                      <li key={index}>
                        {attr.trait_type}: {attr.value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <Button onClick={closeNFTDetails} variant="secondary" className="w-full">
            Back to Wallet
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card title="Wallet NFT Scanner">
      <div className="space-y-4">
        {!walletConnected ? (
          <div className="text-center space-y-4">
            <p className="text-body text-muted">
              Connect your wallet to scan for NFTs
            </p>
            <WalletConnectButton variant="primary" />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <p className="text-body text-muted">
                Wallet connected • {nfts.length} NFTs found
              </p>
              <Button
                onClick={scanWallet}
                variant="secondary"
                size="sm"
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
                {isLoading ? 'Scanning...' : 'Refresh'}
              </Button>
            </div>

            {nfts.length === 0 && !isLoading && (
              <div className="text-center py-8">
                <p className="text-body text-muted">No NFTs found in this wallet</p>
                <Button onClick={scanWallet} variant="primary" className="mt-4">
                  Scan Wallet
                </Button>
              </div>
            )}

            {isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 aspect-square rounded-md mb-2"></div>
                    <div className="bg-gray-200 h-4 rounded mb-1"></div>
                    <div className="bg-gray-200 h-3 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            )}

            {nfts.length > 0 && !isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {nfts.map((nft, index) => (
                  <NFTCard
                    key={`${nft.contractAddress}-${nft.tokenId}`}
                    nft={nft}
                    variant={nft.isVerified ? 'verified' : 'unverified'}
                    onClick={() => handleNFTClick(nft)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  );
}
