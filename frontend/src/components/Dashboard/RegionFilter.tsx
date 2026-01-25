import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Globe } from "lucide-react";

interface RegionFilterProps {
  value: string;
  onChange: (value: string) => void;
}

function RegionFilter({ value, onChange }: RegionFilterProps) {
  const regions = [
    { code: "US", name: "United States", flag: "🇺🇸" },
    { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
    { code: "IN", name: "India", flag: "🇮🇳" },
    { code: "JP", name: "Japan", flag: "🇯🇵" },
    { code: "CA", name: "Canada", flag: "🇨🇦" },
    { code: "AU", name: "Australia", flag: "🇦🇺" },
    { code: "DE", name: "Germany", flag: "🇩🇪" },
    { code: "FR", name: "France", flag: "🇫🇷" },
  ];

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Globe className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-32 md:w-48 bg-white border-gray-200 text-gray-900 rounded-xl shadow-sm text-sm">
          <SelectValue placeholder="Region" />
        </SelectTrigger>
        <SelectContent className="bg-white border-gray-200 rounded-xl shadow-lg">
          {regions.map((region) => (
            <SelectItem
              key={region.code}
              value={region.code}
              className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50"
            >
              <span className="flex items-center gap-2">
                <span>{region.flag}</span>
                <span className="hidden sm:inline">{region.name}</span>
                <span className="sm:hidden">{region.code}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default RegionFilter;
