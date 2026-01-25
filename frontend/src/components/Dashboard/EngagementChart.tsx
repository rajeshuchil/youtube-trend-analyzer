import { motion } from 'framer-motion'
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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
        >
            <Card className="bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300">
                <CardHeader>
                    <CardTitle className="text-gray-900">Engagement by Category</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300} className="hidden sm:block">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                            <XAxis
                                dataKey="category"
                                stroke="#6b7280"
                                tick={{ fill: '#6b7280' }}
                            />
                            <YAxis
                                stroke="#6b7280"
                                tick={{ fill: '#6b7280' }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#ffffff',
                                    border: '1px solid rgba(0,0,0,0.1)',
                                    borderRadius: '8px',
                                    color: '#1a1a1a'
                                }}
                            />
                            <Legend
                                formatter={(value) => <span className="text-gray-700">{value}</span>}
                            />
                            <Bar
                                dataKey="views"
                                fill="#06B6D4"
                                radius={[4, 4, 0, 0]}
                                animationBegin={0}
                                animationDuration={800}
                            />
                            <Bar
                                dataKey="likes"
                                fill="#EC4899"
                                radius={[4, 4, 0, 0]}
                                animationBegin={100}
                                animationDuration={800}
                            />
                            <Bar
                                dataKey="comments"
                                fill="#A855F7"
                                radius={[4, 4, 0, 0]}
                                animationBegin={200}
                                animationDuration={800}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                    <ResponsiveContainer width="100%" height={250} className="sm:hidden">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                            <XAxis
                                dataKey="category"
                                stroke="#6b7280"
                                tick={{ fill: '#6b7280', fontSize: 10 }}
                                angle={-45}
                                textAnchor="end"
                                height={60}
                            />
                            <YAxis
                                stroke="#6b7280"
                                tick={{ fill: '#6b7280', fontSize: 10 }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#ffffff',
                                    border: '1px solid rgba(0,0,0,0.1)',
                                    borderRadius: '8px',
                                    color: '#1a1a1a',
                                    fontSize: '12px'
                                }}
                            />
                            <Legend
                                formatter={(value) => <span className="text-gray-700 text-xs">{value}</span>}
                                wrapperStyle={{ fontSize: '12px' }}
                            />
                            <Bar
                                dataKey="views"
                                fill="#06B6D4"
                                radius={[4, 4, 0, 0]}
                                animationBegin={0}
                                animationDuration={800}
                            />
                            <Bar
                                dataKey="likes"
                                fill="#EC4899"
                                radius={[4, 4, 0, 0]}
                                animationBegin={100}
                                animationDuration={800}
                            />
                            <Bar
                                dataKey="comments"
                                fill="#A855F7"
                                radius={[4, 4, 0, 0]}
                                animationBegin={200}
                                animationDuration={800}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </motion.div>
    )
}

export default EngagementChart

