import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import ScrollToTop from '@/components/ScrollToTop';
import Footer from '@/layouts/Footer/Footer';
import Header from '@/layouts/Header/Header';

export default function MainLayout() {
  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <Header />
      <main id="top">
        <Suspense fallback={<div className="min-h-[60vh]" />}>
          <Outlet />
        </Suspense>
        <Footer />
      </main>
    </div>
  );
}
