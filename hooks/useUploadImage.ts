"use client"

import { useState, useRef, ChangeEvent } from 'react';

function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload  = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  })
}

export const useImageUpload = () => {
  const [image, setImage] = useState<string | null>("");
  const inputFileRef      = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      toBase64(file).then((base64image) => {
        setImage(base64image);
      })
    }
  };

  return { image, inputFileRef, handleImageChange };
};