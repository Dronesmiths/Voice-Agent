'use client';
import { useEffect, useState } from 'react';

export default function LocalTime({ isoDate }: { isoDate: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span style={{ opacity: 0 }}>...</span>;
  }

  return (
    <span>
      {new Date(isoDate).toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: '2-digit' 
      })}
    </span>
  );
}
