import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface AppProviderProps {
  children: React.ReactNode;
}

export default function AppProvider({ children }: AppProviderProps) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      {children}
    </AnimatePresence>
  );
}