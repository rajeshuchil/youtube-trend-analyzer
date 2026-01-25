import { RefreshCw, Menu } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import AISearchBar from "./AISearchBar";
import RegionFilter from "./RegionFilter";
import { Message } from "../../hooks/useAIChat";

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
  selectedRegion: string;
  onRegionChange: (region: string) => void;
  onRefresh: () => void;
  isRefreshing?: boolean;
  aiMessages: Message[];
  aiIsLoading: boolean;
  onAISendMessage: (message: string) => void;
}

interface OutletContext {
  openSidebar: () => void;
}

function DashboardHeader({
  title,
  subtitle,
  selectedRegion,
  onRegionChange,
  onRefresh,
  isRefreshing = false,
  aiMessages,
  aiIsLoading,
  onAISendMessage,
}: DashboardHeaderProps) {
  const { openSidebar } = useOutletContext<OutletContext>();

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="px-4 md:px-8 py-4 md:py-6">
        {/* Title Row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={openSidebar}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1">
                {title}
              </h1>
              <p className="text-sm text-gray-500">{subtitle}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <RegionFilter value={selectedRegion} onChange={onRegionChange} />
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <RefreshCw
                className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
              <span className="hidden sm:inline text-sm font-medium">
                Refresh
              </span>
            </button>
          </div>
        </div>

        {/* AI Search Bar */}
        <div className="flex justify-center">
          <AISearchBar
            messages={aiMessages}
            isLoading={aiIsLoading}
            onSendMessage={onAISendMessage}
            regionCode={selectedRegion}
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
