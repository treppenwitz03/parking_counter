import React from 'react';
import { Pin } from 'lucide-react';

interface DataProps {
  data: {
    cet_vacant: number;
    cet_total: number;
    sh_vacant: number;
    sh_total: number;
    aeb_vacant: number;
    aeb_total: number;
    total_vacant: number;
    update_time: string;
    [key: string]: string | number;
  };
}

const ParkingBreakdown = ( {data}: DataProps ) => {
  
  const category = [
    { name: "P1 ", location: "(CET & SSC)", val: `${data.cet_vacant}/${data.cet_total}` },
    { name: "P2 ", location: "(STEER HUB)", val: `${data.sh_vacant}/${data.sh_total}` },
    { name: "P3 ", location: "(LEFT  AEB)", val: `${data.aeb_vacant}/${data.aeb_total}` },
    { name: "P4 ", location: "(RIGHT AEB)", val: `${data.aeb_vacant}/${data.aeb_total}` },
    { name: "P5 ", location: "(KIST PARK)", val: `${data.aeb_vacant}/${data.aeb_total}` }
  ];

  return (
    <div className="flex flex-col w-full max-w-md mx-auto">
      {category.map((item) => (
        <div 
          key={item.name} 
          className="flex justify-between items-center rounded-xl hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Pin className="size-5 text-[#008080]" />
            <h1 className="text-xl font-semibold text-[#3d3d3d]">{item.name}
              <span className="italic font-normal text-xs">{item.location}</span>
            </h1>
          </div>
          <div className="flex items-center">
            <span className="font-bold text-2xl text-[#008080]">{item.val}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ParkingBreakdown;