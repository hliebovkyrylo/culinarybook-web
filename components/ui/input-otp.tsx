import { useDigitInput } from '@/hooks/useDigitInput';
import React             from 'react';

interface IInputOTP {
  length  : number;
  onChange: (value: string) => void;
}

export const InputOTP: React.FunctionComponent<IInputOTP> = ({ length, onChange }) => {
  const { digits, inputRefs, handleChange, handleKeyDown } = useDigitInput(length);

  React.useEffect(() => {
    onChange(digits.join(''));
  }, [digits, onChange]);

  return (
    <div className="flex justify-between">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          maxLength={1}
          className="dark:bg-bg-c-3 w-11 h-[58px] rounded-md text-center text-2xl outline-none max-[368px]:w-7 max-[368px]:h-11"
        />
      ))}
    </div>
  );
};