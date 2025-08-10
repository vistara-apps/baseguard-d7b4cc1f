
export interface NFT {
  contractAddress: string;
  tokenId: string;
  chain: string;
  isVerified: boolean;
  metadata: {
    name?: string;
    description?: string;
    image?: string;
    attributes?: Array<{
      trait_type: string;
      value: string;
    }>;
  };
  ownerWalletAddress: string;
}

export interface VerificationRequest {
  requestId: string;
  walletAddress: string;
  contractAddress: string;
  tokenId: string;
  timestamp: number;
  status: 'pending' | 'completed' | 'failed';
  result: {
    isVerified: boolean;
    verificationSource: string;
    details?: string;
  };
}

export interface User {
  walletAddress: string;
  verificationHistory: VerificationRequest[];
}

export interface VerificationResult {
  isVerified: boolean;
  contractVerified: boolean;
  metadata?: any;
  error?: string;
}
