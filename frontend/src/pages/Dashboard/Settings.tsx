import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { useRefreshTrends } from '../../hooks/useTrends'
import { Globe, RefreshCw, Info, Github, Linkedin, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

const REGIONS = [
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺' },
    { code: 'IN', name: 'India', flag: '🇮🇳' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪' },
    { code: 'FR', name: 'France', flag: '🇫🇷' },
    { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
    { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
]

function Settings() {
    const [selectedRegion, setSelectedRegion] = useState('US')
    const { mutate: refreshTrends, isPending } = useRefreshTrends()

    const handleRefresh = () => {
        refreshTrends(selectedRegion)
    }

    return (
        <div className="p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        Settings
                    </h1>
                    <p className="text-gray-400">
                        Manage your preferences and application settings
                    </p>
                </div>

                <div className="space-y-6">
                    {/* Region Settings */}
                    <Card className="bg-gray-900/50 border-white/10">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-purple-600/20 flex items-center justify-center">
                                    <Globe className="w-5 h-5 text-purple-500" />
                                </div>
                                <div>
                                    <CardTitle className="text-white">Region Preferences</CardTitle>
                                    <CardDescription>Select your preferred region for trending videos</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                                {REGIONS.map((region) => (
                                    <motion.button
                                        key={region.code}
                                        onClick={() => setSelectedRegion(region.code)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`p-4 rounded-lg border transition-all ${selectedRegion === region.code
                                                ? 'bg-purple-600/20 border-purple-500/50 text-white'
                                                : 'bg-gray-800/50 border-white/10 text-gray-400 hover:border-purple-500/30'
                                            }`}
                                    >
                                        <div className="text-3xl mb-2">{region.flag}</div>
                                        <div className="text-xs font-medium">{region.code}</div>
                                    </motion.button>
                                ))}
                            </div>
                            <div className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-white/10">
                                <p className="text-sm text-gray-400">
                                    Selected Region: <span className="text-white font-semibold">{REGIONS.find(r => r.code === selectedRegion)?.name}</span>
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Data Management */}
                    <Card className="bg-gray-900/50 border-white/10">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center">
                                    <RefreshCw className="w-5 h-5 text-blue-500" />
                                </div>
                                <div>
                                    <CardTitle className="text-white">Data Management</CardTitle>
                                    <CardDescription>Refresh trending videos data manually</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-white/10">
                                <div>
                                    <p className="text-white font-medium mb-1">Refresh Trending Data</p>
                                    <p className="text-sm text-gray-400">
                                        Fetch the latest trending videos for {REGIONS.find(r => r.code === selectedRegion)?.name}
                                    </p>
                                </div>
                                <Button
                                    onClick={handleRefresh}
                                    disabled={isPending}
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
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
                    <Card className="bg-gray-900/50 border-white/10">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-green-600/20 flex items-center justify-center">
                                    <Info className="w-5 h-5 text-green-500" />
                                </div>
                                <div>
                                    <CardTitle className="text-white">About</CardTitle>
                                    <CardDescription>Application information and links</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 bg-gray-800/50 rounded-lg border border-white/10">
                                <h3 className="text-white font-semibold mb-2">YouTube Trend Analyzer</h3>
                                <p className="text-sm text-gray-400 mb-3">
                                    A powerful analytics dashboard for tracking and analyzing YouTube trending videos across multiple regions.
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
                                        className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors text-gray-300 hover:text-white"
                                    >
                                        <Github className="w-4 h-4" />
                                        <span className="text-sm">GitHub</span>
                                    </a>
                                    <a
                                        href="https://linkedin.com/in/rajeshuchil"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors text-gray-300 hover:text-white"
                                    >
                                        <Linkedin className="w-4 h-4" />
                                        <span className="text-sm">LinkedIn</span>
                                    </a>
                                    <a
                                        href="mailto:rajesh@example.com"
                                        className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors text-gray-300 hover:text-white"
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
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                        <span>React 18</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                        <span>TypeScript</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                                        <span>Tailwind CSS</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                                        <span>Framer Motion</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                                        <span>React Query</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400">
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
    )
}

export default Settings
