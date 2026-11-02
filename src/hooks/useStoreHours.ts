import { useState, useEffect } from 'react';

interface StoreHoursInfo {
  isOpen: boolean;
  label: string;
}

// Schedule: day index (0=Sun, 1=Mon, ..., 6=Sat)
export const SCHEDULE: Record<number, { open: number; close: number } | null> = {
  0: { open: 11, close: 21 },      // Sunday 11:00 AM – 9:00 PM
  1: { open: 10.5, close: 21 },    // Monday 10:30 AM – 9:00 PM
  2: { open: 10.5, close: 21 },    // Tuesday
  3: { open: 10.5, close: 21 },    // Wednesday
  4: { open: 10.5, close: 21 },    // Thursday
  5: { open: 15, close: 21 },      // Friday 3:00 PM – 9:00 PM
  6: { open: 10.5, close: 21 },    // Saturday 10:30 AM – 9:00 PM
};

export function formatTime(hours24: number): string {
  const h = Math.floor(hours24);
  const m = hours24 % 1 === 0.5 ? '30' : '';
  const suffix = h >= 12 ? 'PM' : 'AM';
  const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return m ? `${h12}:${m} ${suffix}` : `${h12} ${suffix}`;
}

function getStatus(): StoreHoursInfo {
  const now = new Date();
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Detroit', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
  }).formatToParts(now);
  const value = (type: string) => parts.find(part => part.type === type)?.value ?? '';
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(value('weekday'));
  const currentTime = Number(value('hour')) + Number(value('minute')) / 60;
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
  // Identical server/client first render; do not freeze build-time opening status into HTML.
  const [status, setStatus] = useState<StoreHoursInfo>({ isOpen: false, label: 'Open until 9 PM everyday' });

  useEffect(() => {
    setStatus(getStatus());
    const id = setInterval(() => setStatus(getStatus()), 60_000);
    return () => clearInterval(id);
  }, []);

  return status;
}
