import { Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function ModeToggle() {
    const { theme, setTheme } = useTheme()
    const isDark = theme === "dark"

    return (
        <div onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative flex items-center justify-between w-[80px] h-10 px-1 py-0.5 border rounded-full cursor-pointer select-none overflow-hidden"
        >
            <motion.div animate={{ x: isDark ? 36 : 0 }} transition={{ type: "spring", stiffness: 150, damping: 15 }}
                className="absolute w-8 h-8 rounded-full bg-primary top-1 left-1"
            />

            <div className="relative z-10 flex items-center justify-center w-10 h-10">
                <Sun className={`h-5 w-5 transition-colors ${!isDark ? "text-primary-foreground" : "text-muted-foreground"}`} />
            </div>

            <div className="relative z-10 flex items-center justify-center w-10 h-10">
                <Moon className={`h-5 w-5 transition-colors ${isDark ? "text-primary-foreground" : "text-muted-foreground"}`} />
            </div>
        </div>
    )
}
