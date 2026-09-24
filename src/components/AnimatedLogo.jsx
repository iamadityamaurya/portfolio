import React from 'react';
import { motion } from 'framer-motion';

const pathVariants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
    fillOpacity: 0,
  },
  visible: (delay) => ({
    pathLength: 1,
    opacity: 1,
    fillOpacity: 1,
    transition: {
      pathLength: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay },
      opacity: { duration: 0.3, delay },
      fillOpacity: { duration: 0.6, delay: delay + 0.8 },
    },
  }),
};

const glowVariants = {
  initial: { opacity:0, scale: 0.8 },
  animate: {
    opacity: [0, 0.4, 0],
    scale: [1, 1.15, 1],
    transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
  },
};

const AnimatedLogo = ({
  className = 'w-10 h-10',
  color = '#4dff00',
  glowColor = '#4dff00',
  showGlow = true,
  animateOnHover = true,
}) => {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 56.6 42.1"
      xmlns="http://www.w3.org/2000/svg"
      initial="hidden"
      animate="visible"
      whileHover={animateOnHover ? { scale: 1.08 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
    >
      <defs>
        <filter id="logoGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </defs>

      {showGlow && (
        <motion.g
          variants={glowVariants}
          initial="initial"
          animate="animate"
          style={{ fill: glowColor, filter: 'url(#logoGlow)' }}
        >
          <path d="M22.5,0c.6,0,1.6,0,2.4,0,2.3,0,4.9,0,7,0,1.8,0,2.7.3,3.6,1.2.8.7,1.3,1.8,1.7,3,.4,1,1.1,2.1,1.6,3.1,1.6,3.1,3.3,6.2,4.8,9.4,1,2,2.2,4.1,3.3,6.2,2.2,4.2,4.3,8.3,6.5,12.4.8,1.5,1.6,3.1,2.4,4.7.2.5.8,1.2.6,1.6-.2.5-1.3.3-2.1.3h-7c-.9,0-1.5,0-2.4,0-.7,0-1.3-.4-1.7-.7-1-.7-1.4-1.7-2-2.8-1.2-2.1-2.2-4.2-3.3-6.3-.3-.5-.6-1-.9-1.6-.3-.5-.4-1.1-.7-1.7-1.6-3.2-3.2-6.3-4.8-9.5-.5-1.1-1.2-2.1-1.6-3.2-.5-1.1-1.1-2.1-1.6-3.1-1.9-3.8-3.7-7.3-5.7-11.1-.2-.4-.8-1.2-.7-1.7,0-.3.3-.4.6-.4h0Z" />
          <path d="M0,41.6c0-.7.5-1.3.8-1.9.9-1.8,1.9-3.5,2.8-5.3.6-1.2,1.1-2.4,1.9-3.6,1.1-1.7,1.9-3.5,2.8-5.3.9-1.8,1.8-3.6,2.7-5.4.6-1.1,1.2-2.4,1.9-3.5.8-1.2,1.8-2,3.5-2.1.9,0,1.8,0,2.8,0,1.9,0,3.6,0,5.6,0,.6,0,2.2-.2,2.4.3.2.4-.5,1.3-.7,1.7-3.8,7-7.4,14-11.1,21-1,1.9-1.8,4.1-4.4,4.4-1.1.1-2.5,0-3.8,0-1.8,0-3.8,0-5.7,0s-1.3.1-1.6-.3H0Z" />
          <path d="M41.3,41.7c-.4.6-1.6.4-2.6.4-1.9,0-3.7,0-5.8,0s-2.9.2-3.8-.2c-1.6-.6-2.4-2.5-3.2-4-.5-.9-1-1.8-1.5-2.7-.5-.8-.9-1.8-1.4-2.7-.2-.4-.5-.9-.7-1.4-.3-.6-1.1-1.7-.1-1.8.8-.1,1.8,0,2.7,0,1.8,0,3.7,0,5.4,0,1.7,0,3.2-.1,4.3.5,1.3.8,2,2.3,2.6,3.7.3.7.7,1.4,1.1,2.1.7,1.4,1.4,2.7,2.1,4.1.4.7.8,1.3,1,2.1h0Z" />
        </motion.g>
      )}

      <g transform="translate(2.38,1.75) scale(0.92)">
        <motion.path
          d="M22.5,0c.6,0,1.6,0,2.4,0,2.3,0,4.9,0,7,0,1.8,0,2.7.3,3.6,1.2.8.7,1.3,1.8,1.7,3,.4,1,1.1,2.1,1.6,3.1,1.6,3.1,3.3,6.2,4.8,9.4,1,2,2.2,4.1,3.3,6.2,2.2,4.2,4.3,8.3,6.5,12.4.8,1.5,1.6,3.1,2.4,4.7.2.5.8,1.2.6,1.6-.2.5-1.3.3-2.1.3h-7c-.9,0-1.5,0-2.4,0-.7,0-1.3-.4-1.7-.7-1-.7-1.4-1.7-2-2.8-1.2-2.1-2.2-4.2-3.3-6.3-.3-.5-.6-1-.9-1.6-.3-.5-.4-1.1-.7-1.7-1.6-3.2-3.2-6.3-4.8-9.5-.5-1.1-1.2-2.1-1.6-3.2-.5-1.1-1.1-2.1-1.6-3.1-1.9-3.8-3.7-7.3-5.7-11.1-.2-.4-.8-1.2-.7-1.7,0-.3.3-.4.6-.4h0Z"
          fill={color}
          stroke={color}
          strokeWidth={0.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={pathVariants}
          custom={0}
        />
        <motion.path
          d="M0,41.6c0-.7.5-1.3.8-1.9.9-1.8,1.9-3.5,2.8-5.3.6-1.2,1.1-2.4,1.9-3.6,1.1-1.7,1.9-3.5,2.8-5.3.9-1.8,1.8-3.6,2.7-5.4.6-1.1,1.2-2.4,1.9-3.5.8-1.2,1.8-2,3.5-2.1.9,0,1.8,0,2.8,0,1.9,0,3.6,0,5.6,0,.6,0,2.2-.2,2.4.3.2.4-.5,1.3-.7,1.7-3.8,7-7.4,14-11.1,21-1,1.9-1.8,4.1-4.4,4.4-1.1.1-2.5,0-3.8,0-1.8,0-3.8,0-5.7,0s-1.3.1-1.6-.3H0Z"
          fill={color}
          stroke={color}
          strokeWidth={0.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={pathVariants}
          custom={0.25}
        />
        <motion.path
          d="M41.3,41.7c-.4.6-1.6.4-2.6.4-1.9,0-3.7,0-5.8,0s-2.9.2-3.8-.2c-1.6-.6-2.4-2.5-3.2-4-.5-.9-1-1.8-1.5-2.7-.5-.8-.9-1.8-1.4-2.7-.2-.4-.5-.9-.7-1.4-.3-.6-1.1-1.7-.1-1.8.8-.1,1.8,0,2.7,0,1.8,0,3.7,0,5.4,0,1.7,0,3.2-.1,4.3.5,1.3.8,2,2.3,2.6,3.7.3.7.7,1.4,1.1,2.1.7,1.4,1.4,2.7,2.1,4.1.4.7.8,1.3,1,2.1h0Z"
          fill={color}
          stroke={color}
          strokeWidth={0.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={pathVariants}
          custom={0.5}
        />
      </g>
    </motion.svg>
  );
};

export default AnimatedLogo;
