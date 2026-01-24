import { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface SearchBarProps {
    onSearch: (query: string) => void
    onClear: () => void
    isSearching?: boolean
    placeholder?: string
}

function SearchBar({ onSearch, onClear, isSearching = false, placeholder = 'Search trending videos...' }: SearchBarProps) {
    const [query, setQuery] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const debounceTimerRef = useRef<number>()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setQuery(value)

        // Clear previous timer
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current)
        }

        // Debounce search - only search after user stops typing for 500ms
        debounceTimerRef.current = setTimeout(() => {
            if (value.trim()) {
                onSearch(value.trim())
            } else {
                onClear()
            }
        }, 500)
    }

    const handleClear = () => {
        setQuery('')
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current)
        }
        onClear()
    }

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current)
            }
        }
    }, [])

    return (
        <motion.div
            className="relative w-full max-w-md"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className={`relative flex items-center transition-all duration-300 ${isFocused
                ? 'ring-2 ring-purple-500/50 shadow-lg shadow-purple-500/20'
                : 'ring-1 ring-white/10'
                } rounded-lg bg-gray-900/50 backdrop-blur-sm`}>
                <Search className={`absolute left-3 w-5 h-5 transition-colors duration-300 ${isFocused ? 'text-purple-400' : 'text-gray-400'
                    }`} />

                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    className="w-full pl-11 pr-10 py-3 bg-transparent text-white placeholder-gray-500 focus:outline-none"
                />

                <AnimatePresence>
                    {query && !isSearching && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                            onClick={handleClear}
                            className="absolute right-3 p-1 rounded-full hover:bg-white/10 transition-colors"
                            aria-label="Clear search"
                        >
                            <X className="w-4 h-4 text-gray-400 hover:text-white" />
                        </motion.button>
                    )}
                </AnimatePresence>

                {isSearching && (
                    <div className="absolute right-3">
                        <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                )}
            </div>

            {/* Search hint */}
            <AnimatePresence>
                {isFocused && !query && (
                    <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="absolute top-full mt-2 left-0 right-0 bg-gray-900/90 backdrop-blur-sm border border-white/10 rounded-lg p-3 text-sm text-gray-400 z-10"
                    >
                        <p>💡 Try searching for topics like "gaming", "music", or "tech"</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default SearchBar

