'use client';
import { useNavigation } from '@/app/dashboard/context/NavigationContext';
import { useRouter } from 'next/navigation';
import LiveCCTVFootage from './LiveCCTVFootage';
import DashboardSummary from './DashboardSummary';
import ParkingPreviews from './ParkingPreviews';
import { useState, useEffect } from 'react';

// 1. Define a flexible interface that allows for the dynamic spot keys
export interface ParkingData {
  cet_vacant: number;
  cet_total: number;
  sh_vacant: number;
  sh_total: number;
  aeb_vacant: number;
  aeb_total: number;
  total_vacant: number;
  update_time: string;
  [key: string]: string | number; // <--- This allows "cet_spot1": 0, "sh_spot2": 1, etc.
}

const DashboardViews = () => {
  const { currentActive } = useNavigation();
  
  // 2. Apply the interface to your state and set a cleaner loading time
  const [data, setData] = useState<ParkingData>({ 
    cet_vacant: 0, cet_total: 0, 
    sh_vacant: 0, sh_total: 0, 
    aeb_vacant: 0, aeb_total: 0,
    total_vacant: 0, update_time: "Loading..." 
  });
  
  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://localhost:8000/api/parking_data')
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((err) => console.error("API Error:", err));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (currentActive === 'live-cctv-footage') {
    return (
      <LiveCCTVFootage/>
    );
  }

  if (currentActive === 'history') {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold text-[#3d3d3d] mb-4">Parking Logs</h1>
        <p className="text-gray-500">Table of past entries and exits goes here.</p>
      </div>
    );
  }

  return (
    <>
      <DashboardSummary data={data}/>
      <ParkingPreviews data={data}/>
    </>
  );
};

export default DashboardViews;