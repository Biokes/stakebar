import { useCallback } from 'react';

interface WhatsAppConnectParams {
  phoneNumber: string;
  message?: string;
}

export function useWhatsappConnect() {
  const isMobile = useCallback((): boolean => {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }, []);

  const openWhatsApp = useCallback(({ phoneNumber, message = 'i want to invest' }: WhatsAppConnectParams) => {
    const cleanedPhone = phoneNumber.replace(/\D/g, '');
    
    if (!cleanedPhone) {
      console.error('Invalid phone number provided');
      return;
    }

    const encodedMessage = encodeURIComponent(message);

    const isDeviceMobile = isMobile();
    const url = isDeviceMobile
      ? `https://api.whatsapp.com/send?phone=${cleanedPhone}&text=${encodedMessage}`
      : `https://web.whatsapp.com/send?phone=${cleanedPhone}&text=${encodedMessage}`;
    window.open(url, '_blank');
  }, [isMobile]);

  return {
    openWhatsApp,
    isMobile: isMobile(),
  };
}