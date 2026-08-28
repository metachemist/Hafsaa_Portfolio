'use client';

import { Fragment } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { CSSProperties, ElementType } from 'react';

interface RevealHeadingProps {
  text: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** Seconds between each word. */
  stagger?: number;
}

const wordVariants: Variants = {
  hidden: { y: '115%' },
  visible: { y: '0%' },
};

/**
 * Editorial heading whose words rise into view one after another as it
 * scrolls in. Falls back to plain static text under prefers-reduced-motion.
 */
export function RevealHeading({
  text,
  as: Tag = 'h2',
  className,
  style,
  stagger = 0.08,
}: RevealHeadingProps) {
  const reduceMotion = useReducedMotion();
  const words = text.split(' ');

  if (reduceMotion) {
    return (
      <Tag className={className} style={style}>
        {text}
      </Tag>
    );
  }

  return (
    <Tag className={className} style={style} aria-label={text}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span
            aria-hidden
            style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}
          >
            <motion.span
              style={{ display: 'inline-block', willChange: 'transform', paddingBottom: '0.12em' }}
              variants={wordVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-12% 0px' }}
              transition={{ delay: i * stagger, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </Tag>
  );
}
