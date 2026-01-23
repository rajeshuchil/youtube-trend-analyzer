import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon?: LucideIcon;
    trend?: {
        value: number;
        label: string;
    };
    description?: string;
}

export function StatCard({ title, value, icon: Icon, trend, description }: StatCardProps) {
    const isPositiveTrend = trend && trend.value > 0;
    const isNegativeTrend = trend && trend.value < 0;

    return (
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 hover:border-[#3a3a3a] transition-colors">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#9ca3af] text-sm font-medium">{title}</h3>
                {Icon && (
                    <div className="p-2 bg-[#2a2a2a] rounded-lg">
                        <Icon className="h-5 w-5 text-[#f5c518]" />
                    </div>
                )}
            </div>

            {/* Value */}
            <div className="mb-2">
                <p className="text-white text-3xl font-bold">{value}</p>
            </div>

            {/* Trend or Description */}
            {trend && (
                <div className="flex items-center gap-2">
                    <span
                        className={`text-sm font-medium ${isPositiveTrend
                            ? 'text-green-500'
                            : isNegativeTrend
                                ? 'text-red-500'
                                : 'text-[#9ca3af]'
                            }`}
                    >
                        {isPositiveTrend && '↑ '}
                        {isNegativeTrend && '↓ '}
                        {Math.abs(trend.value)}%
                    </span>
                    <span className="text-[#6b7280] text-sm">{trend.label}</span>
                </div>
            )}

            {description && !trend && (
                <p className="text-[#6b7280] text-sm">{description}</p>
            )}
        </div>
    );
}
