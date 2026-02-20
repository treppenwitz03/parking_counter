'use client';
import { Menu } from 'lucide-react';
import { useSidebar } from '@/app/dashboard/context/SidebarContext';

const HamburgerMenu = () => {
  const { toggle } = useSidebar(); 

  return (
    <button 
      onClick={toggle} 
      className="hover:bg-gray-100 p-1 rounded-md transition-colors"
    >
      <Menu className="w-6 h-6"/>
    </button>
  );
}

export default HamburgerMenu;