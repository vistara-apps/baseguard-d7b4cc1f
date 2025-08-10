
'use client';

import { ConnectWallet, Wallet, WalletDropdown, WalletDropdownDisconnect } from '@coinbase/onchainkit/wallet';
import { Name, Identity, Address, Avatar } from '@coinbase/onchainkit/identity';
import { Button } from './ui/button';

interface WalletConnectButtonProps {
  variant?: 'primary' | 'secondary';
}

export function WalletConnectButton({ variant = 'primary' }: WalletConnectButtonProps) {
  return (
    <Wallet className="z-10">
      <ConnectWallet>
        <Button variant={variant} className="w-full">
          <Name className="text-inherit" />
        </Button>
      </ConnectWallet>
      <WalletDropdown>
        <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
          <Avatar />
          <Name />
          <Address />
        </Identity>
        <WalletDropdownDisconnect />
      </WalletDropdown>
    </Wallet>
  );
}
