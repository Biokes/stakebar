import React from "react";


export interface WalletConfirmationProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface UseWalletConnectReturn {
  dAppConnector: any;
  userAccountId: string | null;
  sessionTopic: string | null;
  disconnect: () => Promise<void>;
  refresh: () => void;
  isConnected: boolean;
  isLoading: boolean;
}