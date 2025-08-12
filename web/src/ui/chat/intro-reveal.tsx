'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'

interface IntroRevealProps {
  text?: string
  onFinish?: () => void
  delayPerCharMs?: number
}

// Simple character fade/slide reveal before chat starts.
export const IntroReveal: React.FC<IntroRevealProps> = ({
  text = 'Ask me anything about this project.',
  onFinish,
  delayPerCharMs = 30,
}) => {
  const [done, setDone] = useState(false)

  useEffect(() => {
    const total = text.length * delayPerCharMs + 600 // add a small buffer
    const t = setTimeout(() => {
      setDone(true)
      onFinish?.()
    }, total)
    return () => clearTimeout(t)
  }, [text, delayPerCharMs, onFinish])

  if (done) return null

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        fontSize: '0.95rem',
        color: 'var(--gray-11)',
        padding: '1rem',
        margin: '0.75rem',
        maxWidth: '60ch',
      }}
    >
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.35,
            delay: (i * delayPerCharMs) / 1000,
            ease: 'easeOut',
          }}
          style={{ whiteSpace: ch === ' ' ? 'pre' : 'normal' }}
        >
          {ch}
        </motion.span>
      ))}
    </div>
  )
}
