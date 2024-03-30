"use client"

import { useState, useEffect, useRef } from 'react';

export const useDigitInput = () => {
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) {
      return;
    }
  
    const newDigits  = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);
  
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && index > 0 && digits[index] === '') {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return { digits, inputRefs, handleChange, handleKeyDown };
};
