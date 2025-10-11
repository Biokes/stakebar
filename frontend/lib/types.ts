import React, { ReactNode } from "react";
import { DAppConnector } from '@hashgraph/hedera-wallet-connect';


export interface WalletConfirmationProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface UseWalletConnectReturn {
  dAppConnector: any;
  userAccountId: string | null;
  sessionTopic: string | null;
  disconnect: () => Promise<void>;
  connect: () => Promise<void>;
  refresh: () => void;
  isConnected: boolean;
  isLoading: boolean;
}

export interface ConnectionOption {
    id: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    action?: () => void;
}
export  type ProvidersProps = {
  children: ReactNode;
};


export interface WalletEvent {
  name: string;
  data: {
    topic?: string;
    [key: string]: unknown;
  };
}

export type DAppConnectorContext = {
  dAppConnector: DAppConnector | null;
  userAccountId: string | null;
  sessionTopic: string | null;
  disconnect: (() => Promise<void>) | null;
  refresh: (() => void) | null;
  connect: (()=>Promise<void>)
};


export interface DAppConnectorWithEvents extends DAppConnector {
  events$?: {
    subscribe: (callback: (event: WalletEvent) => void) => { unsubscribe: () => void };
  };
}