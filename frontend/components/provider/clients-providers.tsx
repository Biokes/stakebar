"use client";
import { useEffect, useState, createContext, useContext, useCallback, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HederaSessionEvent, HederaJsonRpcMethod, DAppConnector, HederaChainId } from '@hashgraph/hedera-wallet-connect';
import { LedgerId } from '@hashgraph/sdk';
import { APP_NAME, PROJECT_ID, APP_DESCRIPTION } from '@/lib/utils';
import { DAppConnectorWithEvents, ProvidersProps, WalletEvent, type DAppConnectorContext } from '@/lib/types';
import { toast } from 'sonner';
import Loading from '../ui/loading';


const queryClient = new QueryClient();

const metadata = {
  name: APP_NAME,
  description: APP_DESCRIPTION,
  url: '',
  icons: [''],
};


const DAppConnectorContext = createContext<DAppConnectorContext | null>(null);
export const useDAppConnector = () => useContext(DAppConnectorContext);

export function ClientProviders({ children }: ProvidersProps) {
    const [dAppConnector, setDAppConnector] = useState<DAppConnector | null>(null);
    const [isReady, setIsReady] = useState(false);
    const [userAccountId, setUserAccountId] = useState<string | null>(null);
    const [sessionTopic, setSessionTopic] = useState<string | null>(null);

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

    const disconnect = useCallback(async () => {
        if (dAppConnector && sessionTopic) {
            toast.info("Trying to connect wallet. please wait");
            await dAppConnector.disconnect(sessionTopic);
            setUserAccountId(null);
            setSessionTopic(null);
        }
    }, [dAppConnector, sessionTopic, ]);

    const refresh = useCallback(() => {
        if (dAppConnector) {
            setUserAccountId(dAppConnector.signers?.[0]?.getAccountId().toString() ?? null);
            setSessionTopic(dAppConnector.signers?.[0]?.topic ?? null);
        }
    }, [dAppConnector]);

    const connect = useCallback(async () => {
        if (dAppConnector) {
            await dAppConnector.openModal();
            refresh();
        }
    }, [dAppConnector, refresh]);

    useEffect(() => {
        let isMounted = true;

        const init = async () => {
            try {
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
            } catch (error) {
                console.error('Failed to initialize connector:', error);
            }
        };

        init();

        return () => {
            isMounted = false;
        };
    }, []);

    const value = useMemo(() => ({
        dAppConnector,
        userAccountId,
        sessionTopic,
        disconnect,
        refresh,
        connect,
    }), [dAppConnector, userAccountId, sessionTopic, disconnect, refresh, connect]);

    if (!isReady) return (<Loading/>);

    return (
        <DAppConnectorContext.Provider value={value}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </DAppConnectorContext.Provider>
    );
}