"use client"

import { useState } from 'react';

interface ICustomState {
  defaultComplexity?: string;
  defaultAcess     ?: boolean;
  defaultType      ?: string;
  defaulBgImage    ?: boolean;
}

export const useCustomState = ({
  defaultComplexity,
  defaultAcess,
  defaultType,
  defaulBgImage
}: ICustomState) => {
  const [complexity, setComplexity] = useState<string>(defaultComplexity || ""); 
  const [access, setAccess]         = useState<boolean>(defaultAcess || true); 
  const [type, setType]             = useState<string>(defaultType || ""); 
  const [bgImage, setBgImage]       = useState<boolean>(defaulBgImage || true);
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