import Sidebar from '../../components/Dashboard/Sidebar'
import MetricCard from '../../components/Dashboard/MetricCard'
import { Eye, Video, Heart, TrendingUp } from 'lucide-react'

function Dashboard() {
    return (
        <div className="flex min-h-screen bg-black">
            {/* Sidebar */}
            <Sidebar activeItem="overview" />

            {/* Main Content */}
            <main className="flex-1 p-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        Dashboard Overview
                    </h1>
                    <p className="text-gray-400 mb-8">
                        Real-time YouTube trends and analytics
                    </p>

                    {/* Metric Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <MetricCard
                            title="Total Views"
                            value="1.2M"
                            change="↑ 12% from last week"
                            icon={Eye}
                            gradient="bg-gradient-to-br from-purple-600/20 to-blue-600/20"
                        />
                        <MetricCard
                            title="Total Videos"
                            value="4.5K"
                            change="↑ 8% from last week"
                            icon={Video}
                            gradient="bg-gradient-to-br from-blue-600/20 to-cyan-600/20"
                        />
                        <MetricCard
                            title="Engagement"
                            value="2.1M"
                            change="↑ 15% from last week"
                            icon={Heart}
                            gradient="bg-gradient-to-br from-pink-600/20 to-purple-600/20"
                        />
                        <MetricCard
                            title="Avg Score"
                            value="850K"
                            change="↑ 5% from last week"
                            icon={TrendingUp}
                            gradient="bg-gradient-to-br from-cyan-600/20 to-blue-600/20"
                        />
                    </div>

                    {/* Placeholder for charts and tables */}
                    <div className="text-gray-500">
                        Charts and tables coming next...
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Dashboard
