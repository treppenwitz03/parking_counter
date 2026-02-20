'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface NavigationContextType {
  currentActive: string;
  navigate: (current: string) => void;
}

const NavigationContext = createContext<NavigationContextType>({
  currentActive: 'quick-overview',
  navigate: () => {},
});

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [currentActive, setCurrentActive] = useState('quick-overview');
  const navigate = (page: string) => {
    setCurrentActive(page);
  };

  return (
    <NavigationContext.Provider value={{ currentActive, navigate }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext);