import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { LucideIcon } from 'lucide-react'

interface MetricCardProps {
    title: string
    value: string
    change?: string
    icon: LucideIcon
    gradient: string
}

function MetricCard({ title, value, change, icon: Icon, gradient }: MetricCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
        >
            <Card className={`${gradient} border-purple-500/20 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300`}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">
                        {title}
                    </CardTitle>
                    <Icon className="w-5 h-5 text-gray-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold text-white mb-2">
                        {value}
                    </div>
                    {change && (
                        <p className="text-xs text-gray-500">
                            {change}
                        </p>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    )
}

export default MetricCard
