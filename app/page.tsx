
'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
  useClose,
  useViewProfile,
  useNotification
} from '@coinbase/onchainkit/minikit';
import { WalletNFTScanner } from './components/wallet-nft-scanner';
import { OnDemandVerifier } from './components/on-demand-verifier';
import { Button } from './components/ui/button';
import { Shield, Search, User, X, Plus } from 'lucide-react';

export default function BaseGuardApp() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [activeTab, setActiveTab] = useState<'wallet' | 'verify'>('wallet');
  const [frameAdded, setFrameAdded] = useState(false);
  
  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();
  const close = useClose();
  const viewProfile = useViewProfile();
  const sendNotification = useNotification();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleAddFrame = useCallback(async () => {
    try {
      const frameAdded = await addFrame();
      if (frameAdded) {
        setFrameAdded(true);
        await sendNotification({
          title: 'BaseGuard Added! 🛡️',
          body: 'You can now verify NFTs anytime from your frames.'
        });
      }
    } catch (error) {
      console.error('Failed to add frame:', error);
    }
  }, [addFrame, sendNotification]);

  const handleViewProfile = useCallback(() => {
    viewProfile();
  }, [viewProfile]);

  const saveFrameButton = useMemo(() => {
    if (context && !context.client.added) {
      return (
        <Button
          onClick={handleAddFrame}
          variant="secondary"
          size="sm"
          className="flex items-center gap-1"
        >
          <Plus size={14} />
          Save
        </Button>
      );
    }
    return null;
  }, [context, handleAddFrame]);

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface border-b border-gray-200">
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center gap-2">
              <Shield className="text-primary" size={24} />
              <h1 className="text-heading text-primary">BaseGuard</h1>
            </div>
            
            <div className="flex items-center gap-2">
              {saveFrameButton}
              <Button
                onClick={handleViewProfile}
                variant="secondary"
                size="sm"
                className="flex items-center gap-1"
              >
                <User size={14} />
                Profile
              </Button>
              <Button
                onClick={close}
                variant="secondary"
                size="sm"
                className="flex items-center gap-1"
              >
                <X size={14} />
                Close
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex bg-surface rounded-lg p-1 mb-6">
          <button
            onClick={() => setActiveTab('wallet')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'wallet'
                ? 'bg-primary text-white'
                : 'text-muted hover:text-text'
            }`}
          >
            <Shield size={16} />
            Wallet Scan
          </button>
          <button
            onClick={() => setActiveTab('verify')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'verify'
                ? 'bg-primary text-white'
                : 'text-muted hover:text-text'
            }`}
          >
            <Search size={16} />
            Verify NFT
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {activeTab === 'wallet' && <WalletNFTScanner />}
          {activeTab === 'verify' && <OnDemandVerifier />}
        </div>

        {/* Footer */}
        <footer className="mt-8 pt-4 border-t border-gray-200">
          <div className="text-center space-y-2">
            <p className="text-caption text-muted">
              Powered by Base • Built with MiniKit
            </p>
            <Button
              onClick={() => openUrl('https://base.org')}
              variant="secondary"
              size="sm"
              className="text-caption"
            >
              Learn about Base
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
}
