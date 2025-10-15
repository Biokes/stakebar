"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Loading from "@/components/ui/loading";
import { toast } from "sonner";


export default function Verify() {
    const router = useRouter();
    const params = useParams();

    useEffect(() => {
        const verify = async () => {
            const email = params.email as string;
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify/${email}`, {method: "PATCH"});
                const data = await res.json();
                if (data.success) {
                    router.replace("/home");
                } else {
                    toast.error("Verification Failed. pls try again")
                    router.replace("/");
                }
            } catch {
                toast.error("Verification Failed. pls try again")
                router.replace("/");
            }
        };
        verify();
    }, [params, router]);

    return (
        <Loading />
    )
}