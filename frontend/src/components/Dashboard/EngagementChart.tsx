import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

interface EngagementData {
    category: string
    views: number
    likes: number
    comments: number
}

interface EngagementChartProps {
    data: EngagementData[]
}

function EngagementChart({ data }: EngagementChartProps) {
    return (
        <Card className="bg-gray-900/50 border-white/10">
            <CardHeader>
                <CardTitle className="text-white">Engagement by Category</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis
                            dataKey="category"
                            stroke="#9ca3af"
                            tick={{ fill: '#9ca3af' }}
                        />
                        <YAxis
                            stroke="#9ca3af"
                            tick={{ fill: '#9ca3af' }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1a1a1a',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                color: '#fff'
                            }}
                        />
                        <Legend
                            formatter={(value) => <span className="text-gray-300">{value}</span>}
                        />
                        <Bar dataKey="views" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="likes" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="comments" fill="#06B6D4" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}

export default EngagementChart
