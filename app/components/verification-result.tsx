
'use client';

import { Card } from './ui/card';
import { StatusBadge } from './ui/status-badge';
import { Button } from './ui/button';
import { CheckCircle, XCircle, Shield, AlertTriangle } from 'lucide-react';
import type { VerificationResult } from '../types/nft';

interface VerificationResultProps {
  result: VerificationResult;
  contractAddress: string;
  tokenId: string;
  onReset: () => void;
}

export function VerificationResultCard({ 
  result, 
  contractAddress, 
  tokenId, 
  onReset 
}: VerificationResultProps) {
  if (result.error) {
    return (
      <Card title="Verification Failed">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-red-600">
            <XCircle size={20} />
            <span className="text-body font-medium">Error occurred during verification</span>
          </div>
          <p className="text-caption text-muted">{result.error}</p>
          <Button onClick={onReset} variant="secondary" className="w-full">
            Try Again
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card title="Verification Complete">
      <div className="space-y-4">
        {/* Overall Status */}
        <div className="flex items-center justify-between p-3 rounded-md bg-gray-50">
          <div className="flex items-center gap-2">
            {result.isVerified ? (
              <CheckCircle className="text-green-600" size={20} />
            ) : (
              <AlertTriangle className="text-red-600" size={20} />
            )}
            <span className="text-body font-medium">
              {result.isVerified ? 'NFT Verified' : 'NFT Not Verified'}
            </span>
          </div>
          <StatusBadge variant={result.isVerified ? 'verified' : 'unverified'} />
        </div>

        {/* Contract Verification */}
        <div className="flex items-center justify-between p-3 rounded-md bg-gray-50">
          <div className="flex items-center gap-2">
            <Shield className={result.contractVerified ? 'text-green-600' : 'text-yellow-600'} size={20} />
            <span className="text-body font-medium">Contract Verification</span>
          </div>
          <StatusBadge variant={result.contractVerified ? 'verified' : 'unverified'} />
        </div>

        {/* NFT Details */}
        <div className="space-y-2">
          <h4 className="text-body font-medium">NFT Details:</h4>
          <div className="text-caption text-muted space-y-1">
            <p><strong>Contract:</strong> {contractAddress}</p>
            <p><strong>Token ID:</strong> {tokenId}</p>
            {result.metadata?.name && (
              <p><strong>Name:</strong> {result.metadata.name}</p>
            )}
            {result.metadata?.description && (
              <p><strong>Description:</strong> {result.metadata.description}</p>
            )}
          </div>
        </div>

        {/* Verification Details */}
        <div className="space-y-2">
          <h4 className="text-body font-medium">Verification Summary:</h4>
          <ul className="text-caption text-muted space-y-1">
            <li>✓ Contract address format validated</li>
            <li>✓ Token existence confirmed</li>
            <li className={result.contractVerified ? 'text-green-600' : 'text-yellow-600'}>
              {result.contractVerified ? '✓' : '⚠'} Contract source code verification
            </li>
            <li className={result.isVerified ? 'text-green-600' : 'text-red-600'}>
              {result.isVerified ? '✓' : '✗'} Overall legitimacy assessment
            </li>
          </ul>
        </div>

        <Button onClick={onReset} variant="secondary" className="w-full">
          Verify Another NFT
        </Button>
      </div>
    </Card>
  );
}
