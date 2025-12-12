import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface StaggeredGridProps {
    children: ReactNode;
    className?: string;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
};

export const itemVariants = {
    hidden: {
        opacity: 0,
        y: 20,
        scale: 0.95
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
        },
    },
};

export function StaggeredGrid({ children, className }: StaggeredGridProps) {
    return (
        <motion.div
            className={className}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {children}
        </motion.div>
    );
}
