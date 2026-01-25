import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { LucideIcon, Info } from 'lucide-react'

interface MetricCardProps {
    title: string
    value: string
    change?: string
    icon: LucideIcon
    gradient: string
    tooltip?: string
}

function MetricCard({ title, value, change, icon: Icon, gradient, tooltip }: MetricCardProps) {
    const [displayValue, setDisplayValue] = useState('0')
    const iconControls = useAnimation()

    // Extract numeric value for counting animation
    useEffect(() => {
        const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''))
        if (isNaN(numericValue)) {
            setDisplayValue(value)
            return
        }

        const suffix = value.replace(/[0-9.,]/g, '')
        const duration = 1000 // 1 second
        const steps = 30
        const increment = numericValue / steps
        let current = 0

        const timer = setInterval(() => {
            current += increment
            if (current >= numericValue) {
                setDisplayValue(numericValue.toLocaleString() + suffix)
                clearInterval(timer)
            } else {
                setDisplayValue(Math.floor(current).toLocaleString() + suffix)
            }
        }, duration / steps)

        return () => clearInterval(timer)
    }, [value])

    const handleHoverStart = () => {
        iconControls.start({
            y: [0, -8, 0],
            transition: { duration: 0.4, ease: 'easeInOut' }
        })
    }

    return (
        <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -4, scale: 1.02, transition: { duration: 0.2 } }}
            onHoverStart={handleHoverStart}
        >
            <Card className={`${gradient} border-gray-200 hover:shadow-lg transition-all duration-300`}>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <div className="flex items-center gap-2">
                        <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">
                            {title}
                        </CardTitle>
                        {tooltip && (
                            <TooltipProvider delayDuration={200}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Info className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 hover:text-gray-600 cursor-help transition-colors" />
                                    </TooltipTrigger>
                                    <TooltipContent side="top" sideOffset={8} className="max-w-xs">
                                        <p className="text-xs leading-relaxed">{tooltip}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
                    </div>
                    <motion.div animate={iconControls}>
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                    </motion.div>
                </CardHeader>
                <CardContent>
                    <motion.div
                        className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        {displayValue}
                    </motion.div>
                    {change && (
                        <motion.p
                            className="text-xs text-gray-500"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            {change}
                        </motion.p>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    )
}


export default MetricCard
