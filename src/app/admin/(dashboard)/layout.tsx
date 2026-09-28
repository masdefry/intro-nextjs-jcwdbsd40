'use client';

import Navbar from '@/components/admin/Navbar';
import Sidebar from '@/components/admin/Sidebar';
import { useAuthStore } from '@/stores/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function RootLayout({ children }: LayoutProps<'/'>) {
  const { objectId } = useAuthStore();
  const { setAuth } = useAuthStore();

  // Session User (Ketika User Pernah Login)
  useQuery({
    queryFn: async () => {
      const res = await axios.post(
        'https://api.backendless.com/80900C75-16BB-41B9-A507-BFBEB18800DB/961C60EC-92F0-449A-9F6C-16488E55BA91/users/login',
        { objectId },
      );
      setAuth(res?.data?.username, res?.data?.email, res?.data?.objectId);
      return res?.data;
    },
    queryKey: ['session-user', objectId],
    enabled: !!objectId,
  });

  return (
    <>
      <div className='drawer lg:drawer-open'>
        <input
          id='my-drawer-4'
          type='checkbox'
          className='drawer-toggle inline'
        />
        <div className='drawer-content'>
          {/* Navbar */}
          <Navbar />
          {/* Page content here */}
          <div className='p-4'>{children}</div>
        </div>

        <div className='drawer-side is-drawer-close:overflow-visible'>
          <label
            htmlFor='my-drawer-4'
            aria-label='close sidebar'
            className='drawer-overlay'
          ></label>
          <div className='flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64'>
            {/* Sidebar content here */}
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
}
