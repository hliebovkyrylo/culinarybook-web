"use client"

import { useState, useRef, ChangeEvent } from 'react';

export const useImageUpload = () => {
  const [image, setImage] = useState<File | null>(null);
  const inputFileRef      = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setImage(file);
    }
  };

  return { image, inputFileRef, handleImageChange };
};