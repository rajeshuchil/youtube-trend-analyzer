import type { Variants } from "framer-motion";

/**
 * Netflix-Style Animation Variants
 * Centralized Framer Motion animation configurations
 */

// Fade in from bottom with slight upward movement
export const fadeInUp: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut",
        },
    },
};

// Scale on hover for video cards
export const scaleOnHover: Variants = {
    rest: {
        scale: 1,
    },
    hover: {
        scale: 1.05,
        transition: {
            duration: 0.2,
            ease: "easeOut",
        },
    },
};

// Slide in from right (for carousel)
export const slideIn: Variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeInOut",
        },
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
        transition: {
            duration: 0.5,
            ease: "easeInOut",
        },
    }),
};

// Stagger children animation for containers
export const staggerChildren: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

// Navigation item hover effect
export const navItemHover: Variants = {
    rest: {
        scale: 1,
        backgroundColor: "rgba(255, 255, 255, 0)",
    },
    hover: {
        scale: 1.02,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        transition: {
            duration: 0.15,
            ease: "easeOut",
        },
    },
    active: {
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        borderLeft: "4px solid #f5c518",
    },
};

// Card entrance animation with stagger
export const cardEntrance: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.9,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.3,
            ease: "easeOut",
        },
    },
};

// Glow effect on hover
export const glowOnHover: Variants = {
    rest: {
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    hover: {
        boxShadow: "0 10px 30px rgba(245, 197, 24, 0.3)",
        transition: {
            duration: 0.2,
            ease: "easeOut",
        },
    },
};

// Sidebar collapse animation
export const sidebarCollapse: Variants = {
    expanded: {
        width: 220,
        transition: {
            duration: 0.3,
            ease: "easeInOut",
        },
    },
    collapsed: {
        width: 80,
        transition: {
            duration: 0.3,
            ease: "easeInOut",
        },
    },
};

// Page transition
export const pageTransition: Variants = {
    initial: {
        opacity: 0,
        x: -20,
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.3,
            ease: "easeOut",
        },
    },
    exit: {
        opacity: 0,
        x: 20,
        transition: {
            duration: 0.2,
            ease: "easeIn",
        },
    },
};
