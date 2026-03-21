import { useState, useEffect } from 'react';

interface StoreHoursInfo {
  isOpen: boolean;
  label: string;
}

// Schedule: day index (0=Sun, 1=Mon, ..., 6=Sat)
const SCHEDULE: Record<number, { open: number; close: number } | null> = {
  0: { open: 10.5, close: 21 },    // Sunday 10:30 AM – 9:00 PM
  1: { open: 10.5, close: 21 },    // Monday 10:30 AM – 9:00 PM
  2: { open: 10.5, close: 21 },    // Tuesday
  3: { open: 10.5, close: 21 },    // Wednesday
  4: { open: 10.5, close: 21 },    // Thursday
  5: { open: 15, close: 22 },      // Friday 3:00 PM – 10:00 PM
  6: { open: 10.5, close: 22 },    // Saturday 10:30 AM – 10:00 PM
};

function formatTime(hours24: number): string {
  const h = Math.floor(hours24);
  const m = hours24 % 1 === 0.5 ? '30' : '';
  const suffix = h >= 12 ? 'PM' : 'AM';
  const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return m ? `${h12}:${m} ${suffix}` : `${h12} ${suffix}`;
}

function getStatus(): StoreHoursInfo {
  const now = new Date();
  const day = now.getDay();
  const currentTime = now.getHours() + now.getMinutes() / 60;
  const hours = SCHEDULE[day];

  if (!hours) {
    return { isOpen: false, label: 'Closed Today' };
  }

  if (currentTime < hours.open) {
    return { isOpen: false, label: `Opens at ${formatTime(hours.open)}` };
  }

  if (currentTime < hours.close) {
    return { isOpen: true, label: `Open until ${formatTime(hours.close)}` };
  }

  return { isOpen: false, label: 'Closed Now' };
}

export default function useStoreHours(): StoreHoursInfo {
  const [status, setStatus] = useState(getStatus);

  useEffect(() => {
    const id = setInterval(() => setStatus(getStatus()), 60_000);
    return () => clearInterval(id);
  }, []);

  return status;
}
