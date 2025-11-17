// components/UI/Notification.tsx
'use client';

import { useEffect } from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Notification({
  message,
  type,
  isVisible,
  onClose,
  duration = 5000
}: NotificationProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const typeStyles = {
    success: 'bg-green-500 border-green-600',
    error: 'bg-red-500 border-red-600',
    info: 'bg-blue-500 border-blue-600'
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in-up">
      <div className={`${typeStyles[type]} text-white px-6 py-4 rounded-lg border shadow-lg max-w-sm`}>
        <div className="flex items-center justify-between">
          <span className="font-medium">{message}</span>
          <button
            onClick={onClose}
            className="ml-4 text-white hover:text-gray-200 transition-colors"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}