"use client";

import { ReactNode, useEffect, useState, createContext, useContext, useCallback } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  HederaSessionEvent,
  HederaJsonRpcMethod,
  DAppConnector,
  HederaChainId,
} from '@hashgraph/hedera-wallet-connect';
import { LedgerId } from '@hashgraph/sdk';
import { APP_NAME, PROJECT_ID } from '@/lib/utils';


interface WalletEvent {
  name: string;
  data: {
    topic?: string;
    [key: string]: unknown;
  };
}

interface DAppConnectorWithEvents extends DAppConnector {
  events$?: {
    subscribe: (callback: (event: WalletEvent) => void) => { unsubscribe: () => void };
  };
}

const queryClient = new QueryClient();

const metadata = {
  name: APP_NAME,
  description: 'Bringing defi to everyone',
  url: '',
  icons: ['https'],
};

type DAppConnectorContext = {
  dAppConnector: DAppConnector | null;
  userAccountId: string | null;
  sessionTopic: string | null;
  disconnect: (() => Promise<void>) | null;
  refresh: (() => void) | null;
};

const DAppConnectorContext = createContext<DAppConnectorContext | null>(null);
export const useDAppConnector = () => useContext(DAppConnectorContext);

type ClientProvidersProps = {
  children: ReactNode;
};

export function ClientProviders({ children }: ClientProvidersProps) {
  const [dAppConnector, setDAppConnector] = useState<DAppConnector | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [userAccountId, setUserAccountId] = useState<string | null>(null);
  const [sessionTopic, setSessionTopic] = useState<string | null>(null);
  const [isMounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    if (!dAppConnector) return;

    const connectorWithEvents = dAppConnector as DAppConnectorWithEvents;
    const subscription = connectorWithEvents.events$?.subscribe((event: WalletEvent) => {
      if (event.name === 'accountsChanged' || event.name === 'chainChanged') {
        setUserAccountId(dAppConnector.signers?.[0]?.getAccountId().toString() ?? null);

        if (event.data && event.data.topic) {
          setSessionTopic(event.data.topic);
        } else if (dAppConnector.signers?.[0]?.topic) {
          setSessionTopic(dAppConnector.signers[0].topic);
        } else {
          setSessionTopic(null);
        }
      } else if (event.name === 'session_delete' || event.name === 'sessionDelete') {
        setUserAccountId(null);
        setSessionTopic(null);
      }
    });

    setUserAccountId(dAppConnector.signers?.[0]?.getAccountId().toString() ?? null);
    if (dAppConnector.signers?.[0]?.topic) setSessionTopic(dAppConnector.signers[0].topic);
    return () => subscription && subscription.unsubscribe();
  }, [dAppConnector]);

  const disconnect = async () => {
    if (dAppConnector && sessionTopic) {
      await dAppConnector.disconnect(sessionTopic);
      setUserAccountId(null);
      setSessionTopic(null);
    }
  };

  const refresh = () => {
    if (dAppConnector) {
      setUserAccountId(dAppConnector.signers?.[0]?.getAccountId().toString() ?? null);
      setSessionTopic(dAppConnector.signers?.[0]?.topic ?? null);
    }
  };

  const connect = useCallback(async () => {
    const connector = new DAppConnector(
      metadata,
      LedgerId.TESTNET,
      PROJECT_ID,
      Object.values(HederaJsonRpcMethod),
      [HederaSessionEvent.ChainChanged, HederaSessionEvent.AccountsChanged],
      [HederaChainId.Mainnet, HederaChainId.Testnet],
    );
    await connector.init();
    if (isMounted) {
      setDAppConnector(connector);
      setIsReady(true);
    }
  }, [])

  useEffect(() => {
    setMounted(true);
    const init = () => connect()
    init().catch(console.log);
    return () => {
      setMounted(false);
    };
  }, [connect]);

  if (!isReady)
    return (
      <div style={{ color: 'white', textAlign: 'center', marginTop: '2rem' }}>
        Loading wallet...
      </div>
    );

  return (
    <DAppConnectorContext.Provider value={{ dAppConnector, userAccountId, sessionTopic, disconnect, refresh }}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </DAppConnectorContext.Provider>
  );
}