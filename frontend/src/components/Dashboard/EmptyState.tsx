import { motion } from 'framer-motion'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '../ui/button'

interface EmptyStateProps {
    title: string
    description: string
    icon?: React.ReactNode
    action?: {
        label: string
        onClick: () => void
    }
}

function EmptyState({ title, description, icon, action }: EmptyStateProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center py-16 px-4 text-center"
        >
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                {icon || <AlertCircle className="w-8 h-8 text-gray-500" />}
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {title}
            </h3>

            <p className="text-gray-600 max-w-md mb-6">
                {description}
            </p>

            {action && (
                <Button
                    onClick={action.onClick}
                    className="bg-teal-500 text-white hover:bg-teal-600"
                >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    {action.label}
                </Button>
            )}
        </motion.div>
    )
}

export default EmptyState
