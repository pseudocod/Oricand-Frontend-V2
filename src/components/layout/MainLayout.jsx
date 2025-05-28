import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import SidebarHeader from './SidebarHeader';
import Footer from './Footer';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <SidebarHeader />
      
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
      
      <Toaster 
        position="top-center" 
        toastOptions={{ 
          duration: parseInt(import.meta.env.VITE_TOAST_DURATION || '2000'),
          style: {
            background: '#333',
            color: '#fff',
          },
        }} 
      />
    </div>
  );
} 