import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Globe } from 'lucide-react'

interface RegionFilterProps {
    value: string
    onChange: (value: string) => void
}

function RegionFilter({ value, onChange }: RegionFilterProps) {
    const regions = [
        { code: 'US', name: 'United States', flag: '🇺🇸' },
        { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
        { code: 'IN', name: 'India', flag: '🇮🇳' },
        { code: 'JP', name: 'Japan', flag: '🇯🇵' },
        { code: 'CA', name: 'Canada', flag: '🇨🇦' },
        { code: 'AU', name: 'Australia', flag: '🇦🇺' },
        { code: 'DE', name: 'Germany', flag: '🇩🇪' },
        { code: 'FR', name: 'France', flag: '🇫🇷' },
    ]

    return (
        <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-gray-500" />
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="w-48 bg-white border-gray-200 text-gray-900">
                    <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                    {regions.map((region) => (
                        <SelectItem
                            key={region.code}
                            value={region.code}
                            className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50"
                        >
                            <span className="flex items-center gap-2">
                                <span>{region.flag}</span>
                                <span>{region.name}</span>
                            </span>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export default RegionFilter
