import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { useRefreshTrends } from "../../hooks/useTrends";
import { Globe, RefreshCw, Info, Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

const REGIONS = [
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "MX", name: "Mexico", flag: "🇲🇽" },
];

function Settings() {
  const [selectedRegion, setSelectedRegion] = useState("US");
  const { mutate: refreshTrends, isPending } = useRefreshTrends();

  const handleRefresh = () => {
    refreshTrends(selectedRegion);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header - Responsive */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1 md:mb-2">
            Settings
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Manage your preferences and application settings
          </p>
        </div>

        <div className="space-y-4 md:space-y-6">
          {/* Region Settings */}
          <Card className="bg-white border border-gray-200">
            <CardHeader className="px-4 md:px-6">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-teal-600/20 flex items-center justify-center">
                  <Globe className="w-4 h-4 md:w-5 md:h-5 text-teal-500" />
                </div>
                <div>
                  <CardTitle className="text-gray-900 text-base md:text-lg">
                    Region Preferences
                  </CardTitle>
                  <CardDescription className="text-xs md:text-sm">
                    Select your preferred region for trending videos
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-4 md:px-6">
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-2 md:gap-3">
                {REGIONS.map((region) => (
                  <motion.button
                    key={region.code}
                    onClick={() => setSelectedRegion(region.code)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 md:p-4 rounded-lg border transition-all ${
                      selectedRegion === region.code
                        ? "bg-teal-50 border-teal-500 text-teal-700"
                        : "bg-white border-gray-200 text-gray-700 hover:border-teal-300"
                    }`}
                  >
                    <div className="text-2xl md:text-3xl mb-1 md:mb-2">
                      {region.flag}
                    </div>
                    <div className="text-[10px] md:text-xs font-medium">
                      {region.code}
                    </div>
                  </motion.button>
                ))}
              </div>
              <div className="mt-3 md:mt-4 p-3 md:p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs md:text-sm text-gray-600">
                  Selected Region:{" "}
                  <span className="text-gray-900 font-semibold">
                    {REGIONS.find((r) => r.code === selectedRegion)?.name}
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card className="bg-white border border-gray-200">
            <CardHeader className="px-4 md:px-6">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-cyan-600/20 flex items-center justify-center">
                  <RefreshCw className="w-4 h-4 md:w-5 md:h-5 text-cyan-500" />
                </div>
                <div>
                  <CardTitle className="text-gray-900 text-base md:text-lg">
                    Data Management
                  </CardTitle>
                  <CardDescription className="text-xs md:text-sm">
                    Refresh trending videos data manually
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-4 md:px-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 md:p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div>
                  <p className="text-sm md:text-base text-gray-900 font-medium mb-1">
                    Refresh Trending Data
                  </p>
                  <p className="text-xs md:text-sm text-gray-600">
                    Fetch the latest trending videos for{" "}
                    {REGIONS.find((r) => r.code === selectedRegion)?.name}
                  </p>
                </div>
                <Button
                  onClick={handleRefresh}
                  disabled={isPending}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white"
                >
                  {isPending ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Refreshing...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh Now
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* About */}
          <Card className="bg-white border border-gray-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-600/20 flex items-center justify-center">
                  <Info className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <CardTitle className="text-gray-900">About</CardTitle>
                  <CardDescription>
                    Application information and links
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-gray-900 font-semibold mb-2">
                  YouTube Trend Analyzer
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  A powerful analytics dashboard for tracking and analyzing
                  YouTube trending videos across multiple regions.
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>Version 1.0.0</span>
                  <span>•</span>
                  <span>Built with React, TypeScript & Tailwind CSS</span>
                </div>
              </div>

              {/* Developer Links */}
              <div className="p-4 bg-gray-800/50 rounded-lg border border-white/10">
                <h3 className="text-white font-semibold mb-3">Connect</h3>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://github.com/rajeshuchil"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700 hover:text-gray-900"
                  >
                    <Github className="w-4 h-4" />
                    <span className="text-sm">GitHub</span>
                  </a>
                  <a
                    href="https://linkedin.com/in/rajeshuchil"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700 hover:text-gray-900"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span className="text-sm">LinkedIn</span>
                  </a>
                  <a
                    href="mailto:rajesh@example.com"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700 hover:text-gray-900"
                  >
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">Email</span>
                  </a>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="p-4 bg-gray-800/50 rounded-lg border border-white/10">
                <h3 className="text-white font-semibold mb-3">Tech Stack</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <span>React 18</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span>TypeScript</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                    <span>Tailwind CSS</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                    <span>Framer Motion</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <span>React Query</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Recharts</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Settings;
