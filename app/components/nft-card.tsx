
'use client';

import Image from 'next/image';
import { Card } from './ui/card';
import { StatusBadge } from './ui/status-badge';
import type { NFT } from '../types/nft';
import { cn } from '../utils/cn';

interface NFTCardProps {
  nft: NFT;
  variant?: 'verified' | 'unverified' | 'loading';
  onClick?: () => void;
}

export function NFTCard({ nft, variant, onClick }: NFTCardProps) {
  const isVerified = nft.isVerified;
  const badgeVariant = variant === 'loading' ? 'pending' : (isVerified ? 'verified' : 'unverified');

  return (
    <Card 
      className={cn(
        'cursor-pointer transition-all duration-200 hover:shadow-lg',
        'border-2',
        {
          'border-green-200 bg-green-50': isVerified && variant !== 'loading',
          'border-red-200 bg-red-50': !isVerified && variant !== 'loading',
          'border-yellow-200 bg-yellow-50': variant === 'loading',
        }
      )}
      onClick={onClick}
    >
      <div className="space-y-3">
        {/* NFT Image */}
        <div className="relative aspect-square rounded-md overflow-hidden bg-gray-100">
          {nft.metadata.image ? (
            <Image
              src={nft.metadata.image}
              alt={nft.metadata.name || 'NFT'}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted">
              No Image
            </div>
          )}
        </div>

        {/* NFT Info */}
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="text-heading truncate">
              {nft.metadata.name || `Token #${nft.tokenId}`}
            </h3>
            <StatusBadge variant={badgeVariant} />
          </div>

          <p className="text-caption text-muted line-clamp-2">
            {nft.metadata.description || 'No description available'}
          </p>

          <div className="text-caption text-muted space-y-1">
            <p>Token ID: {nft.tokenId}</p>
            <p className="truncate">Contract: {nft.contractAddress}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
