import { ConnectionOption, WalletConfirmationProps } from "@/lib/types";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { BookOpen, Wallet, MessageCircle } from "lucide-react";
import { useWalletConnect } from "../provider/hooks/useWalletConnect";


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

    const handleOptionClick = (id: number) => {
        console.log(`Selected: ${options[id].id}`);
        options[id].action?.()
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
                    {options.map((option, index) => (
                        <button
                            key={option.id}
                            onClick={() => handleOptionClick(index)}
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