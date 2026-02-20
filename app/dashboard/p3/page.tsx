'use client'
import React from 'react';
import Image from 'next/image';
import { useParkingData } from '@/hooks/UseParkingData';
import AEBParkingMap from './AEBParkingMap';

const CEAFAParkingView = () => {
  const data = useParkingData();
    const statuses: Record<string, 'occupied' | 'vacant'> = {};
    Object.keys(data).forEach((key) => {
      if (key.startsWith('cet_spot')) {
        const spotId = key.replace('cet_', '');
        statuses[spotId] = data[key] === 1 ? 'occupied' : 'vacant';
      }
    });
  
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8">
      <div className="flex flex-col items-center justify-center w-150 p-8 rotate-90">
        <AEBParkingMap statuses={statuses}/>
      </div>
    </div>
  )
}

export default CEAFAParkingView