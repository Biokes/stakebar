import { motion } from "framer-motion";
import Image from "next/image";

export default function Loading() {
    return (
        <div className={"w-full h-screen flex items-center justify-center bg-black"}>
            <div className="w-[200px] h-[200px]">
                <motion.div animate={{ scale: [0.5, 2, 0.5], opacity: [0.7, 2, 0.7] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", }}>
                    <Image src="/android-chrome-512x512.png" alt="YieldFi Logo" width={140} height={140} className="object-contain object-center" priority />
                </motion.div>
            </div>
        </div>
    )
}