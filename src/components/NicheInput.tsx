"use client";

import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface NicheInputProps {
    onSearch: (term: string) => void;
    isLoading: boolean;
}

export default function NicheInput({ onSearch, isLoading }: NicheInputProps) {
    const [input, setInput] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            onSearch(input.trim());
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto relative">
            <div className="relative group">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter your hobby, passion, or skill..."
                    disabled={isLoading}
                    className={cn(
                        "w-full px-6 py-4 text-lg rounded-full border-2 border-emerald-100",
                        "bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-300",
                        "focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10",
                        "placeholder:text-gray-400 text-gray-800",
                        "disabled:opacity-70 disabled:cursor-not-allowed"
                    )}
                />
                <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className={cn(
                        "absolute right-2 top-2 bottom-2 aspect-square rounded-full",
                        "bg-emerald-500 text-white flex items-center justify-center",
                        "hover:bg-emerald-600 transition-colors duration-200",
                        "disabled:bg-gray-300 disabled:cursor-not-allowed",
                        "shadow-md hover:shadow-lg"
                    )}
                >
                    {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <Search className="w-5 h-5" />
                    )}
                </button>
            </div>
        </form>
    );
}
