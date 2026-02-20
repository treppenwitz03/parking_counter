import ParkingBreakdown from './ParkingBreakdown';

// 1. Update the interface here to safely forward the dynamic spot keys
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
    [key: string]: string | number; // <--- Allows the spot states to pass through to children
  };
}

const DashboardSummary = ({ data }: DataProps) => {
  return (
    <div className="bg-[#fafafa] mt-8 mx-4 md:mx-8 p-6 md:py-10 rounded-2xl shadow-[0_0_10px_rgba(0,0,0,0.1)] border border-gray-100">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        <div className="flex flex-col items-center justify-center w-full lg:w-1/2">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <h1 className="font-extrabold text-7xl sm:text-8xl md:text-9xl text-[#3d3d3d] tracking-tighter">
                {data.total_vacant}
            </h1>
            <div className="text-center sm:text-left">
              <h1 className="font-black text-4xl sm:text-5xl text-[#3d3d3d] leading-tight">
                Vacant
              </h1>
              <span className="font-semibold text-2xl sm:text-3xl text-gray-500">
                Parking Slots
              </span>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-sm font-medium text-gray-400 italic">
                {data.update_time}
            </p>
          </div>
        </div>
        <div className="hidden lg:block w-px h-32 bg-gray-200" />
        <div className="w-full lg:w-1/2">
          <ParkingBreakdown data={data}/>
        </div>
        
      </div>
    </div>
  );
};

export default DashboardSummary;