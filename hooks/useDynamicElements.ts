"use client"

import { useState, ReactNode } from 'react';

type CreateElement = (index: number) => ReactNode;

export const useDynamicElements = (createElement: CreateElement) => {
  const [elements, setElements] = useState<ReactNode[]>([]);

  const handleClick = () => {
    setElements(prevElements => [...prevElements, createElement(prevElements.length)]);
  };

  return { elements, handleClick };
};

