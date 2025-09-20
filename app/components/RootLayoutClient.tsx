'use client';

import Navbar from './Navbar';
import Sidebar, { SidebarProvider } from './Sidebar';
import BottomNavigation from './BottomNavigation';
import MobileGestureHandler from './MobileGestureHandler';
import NextAuthSessionProvider from '../providers/SessionProvider';
import { UserProvider } from '../providers/UserProvider';
import SimpleLearningTracker from './SimpleLearningTracker';
import PWAProvider from './PWAProvider';

interface RootLayoutClientProps {
  children: React.ReactNode;
}

export default function RootLayoutClient({ children }: RootLayoutClientProps) {
  return (
    <NextAuthSessionProvider>
      <UserProvider>
        <PWAProvider />
        <SimpleLearningTracker />
        <SidebarProvider>
          <MobileGestureHandler>
            <div className="flex flex-col h-screen bg-gray-50">
              <Navbar />
              <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-auto transition-all duration-300">
                  <div className="min-h-full pb-16 lg:pb-0">
                    {children}
                  </div>
                </main>
              </div>
              <BottomNavigation />
            </div>
          </MobileGestureHandler>
        </SidebarProvider>
      </UserProvider>
    </NextAuthSessionProvider>
  );
}