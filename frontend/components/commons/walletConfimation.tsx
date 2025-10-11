// import { WalletConfirmationProps } from "@/lib/types";
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

// export default function WalletConfirmation({ isOpen, setIsOpen }: WalletConfirmationProps) {
//     const handleConnectWallet = () => { }
//     const handleContinueWithout = () => { }
//     return (
//         <Dialog open={isOpen} onOpenChange={setIsOpen} >
//             <DialogContent className="sm:max-w-md py-6 pt-12">
//                 <DialogHeader>
//                     <DialogTitle className="py-4">Choose Connection Method</DialogTitle>
//                     <DialogDescription>
//                         Select how you`&apos;`d like to Connect
//                     </DialogDescription>
//                 </DialogHeader>
//                 <div className="space-y-3 mt-6 flex flex-col gap-4 ">
//                     <button onClick={handleConnectWallet}
//                         className="w-full p-4 border-2 border-blue-500 rounded-lg hover:bg-blue-50 transition-colors text-left"
//                     >
//                         <h3 className="font-bold text-md text-blue-600">
//                              I have a Wallet
//                         </h3>
//                         <p className="text-sm text-gray-600 mt-1">
//                             Link your crypto wallet to access full features and manage your assets securely.
//                         </p>
//                     </button>

//                     <button onClick={handleContinueWithout}
//                         className="w-full p-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
//                     >
//                         <h3 className="font-bold text-lg text-gray-700">
//                             I don&apos;t have a Wallet
//                         </h3>
//                         <p className="text-sm text-gray-600 mt-1">
//                             Explore the platform without connecting a wallet. You can add one later.
//                         </p>
//                     </button>
//                 </div>
//             </DialogContent>
//         </Dialog>
//     )
// }

import { WalletConfirmationProps } from "@/lib/types";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { BookOpen, Wallet, MessageCircle } from "lucide-react";
import { useWalletConnect } from "../provider/hooks/useWalletConnect";

interface ConnectionOption {
    id: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    action?: () => void;
}

export default function WalletConfirmation({ isOpen, setIsOpen }: WalletConfirmationProps) {
    const { connect } = useWalletConnect();
    const options: ConnectionOption[] = [
        {
            id: "beginner",
            icon: <BookOpen className="h-6 w-6 text-black" />,
            title: "Connect as a Beginner",
            description: "I want to continue without a wallet.",
        },
        {
            id: "wallet",
            icon: <Wallet className="h-6 w-6 text-black" />,
            title: "Connect with My Wallet",
            description: "I have an existing crypto wallet.",
            action: connect
        },
        {
            id: "whatsapp",
            icon: <MessageCircle className="h-6 w-6 text-black" />,
            title: "Continue with WhatsApp",
            description: "I want WhatsApp for a simplified experience.",
        },
    ];

    const handleOptionClick = (id: string) => {
        console.log(`Selected: ${id}`);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-md py-6 pt-12">
                <DialogHeader>
                    <DialogTitle className="py-4">Choose Connection Method</DialogTitle>
                    <DialogDescription>
                        Select how you'd like to connect
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 mt-6 flex flex-col gap-4">
                    {options.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => handleOptionClick(option.id)}
                            className="w-full p-4 border-2 border-gray-300 rounded-lg hover:border-border hover:bg-border transition-colors text-left"
                        >
                            <div className="flex items-center gap-3">
                                {option.icon}
                                <h3 className="font-bold text-md text-gray-200">
                                    {option.title}
                                </h3>
                            </div>
                            <p className="text-sm text-gray-200 mt-1">
                                {option.description}
                            </p>
                        </button>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}