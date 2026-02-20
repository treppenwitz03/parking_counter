'use client';
import { useEffect, useRef } from 'react';
import SVGComponent from './CETMapSVG';

const COLORS = {
  occupied: '#ff0000',
};

export type Status = 'occupied' | 'vacant';

interface ParkingMapProps {
  statuses: Record<string, Status>;
}

const ParkingMap = ({ statuses }: ParkingMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container) return;

    Object.entries(statuses).forEach(([id, status]) => {
      const element = container.querySelector<SVGElement>(`[id='${id}']`);
      
      if (element) {
        if (status === 'vacant') {
           element.classList.add('blinking-spot');
           element.style.fill = ''; 
        } else {
           element.classList.remove('blinking-spot');
           element.style.fill = COLORS.occupied;
        }
      }
    });
  }, [statuses]);

  return (
    <div ref={mapContainerRef} className="w-full h-full overflow-hidden">
      <SVGComponent className="w-full h-auto drop-shadow-md" />
    </div>
  );
};

export default ParkingMap;