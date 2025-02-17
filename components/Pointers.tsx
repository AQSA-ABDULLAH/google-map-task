'use client';  // Mark this file as a client-side component

import dynamic from 'next/dynamic';

// Dynamically import the MapPointerClient component with SSR disabled
const MapPointerClient = dynamic(() => import('./MapPointerClient'), {
  ssr: false,  // Disable SSR for this component
});

const Pointers = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <MapPointerClient />
    </div>
  );
};

export default Pointers;



