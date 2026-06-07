'use client';

import { Toaster } from 'react-hot-toast';

function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          borderRadius: '16px',
          fontSize: '14px',
          fontWeight: 500,
        },
        success: {
          duration: 2500,
        },
        error: {
          duration: 4000,
        },
      }}
    />
  );
}

export default ToastProvider;
