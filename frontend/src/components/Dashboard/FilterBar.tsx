import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Filter, ArrowUpDown, Globe } from 'lucide-react'

interface FilterBarProps {
    selectedCategory: string
    onCategoryChange: (category: string) => void
    sortBy: string
    onSortChange: (sort: string) => void
    selectedRegion?: string
    onRegionChange?: (region: string) => void
}

function FilterBar({ selectedCategory, onCategoryChange, sortBy, onSortChange, selectedRegion, onRegionChange }: FilterBarProps) {
    const regions = [
        { value: 'US', label: '🇺🇸 United States' },
        { value: 'GB', label: '🇬🇧 United Kingdom' },
        { value: 'CA', label: '🇨🇦 Canada' },
        { value: 'IN', label: '🇮🇳 India' },
        { value: 'JP', label: '🇯🇵 Japan' },
        { value: 'AU', label: '🇦🇺 Australia' },
    ]

    const categories = [
        { value: 'all', label: 'All Categories' },
        { value: '10', label: 'Music' },
        { value: '20', label: 'Gaming' },
        { value: '24', label: 'Entertainment' },
        { value: '28', label: 'Science & Technology' },
        { value: '27', label: 'Education' },
        { value: '17', label: 'Sports' },
        { value: '1', label: 'Film & Animation' },
        { value: '25', label: 'News & Politics' },
    ]

    const sortOptions = [
        { value: 'views', label: 'Most Views' },
        { value: 'likes', label: 'Most Likes' },
        { value: 'comments', label: 'Most Comments' },
        { value: 'recent', label: 'Most Recent' },
    ]

    return (
        <div className="flex flex-wrap items-center gap-4 mb-6">
            {/* Region Filter */}
            {selectedRegion && onRegionChange && (
                <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <Select value={selectedRegion} onValueChange={onRegionChange}>
                        <SelectTrigger className="w-[200px] bg-gray-900 border-white/10 text-white">
                            <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-white/10">
                            {regions.map((region) => (
                                <SelectItem
                                    key={region.value}
                                    value={region.value}
                                    className="text-white hover:bg-white/5 focus:bg-white/5 focus:text-white"
                                >
                                    {region.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}

            {/* Category Filter */}
            <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <Select value={selectedCategory} onValueChange={onCategoryChange}>
                    <SelectTrigger className="w-[200px] bg-gray-900 border-white/10 text-white">
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/10">
                        {categories.map((cat) => (
                            <SelectItem
                                key={cat.value}
                                value={cat.value}
                                className="text-white hover:bg-white/5 focus:bg-white/5 focus:text-white"
                            >
                                {cat.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-gray-400" />
                <Select value={sortBy} onValueChange={onSortChange}>
                    <SelectTrigger className="w-[180px] bg-gray-900 border-white/10 text-white">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/10">
                        {sortOptions.map((option) => (
                            <SelectItem
                                key={option.value}
                                value={option.value}
                                className="text-white hover:bg-white/5 focus:bg-white/5 focus:text-white"
                            >
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

export default FilterBar
