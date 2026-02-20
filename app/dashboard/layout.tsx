'use client'
import { CircleParking } from 'lucide-react';
import HamburgerMenu from '@/components/ui/HamburgerMenu';
import { SidebarProvider } from './context/SidebarContext';
import { NavigationProvider } from '@/app/dashboard/context/NavigationContext';
import { useRouter } from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const returnToDashboard = async (): Promise<void> => {
    router.push(`/dashboard/`);
  }
  return (
    <NavigationProvider>
      <SidebarProvider>
        <div className="flex flex-col h-screen overflow-hidden">
          <nav className="z-50 bg-[#fafafa]">
            <div className="flex items-center mt-4 ml-4 mb-2">
              <HamburgerMenu/> 
              <CircleParking className="w-8 h-8 ml-4 mr-4 text-[#008080]"/>
              <h1 onClick={() => returnToDashboard()} className="font-medium text-xl whitespace-nowrap hover:underline">PARKING COUNTER</h1>
            </div>
          </nav>
          <div className="flex-1 overflow-hidden">
            {children}
          </div>
        </div>
      </SidebarProvider>
    </NavigationProvider>
  );
}