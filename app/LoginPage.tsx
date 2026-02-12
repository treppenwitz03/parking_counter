'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Inter } from 'next/font/google';
import Button from '@/components/ui/Button';
import EditText from '@/components/ui/EditText';

interface LoginFormData {
  id: string;
  passcode: string;
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    id: '',
    passcode: ''
  })
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleInputChange = (field: keyof LoginFormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }))
  }

  const handleSignIn = async (): Promise<void> => {
    if (!formData.id.trim() || !formData.passcode.trim()) {
      return
    }

    setLoading(true)
    
    try {
      // Simulate authentication
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirect to dashboard after successful login
      router.push('/dashboard')
    } catch (error) {
      // Handle error silently for production
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') {
      handleSignIn()
    }
  }

  return (
    <main className="w-full min-h-screen bg-[#d9d9d9] flex justify-center items-center">
      <div className="w-full max-w-120 bg-[#fafafa] rounded-lg shadow-[0px_2px_2px_#0000003f] p-4">
        <div className="flex flex-col items-center gap-4">
          <div className="w-30 h-28 flex items-center justify-center">
            <img 
              src="/images/bsu_logo.png" 
              alt="University Logo"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="w-full max-w-90 mb-4.5 flex flex-col gap-10.5 items-center">
            <h1 className={`text-[16px] font-extrabold ${inter.className} leading-5 text-left text-[#000000]`}>
              Sign in to Access Parking Counter
            </h1>

            <div className="w-full flex flex-col gap-12">
              <EditText
                type="text"
                placeholder="ID"
                value={formData.id}
                onChange={handleInputChange('id')}
                onKeyDown={handleKeyPress}
                disabled={loading}
                text_font_size="text-[16px]"
                text_font_family="Inter"
                text_font_weight="font-semibold"
                text_line_height="leading-[20px]"
                // UPDATE 1: Set explicit text color to black
                text_color="text-black" 
                fill_background_color="bg-[#fafafa]"
                border_border="1px solid #a8a8a8"
                border_border_radius="rounded-[8px]"
                padding="pt-[10px] pr-[16px] pb-[10px] pl-[16px]"
                layout_width="flex-1"
                // UPDATE 2: Add placeholder styling directly here to be safe
                className="w-full border border-solid border-[#a8a8a8] rounded-lg pt-2.5 pr-4 pb-2.5 pl-4 bg-[#fafafa] text-[16px] font-['Inter'] font-semibold leading-5 text-black placeholder:text-[#a8a8a8]"
              />

              <EditText
                type="password"
                placeholder="Passcode"
                value={formData.passcode}
                onChange={handleInputChange('passcode')}
                onKeyPress={handleKeyPress}
                disabled={loading}
                text_font_size="text-[16px]"
                text_font_family="Inter"
                text_font_weight="font-semibold"
                text_line_height="leading-[20px]"
                // UPDATE 1: Set explicit text color to black
                text_color="text-black"
                fill_background_color="bg-[#fafafa]"
                border_border="1px solid #a8a8a8"
                border_border_radius="rounded-[8px]"
                padding="pt-[10px] pr-[16px] pb-[10px] pl-[16px]"
                layout_width="flex-1"
                // UPDATE 2: Add placeholder styling directly here to be safe
                className="w-full border border-solid border-[#a8a8a8] rounded-lg pt-2.5 pr-4 pb-2.5 pl-4 bg-[#fafafa] text-[16px] font-['Inter'] font-semibold leading-5 text-black placeholder:text-[#a8a8a8]"
              />

              <Button
                onClick={handleSignIn}
                disabled={loading || !formData.id.trim() || !formData.passcode.trim()}
                text={loading ? "Signing in..." : "Sign in"}
                text_font_size="text-[16px]"
                text_font_family="Inter"
                text_font_weight="font-semibold"
                text_line_height="leading-[20px]"
                text_color="text-[#fafafa]"
                fill_background_color="bg-[#008080]"
                border_border="1px solid #d9d9d9"
                border_border_radius="rounded-[8px]"
                padding="pt-[12px] pr-[34px] pb-[12px] pl-[34px]"
                layout_width="flex-1"
                className="w-full border border-solid border-[#d9d9d9] rounded-lg pt-4 pr-8.5 pb-4 pl-8.5 bg-[#008080] text-[16px] font-['Inter'] font-semibold leading-5 text-[#fafafa] transition-all duration-200 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#008080] disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}