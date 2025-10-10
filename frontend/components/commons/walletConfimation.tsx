import { WalletConfirmationProps } from "@/lib/types";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

export default function WalletConfirmation({ isOpen, setIsOpen }: WalletConfirmationProps) {
    const handleConnectWallet = () => { }
    const handleContinueWithout = () => { }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen} >
            <DialogContent className="sm:max-w-md py-6 pt-12">
                <DialogHeader>
                    <DialogTitle className="py-4">Choose Connection Method</DialogTitle>
                    <DialogDescription>
                        Select how you'd like to Connect 
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 mt-6 flex flex-col gap-4 ">
                    <button onClick={handleConnectWallet}
                        className="w-full p-4 border-2 border-blue-500 rounded-lg hover:bg-blue-50 transition-colors text-left"
                    >
                        <h3 className="font-bold text-md text-blue-600">
                             I have a Wallet
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                            Link your crypto wallet to access full features and manage your assets securely.
                        </p>
                    </button>

                    <button onClick={handleContinueWithout}
                        className="w-full p-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
                    >
                        <h3 className="font-bold text-lg text-gray-700">
                            I don't have a Wallet
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                            Explore the platform without connecting a wallet. You can add one later.
                        </p>
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}