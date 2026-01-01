import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useState } from "react";

export function SearchBar() {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <motion.div
            className="relative w-full max-w-md"
            animate={{
                scale: isFocused ? 1.02 : 1,
            }}
            transition={{ duration: 0.2 }}
        >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9ca3af]" />
            <Input
                type="search"
                placeholder="Search trends, categories..."
                className="pl-10 bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-[#9ca3af] focus:border-[#f5c518] focus:ring-[#f5c518]"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </motion.div>
    );
}
