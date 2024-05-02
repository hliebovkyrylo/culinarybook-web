"use client"

import { useState, useEffect } from 'react';
import { useTranslation }      from 'react-i18next';

function useFormatDaysAgo() {
  const { t }                         = useTranslation();
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000 * 60 * 60 * 24);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const millisecondsInDay = 1000 * 60 * 60 * 24;

  return function formatDaysAgo(createdAt: Date | string) {
    if (typeof createdAt === 'string') {
      createdAt = new Date(createdAt);
    }
    const differenceInMilliseconds = currentDate.getTime() - createdAt?.getTime();
    const daysDifference           = Math.floor(differenceInMilliseconds / millisecondsInDay);

    function formatMonths(months: number) {
      if (months === 1) {
        return `${months} ${t('time-one-month')}`;
      } else if (months > 1 && months < 5) {
        return `${months} ${t('time-months-second')}`;
      } else {
        return `${months} ${t('time-months')}`;
      }
    }
    
    if (daysDifference < 1) {
      return t('time-recently');
    } else if (daysDifference === 1) {
      return `${daysDifference} ${t('time-many-day')}`;
    } else if (daysDifference === 2 || daysDifference === 3 || daysDifference === 4) {
      return `${daysDifference} ${t('time-many-day-second')}`
    } else if (daysDifference <= 30) {
      const weeks = Math.floor(daysDifference / 7);
      return `${weeks} ${weeks < 5 ? t('time-one-week') : weeks >= 5 ? t('time-weeks-second') : t('time-weeks')} ago`;
    } else if (daysDifference <= 365) {
      const months = Math.floor(daysDifference / 30);
      return `${formatMonths(months)}`;
    } else {
      return t('time-more-year');
    }
    
      
  };
}

export default useFormatDaysAgo;
