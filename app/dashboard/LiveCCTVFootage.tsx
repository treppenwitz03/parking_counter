'use client';
import { useState } from 'react';

const LiveCCTVFootage = () => {
  const [selectedCamera, setSelectedCamera] = useState('cet');

  const cameras = [
    { id: 'cet', name: 'College of Engineering Technology (P1)' },
    { id: 'sh', name: 'Science, Technology, Engineering and Environment Research HUB (P2)' },
    { id: 'aeb', name: 'Albert Einstein Building (Left) (P3)' },
    { id: 'aeb', name: 'Albert Einstein Building (Right) (P4)' },
    { id: 'aeb', name: 'The Knowledge, Innovation and Science Technology (KIST) Park (P5)' }
  ];

  return (
    <div className="flex flex-col p-4 gap-4 rounded-4xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-4">
        <select 
          value={selectedCamera}
          onChange={(e) => setSelectedCamera(e.target.value)}
          className="p-2.5 w-full px-4 border border-gray-200 rounded-xl bg-white text-[#3d3d3d] font-semibold shadow-sm hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#008080]/50 focus:border-[#008080] transition-all cursor-pointer"
        >
          {cameras.map((cam) => (
            <option key={cam.id} value={cam.id}>
              {cam.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 bg-gray-100 rounded-2xl border border-gray-200 overflow-hidden shadow-inner min-h-75 flex items-center justify-center">
        <img 
          key={selectedCamera}
          src={`http://localhost:8000/video_feed/${selectedCamera}`}
          className="w-full h-auto object-cover" 
          alt={`${selectedCamera.toUpperCase()} Parking Feed`} 
        />
      </div>
      
    </div>
  );
}

export default LiveCCTVFootage;