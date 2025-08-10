
'use client';

import { useState } from 'react';
import { VerificationInput } from './verification-input';
import { VerificationResultCard } from './verification-result';
import { NFTVerificationService } from '../services/nft-verification';
import type { VerificationResult } from '../types/nft';

export function OnDemandVerifier() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [currentVerification, setCurrentVerification] = useState<{
    contractAddress: string;
    tokenId: string;
  } | null>(null);

  const handleVerify = async (contractAddress: string, tokenId: string) => {
    setIsLoading(true);
    setResult(null);
    setCurrentVerification({ contractAddress, tokenId });

    try {
      const verificationResult = await NFTVerificationService.verifyNFT(contractAddress, tokenId);
      setResult(verificationResult);
    } catch (error) {
      setResult({
        isVerified: false,
        contractVerified: false,
        error: 'Failed to verify NFT. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setCurrentVerification(null);
    setIsLoading(false);
  };

  if (result && currentVerification) {
    return (
      <VerificationResultCard
        result={result}
        contractAddress={currentVerification.contractAddress}
        tokenId={currentVerification.tokenId}
        onReset={handleReset}
      />
    );
  }

  return (
    <VerificationInput
      onVerify={handleVerify}
      isLoading={isLoading}
    />
  );
}
