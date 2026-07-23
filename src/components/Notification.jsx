'use client';

import { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function Notification() {
  const { notification } = useApp();

  if (!notification) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] animate-fade-in-up">
      <div className="flex items-center gap-3 bg-shree-dark text-white px-5 py-3 rounded-sm shadow-2xl max-w-sm">
        <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
        <span className="text-sm font-medium">{notification.msg}</span>
      </div>
    </div>
  );
}
