'use client';
import { Maximize2 } from 'lucide-react';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import CETParkingMap from './p1/CETParkingMap'; 
import SteerHubParkingMap from './p2/SteerHubParkingMap';
import AEBParkingMap from './p3/AEBParkingMap';

interface ParkingPreviewsProps {
  data: Record<string, any>;
}

export type Status = 'occupied' | 'vacant';

const ParkingPreviews = ({ data }: ParkingPreviewsProps) => {
  const router = useRouter();
  
  const maximizeView = async (itemName: string, statuses: Record<string, Status>): Promise<void> => {
    router.push(`/dashboard/${itemName.toLowerCase().replace(" ", "-")}`);
  }

  // Helper to extract spot statuses for a specific prefix (e.g., 'cet')
  // Transforms { cet_spot1: 0, cet_spot2: 1 } -> { spot1: 'vacant', spot2: 'occupied' }
  const getAreaStatuses = (prefix: string): Record<string, Status> => {
    const statuses: Record<string, Status> = {};
    
    Object.keys(data).forEach((key) => {
      if (key.startsWith(`${prefix}_spot`)) {
        // Extract just the ID (e.g., 'spot1')
        const spotId = key.replace(`${prefix}_`, ''); 
        statuses[spotId] = data[key] === 1 ? 'occupied' : 'vacant';
      }
    });
    
    return statuses;
  };

  // Bind the specific component and the data prefix to each parking area
  const parkingAreas = [
    { name: "P1", prefix: "cet", MapComponent: CETParkingMap },
    { name: "P2", prefix: "sh", MapComponent: SteerHubParkingMap },
    { name: "P3", prefix: "aeb", MapComponent: AEBParkingMap },
    { name: "P4", prefix: "aeb", MapComponent: AEBParkingMap }, // Update prefixes/maps as needed
    { name: "P5", prefix: "aeb", MapComponent: AEBParkingMap }
  ];

  return (
    <div className="grid grid-cols-1 mt-8 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4 md:px-8 pb-8 items-stretch">
      {parkingAreas.map((item) => {
        const Map = item.MapComponent;
        const areaStatuses = getAreaStatuses(item.prefix);

        return (
          <div key={item.name} className="bg-[#fafafa] h-full rounded-2xl flex flex-col items-center shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] border border-gray-50 transition-all duration-300">
            <div className="flex items-center justify-between w-full px-5 py-4 border-b border-gray-100">
              <h1 className="font-semibold text-xl text-[#3d3d3d] tracking-tight">
                {item.name}
              </h1>
              <Button 
                onClick={() => maximizeView(item.name, areaStatuses)} 
                className="min-w-0 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Maximize2 className="size-5 text-gray-600 hover:text-[#008080]" />
              </Button>
            </div>
            
            {/* The SVG Map Container */}
            <div className="w-full p-4 grow flex items-center justify-center">
              <div className="relative w-full overflow-hidden rounded-xl">
                {/* Dynamically render the map and pass the formatted statuses */}
                <Map statuses={areaStatuses} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ParkingPreviews;