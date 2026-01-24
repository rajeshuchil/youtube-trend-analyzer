import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

interface CategoryData {
    name: string
    value: number
    color: string
}

interface CategoryChartProps {
    data: CategoryData[]
}

function CategoryChart({ data }: CategoryChartProps) {
    return (
        <Card className="bg-gray-900/50 border-white/10">
            <CardHeader>
                <CardTitle className="text-white">Category Distribution</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={2}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1a1a1a',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                color: '#fff'
                            }}
                        />
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            formatter={(value) => <span className="text-gray-300">{value}</span>}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}

export default CategoryChart
