"use client"
import { ApiResponse, ConnectionOption, WalletConfirmationProps } from "@/lib/types";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose, DialogFooter } from "../ui/dialog";
import { BookOpen, Wallet, Mail } from "lucide-react";
import { useWalletConnect } from "../provider/hooks/useWalletConnect";
import { useState } from "react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useWhatsappConnect } from "../provider/hooks/useWhatsappConnect";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export default function WalletConfirmation({ isOpen, setIsOpen }: WalletConfirmationProps) {
    const { openWhatsApp } = useWhatsappConnect()
    const { connect } = useWalletConnect();
    const [isEmailDialogOpen, setEmailDialogOpen] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const router = useRouter()
    const handleEmailSubmit = async () => {
        setError("");
        setIsLoading(true);
        try {
            const data: Response = await fetch(`http://localhost:5000/api/v1/users/isVerified/${email}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            })
            const response: ApiResponse<boolean> = await data.json();
            if (response.success) {
                if (response.data) {
                    toast.success("welcome back");
                    router.push("/home")
                } else {
                    await fetch(`http://localhost:5000/api/v1/users/register/${email}`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                    })
                    toast.error("Email does not exist")
                }
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setEmailDialogOpen(false);
            setIsOpen(false);
            setIsLoading(false);
            setEmail("");
        }
    };


    const options: ConnectionOption[] = [
        {
            id: "beginner",
            icon: <BookOpen className="h-6 w-6 text-black" />,
            title: "Connect as a Beginner",
            description: "I want to continue without a wallet.",
            action: () => openWhatsApp({ phoneNumber: "2348112164332", message: "i want to start investing in YieldFi" })
        },
        {
            id: "wallet",
            icon: <Wallet className="h-6 w-6 text-black" />,
            title: "Connect with My Wallet",
            description: "I have an existing cry    pto wallet.",
            action: () => connect()
        },
        {
            id: "email",
            icon: <Mail className="h-6 w-6 text-black" />,
            title: "Continue with Email",
            description: "I want to use email for a simplified experience.",
            action: () => setEmailDialogOpen(true)
        },
    ];

    const handleOptionClick = (option: ConnectionOption) => {
        option.action?.();
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-md py-6 pt-12">
                    <DialogHeader>
                        <DialogTitle className="py-4">Choose Connection Method</DialogTitle>
                        <DialogDescription>
                            Select how you&apos;d like to connect
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3 mt-6 flex flex-col gap-4">
                        {options.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => handleOptionClick(option)}
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

            <Dialog open={isEmailDialogOpen} onOpenChange={setEmailDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Connect with Email</DialogTitle>
                        <DialogDescription>
                            Enter your email address to continue. We&apos;ll send you a link to verify your account.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className={`${error.length < 1 ? "py-2" : ""} grid gap-2`}>
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" placeholder="you@example.com" value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                                disabled={isLoading} required />
                            {error && (<p className="text-sm text-red-500 py-2">{error}</p>)}
                        </div>
                    </div>

                    <DialogFooter className="flex px-4 gap-2">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="button" disabled={isLoading || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)} onClick={handleEmailSubmit}>
                            {isLoading ? "Connecting..." : "Continue"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}