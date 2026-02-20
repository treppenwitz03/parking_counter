import SideBar from '@/components/ui/SideBar';
import DashboardViews from './DashboardViews';

const Dashboard = () => {
  return (
    <div className="h-full">
      <div className="flex h-full">
        <SideBar/>
        <div className='bg-[#E9E9E9] sm:mt-4 sm:rounded-tl-4xl flex-1 h-full sm:h-[calc(100vh-4rem)] shadow-[0_0_4px_rgba(0,0,0,0.25)] flex flex-col overflow-y-auto min-w-0'>
          <DashboardViews/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;