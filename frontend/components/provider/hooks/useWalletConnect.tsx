
import { UseWalletConnectReturn } from '@/lib/types';
import { useDAppConnector } from '../clients-providers';


export function useWalletConnect(): UseWalletConnectReturn {
    const context = useDAppConnector();

    if (!context) {
        throw new Error('useWalletConnect must be used within ClientProviders');
    }

    const { dAppConnector, userAccountId, sessionTopic, disconnect, refresh, connect } = context;

    const isConnected = !!userAccountId && !!sessionTopic;
    const isLoading = dAppConnector === null;

    return {
        dAppConnector,
        userAccountId,
        sessionTopic,
        disconnect: disconnect || (async () => { }),
        refresh: refresh || (() => { }),
        isConnected,
        isLoading,
        connect
    };
}