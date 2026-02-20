'use client';
import { ChartNoAxesGantt, RadioTower, History } from 'lucide-react';
import { useSidebar } from '@/app/dashboard/context/SidebarContext';
import { useNavigation } from '@/app/dashboard/context/NavigationContext';

const SideBar = () => {
  const { isOpen } = useSidebar();
  const { currentActive, navigate } = useNavigation();

  const getNavItemClass = (itemName: string) => {
    const isActive = currentActive === itemName;
    return `flex items-center mb-2 mx-4 rounded-xl px-4 py-4 whitespace-nowrap cursor-pointer transition-colors ${
      isActive
        ? 'bg-[#00808066] shadow-[0_0_4px_rgba(0,0,0,0.25)] text-black'
        : 'hover:bg-gray-100 text-[#3d3d3d]'
    }`;
  };

  return (
    <div className={`pt-16 transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'w-64 opacity-100' : 'w-0 opacity-0'}`}>
      <div onClick={() => navigate('quick-overview')} className={getNavItemClass('quick-overview')}>
        <ChartNoAxesGantt className={`w-8 h-8 ml-2 mr-2 shrink-0 ${currentActive === 'quick-overview' ? '' : 'text-[#3d3d3d]'}`}/>
        <h1 className="ml-2 mr-2 font-semibold">Quick Overview</h1>
      </div>
      <div onClick={() => navigate('live-cctv-footage')} className={getNavItemClass('live-cctv-footage')}>
        <RadioTower className={`w-8 h-8 ml-2 mr-2 shrink-0 ${currentActive === 'live-cctv-footage' ? '' : 'text-[#3d3d3d]'}`}/>
        <h1 className="ml-2 mr-2 font-semibold">Live CCTV Footage</h1>
      </div>
      <div onClick={() => navigate('history')} className={getNavItemClass('history')}>
        <History className={`w-8 h-8 ml-2 mr-2 shrink-0 ${currentActive === 'history' ? '' : 'text-[#3d3d3d]'}`}/>
        <h1 className="ml-2 mr-2 font-semibold">Parking Logs</h1>
      </div>
    </div>
  )
}

export default SideBar;