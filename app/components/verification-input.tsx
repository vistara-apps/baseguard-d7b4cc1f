
'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Search } from 'lucide-react';

interface VerificationInputProps {
  onVerify: (contractAddress: string, tokenId: string) => void;
  isLoading?: boolean;
  variant?: 'default' | 'error';
}

export function VerificationInput({ onVerify, isLoading, variant = 'default' }: VerificationInputProps) {
  const [contractAddress, setContractAddress] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [errors, setErrors] = useState<{ contract?: string; tokenId?: string }>({});

  const validateInputs = () => {
    const newErrors: { contract?: string; tokenId?: string } = {};
    
    if (!contractAddress.trim()) {
      newErrors.contract = 'Contract address is required';
    } else if (!contractAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
      newErrors.contract = 'Invalid contract address format';
    }

    if (!tokenId.trim()) {
      newErrors.tokenId = 'Token ID is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInputs()) {
      onVerify(contractAddress.trim(), tokenId.trim());
    }
  };

  return (
    <Card title="Verify Specific NFT">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="contract" className="text-body font-medium">
            Contract Address
          </label>
          <Input
            id="contract"
            type="text"
            placeholder="0x..."
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            variant={errors.contract ? 'error' : 'default'}
          />
          {errors.contract && (
            <p className="text-caption text-red-600">{errors.contract}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="tokenId" className="text-body font-medium">
            Token ID
          </label>
          <Input
            id="tokenId"
            type="text"
            placeholder="1, 2, 3..."
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            variant={errors.tokenId ? 'error' : 'default'}
          />
          {errors.tokenId && (
            <p className="text-caption text-red-600">{errors.tokenId}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Verifying...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Search size={16} />
              Verify NFT
            </div>
          )}
        </Button>
      </form>
    </Card>
  );
}
