import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

function useFormatDaysAgo() {
  const { t } = useTranslation();
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const millisecondsInSecond = 1000;
  const millisecondsInMinute = millisecondsInSecond * 60;
  const millisecondsInHour = millisecondsInMinute * 60;
  const millisecondsInDay = millisecondsInHour * 24;

  return function formatDaysAgo(createdAt: Date | string) {
    if (typeof createdAt === "string") {
      createdAt = new Date(createdAt);
    }

    const differenceInMilliseconds = currentDate.getTime() - createdAt?.getTime();
    const secondsDifference = Math.floor(differenceInMilliseconds / millisecondsInSecond);
    const minutesDifference = Math.floor(differenceInMilliseconds / millisecondsInMinute);
    const hoursDifference = Math.floor(differenceInMilliseconds / millisecondsInHour);
    const daysDifference = Math.floor(differenceInMilliseconds / millisecondsInDay);

    function getTranslationKeyAndValue(differance: number, timeUnit: string) {
      if (timeUnit === 'time-hour-ago') {
        if (hoursDifference % 10 === 1 && hoursDifference !== 11) {
          return `${hoursDifference} ${t("time-hour-ago")}`;
        } else if (hoursDifference % 10 >= 2 && hoursDifference % 10 <= 4 && (hoursDifference < 12 || hoursDifference > 14)) {
          return `${hoursDifference} ${t("time-hours-ago-few")}`;
        } else {
          return `${hoursDifference} ${t("time-hours-ago-many")}`;
        }
      } else {
        const formatKey = `${timeUnit}-${differance % 10 === 1 ? "one" : differance % 10 >= 2 && differance % 10 <= 4 ? "few" : "many"}`;
        return `${differance} ${t(formatKey)}`;
      }
    }

    if (secondsDifference < 60) {
      return getTranslationKeyAndValue(secondsDifference, 'time-seconds-ago');
    } else if (minutesDifference < 60) {
      return getTranslationKeyAndValue(minutesDifference, 'time-minutes-ago');
    } else if (hoursDifference < 24) {
      return getTranslationKeyAndValue(hoursDifference, 'time-hour-ago');
    } else if (daysDifference === 1) {
      return `${daysDifference} ${t("time-day-ago")}`;
    } else if (daysDifference < 30) {
      return getTranslationKeyAndValue(daysDifference, 'time-many-day');
    } else if (daysDifference <= 30) {
      const weeks = Math.floor(daysDifference / 7);

      return getTranslationKeyAndValue(weeks, 'time-weeks');
    } else if (daysDifference < 365) {
      const months = Math.floor(daysDifference / 30);
      return getTranslationKeyAndValue(months, 'time-months-ago');
    } else {
      return t("time-more-year");
    }
  };
}

export default useFormatDaysAgo;