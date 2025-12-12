import { motion } from 'framer-motion';
import type { MotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

interface AnimatedCardProps extends MotionProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

export function AnimatedCard({ children, className, onClick, ...props }: AnimatedCardProps) {
    return (
        <motion.div
            className={className}
            onClick={onClick}
            whileHover={{
                scale: 1.02,
                y: -4,
                transition: { duration: 0.2, ease: 'easeOut' }
            }}
            whileTap={{ scale: 0.98 }}
            {...props}
        >
            {children}
        </motion.div>
    );
}
