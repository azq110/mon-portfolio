'use client'

import { useEffect } from 'react'

export function useKeyboardNavigation() {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        document.documentElement.classList.add('keyboard-navigation')
      }
    }

    const handleMouseDown = () => {
      document.documentElement.classList.remove('keyboard-navigation')
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleMouseDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleMouseDown)
    }
  }, [])
}