"use client"

import { useState } from 'react';

export const useCustomState = () => {
  const [complexity, setComplexity] = useState<string>(""); 
  const [access, setAccess]         = useState<boolean>(true); 
  const [type, setType]             = useState<string>(""); 
  const [bgImage, setBgImage]       = useState<boolean>(true);
  const [activeId, setActiveId]     = useState<string | null>(null);

  const onClickSetValue = (id: string, value: any) => {
    if (id === 'complexity') {
      setComplexity(value);
    } else if (id === 'access') {
      setAccess(value);
    } else if (id === 'type') {
      setType(value);
    } else if (id === 'bgImage') {
      setBgImage(value);
    }

    setActiveId(null);
  };

  const onClickChangeStates = (id: string) => {
    setActiveId(prevId => prevId === id ? null : id);
  };

  return { complexity, access, type, bgImage, activeId, onClickSetValue, onClickChangeStates };
};