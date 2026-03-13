'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface CatCursorProps {
  size?: number;
}

export function CatCursor({ size = 38 }: CatCursorProps) {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left
  const lastPosition = useRef({ x: 0, y: 0 });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const walkTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Smooth spring animation
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  // Trail effect values
  const trailX = useSpring(cursorX, { damping: 30, stiffness: 150 });
  const trailY = useSpring(cursorY, { damping: 30, stiffness: 150 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e;
    
    // Calculate rotation and direction based on movement direction
    const dx = clientX - lastPosition.current.x;
    const dy = clientY - lastPosition.current.y;
    
    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
      // Determine facing direction
      if (Math.abs(dx) > 3) {
        setDirection(dx > 0 ? 1 : -1);
      }
      
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      setRotation(angle * 0.2); // Subtle tilt
      
      setIsMoving(true);
      setIsWalking(true);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setIsMoving(false);
        setRotation(0);
      }, 100);
      
      if (walkTimeoutRef.current) {
        clearTimeout(walkTimeoutRef.current);
      }
      walkTimeoutRef.current = setTimeout(() => {
        setIsWalking(false);
      }, 200);
    }
    
    lastPosition.current = { x: clientX, y: clientY };
    
    // Update cursor position with offset - place cat at cursor position
    cursorX.set(clientX - size / 2);
    cursorY.set(clientY - size / 2);
    
    trailX.set(clientX - size / 4);
    trailY.set(clientY - size / 4 + 10);
  }, [cursorX, cursorY, trailX, trailY, size]);

  useEffect(() => {
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Track mouse movement
    window.addEventListener('mousemove', handleMouseMove);
    
    // Track hover on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (walkTimeoutRef.current) {
        clearTimeout(walkTimeoutRef.current);
      }
    };
  }, [handleMouseMove]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      {/* Paw prints trail */}
      <motion.div
        style={{
          x: trailX,
          y: trailY,
        }}
        className="fixed pointer-events-none z-[9998] hidden md:block"
      >
        <motion.div
          animate={{
            scale: isWalking ? [0.8, 0.3, 0.1] : 0.2,
            opacity: isWalking ? [0.4, 0.2, 0] : 0.15,
          }}
          transition={{
            duration: 0.4,
          }}
          className="w-1.5 h-1.5 bg-portfolio-accent/50 rounded-full"
        />
      </motion.div>

      {/* Main cat cursor */}
      <motion.div
        style={{
          x,
          y,
          rotate: rotation,
          scaleX: direction,
        }}
        animate={{
          scale: isHovering ? 1.15 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
        className="fixed pointer-events-none z-[9999] hidden md:block"
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Shadow under cat */}
          <motion.ellipse
            cx="32"
            cy="56"
            rx="14"
            ry="4"
            fill="rgba(0,0,0,0.2)"
            animate={{
              rx: isWalking ? [14, 12, 14] : 14,
              opacity: isWalking ? [0.2, 0.15, 0.2] : 0.2,
            }}
            transition={{
              duration: 0.3,
              repeat: isWalking ? Infinity : 0,
            }}
          />
          
          {/* Cat body - bobbing motion */}
          <motion.g
            animate={{
              y: isWalking ? [0, -2, 0, -2, 0] : 0,
            }}
            transition={{
              duration: 0.4,
              repeat: isWalking ? Infinity : 0,
              ease: 'easeInOut',
            }}
          >
            {/* Back legs */}
            <motion.ellipse
              cx="24"
              cy="48"
              rx="4"
              ry="6"
              fill="#7A6AA3"
              animate={{
                cy: isWalking ? [48, 46, 48, 50, 48] : 48,
              }}
              transition={{
                duration: 0.4,
                repeat: isWalking ? Infinity : 0,
              }}
            />
            <motion.ellipse
              cx="40"
              cy="48"
              rx="4"
              ry="6"
              fill="#7A6AA3"
              animate={{
                cy: isWalking ? [48, 50, 48, 46, 48] : 48,
              }}
              transition={{
                duration: 0.4,
                repeat: isWalking ? Infinity : 0,
              }}
            />
            
            {/* Tail */}
            <motion.path
              d="M50 38 Q58 32 54 24"
              stroke="#8A78B7"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              animate={{
                d: isWalking
                  ? ['M50 38 Q58 32 54 24', 'M50 38 Q62 36 58 22', 'M50 38 Q58 32 54 24']
                  : 'M50 38 Q56 34 54 28',
              }}
              transition={{
                duration: 0.3,
                repeat: isWalking ? Infinity : 0,
              }}
            />
            
            {/* Cat body */}
            <motion.ellipse
              cx="32"
              cy="40"
              rx="18"
              ry="14"
              fill="#8A78B7"
              animate={{
                ry: isWalking ? [14, 13, 14] : 14,
              }}
              transition={{
                duration: 0.2,
                repeat: isWalking ? Infinity : 0,
              }}
            />
            
            {/* Front legs */}
            <motion.ellipse
              cx="22"
              cy="50"
              rx="3"
              ry="5"
              fill="#9B8BC4"
              animate={{
                cy: isWalking ? [50, 48, 50, 52, 50] : 50,
              }}
              transition={{
                duration: 0.4,
                repeat: isWalking ? Infinity : 0,
              }}
            />
            <motion.ellipse
              cx="42"
              cy="50"
              rx="3"
              ry="5"
              fill="#9B8BC4"
              animate={{
                cy: isWalking ? [50, 52, 50, 48, 50] : 50,
              }}
              transition={{
                duration: 0.4,
                repeat: isWalking ? Infinity : 0,
              }}
            />
            
            {/* Cat head */}
            <circle cx="32" cy="24" r="14" fill="#8A78B7" />
            
            {/* Ears */}
            <motion.path
              d="M20 18 L16 6 L26 14 Z"
              fill="#8A78B7"
              animate={{
                d: isWalking 
                  ? ['M20 18 L16 6 L26 14 Z', 'M20 18 L16 4 L26 14 Z', 'M20 18 L16 6 L26 14 Z']
                  : 'M20 18 L16 6 L26 14 Z',
              }}
              transition={{
                duration: 0.25,
                repeat: isWalking ? Infinity : 0,
              }}
            />
            <motion.path
              d="M44 18 L48 6 L38 14 Z"
              fill="#8A78B7"
              animate={{
                d: isWalking
                  ? ['M44 18 L48 6 L38 14 Z', 'M44 18 L48 4 L38 14 Z', 'M44 18 L48 6 L38 14 Z']
                  : 'M44 18 L48 6 L38 14 Z',
              }}
              transition={{
                duration: 0.25,
                repeat: isWalking ? Infinity : 0,
                delay: 0.1,
              }}
            />
            
            {/* Inner ears */}
            <path d="M20 16 L18 8 L24 13 Z" fill="#C4B5E0" />
            <path d="M44 16 L46 8 L40 13 Z" fill="#C4B5E0" />
            
            {/* Eyes */}
            <motion.ellipse
              cx="27"
              cy="22"
              rx="3"
              ry={isHovering ? 4 : 3}
              fill="#231C40"
              transition={{ duration: 0.2 }}
            />
            <motion.ellipse
              cx="37"
              cy="22"
              rx="3"
              ry={isHovering ? 4 : 3}
              fill="#231C40"
              transition={{ duration: 0.2 }}
            />
            
            {/* Eye shine */}
            <circle cx="28" cy="21" r="1" fill="white" />
            <circle cx="38" cy="21" r="1" fill="white" />
            
            {/* Nose */}
            <ellipse cx="32" cy="27" rx="2" ry="1.5" fill="#C4B5E0" />
            
            {/* Mouth */}
            <path d="M30 29 Q32 31 34 29" stroke="#231C40" strokeWidth="1" fill="none" />
            
            {/* Whiskers */}
            <motion.g
              stroke="#231C40"
              strokeWidth="0.5"
              animate={{
                opacity: isWalking ? [1, 0.7, 1] : 1,
              }}
              transition={{
                duration: 0.3,
                repeat: isWalking ? Infinity : 0,
              }}
            >
              <line x1="22" y1="25" x2="10" y2="23" />
              <line x1="22" y1="27" x2="10" y2="28" />
              <line x1="42" y1="25" x2="54" y2="23" />
              <line x1="42" y1="27" x2="54" y2="28" />
            </motion.g>
          </motion.g>
        </svg>
        
        {/* Sparkle particles when moving */}
        {isWalking && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1, opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
            className="absolute top-0 left-1/2 w-1 h-1 bg-white rounded-full"
          />
        )}
      </motion.div>
    </>
  );
}
