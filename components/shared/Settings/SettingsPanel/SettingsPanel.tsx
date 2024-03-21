import { CameraIcon } from "@/icons";
import Image          from "next/image"
import { useRef }     from "react";

interface ISettingsPanel {
  selectedUserImage         ?: File | null;
  selectedBackgroundImage   ?: File | null;
  handleUserImageChange      : (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBackgroundImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SettingsPanel = ({
  selectedUserImage,
  selectedBackgroundImage,
  handleUserImageChange,
  handleBackgroundImageChange
}: ISettingsPanel) => {
  const inputUserImgRef       = useRef<HTMLInputElement | null>(null); 
  const inputBackgroundImgRef = useRef<HTMLInputElement | null>(null); 

  return (
    <div className="w-full second-background py-3 px-6 rounded-lg relative overflow-hidden">
      {selectedBackgroundImage && (
        <Image src={URL.createObjectURL(selectedBackgroundImage)} alt="Background image" className="absolute w-full h-full object-cover top-0 left-0 opacity-40" width={600} height={50} />
      )}
      <div className="relative">
        <input type="file" ref={inputUserImgRef} accept="accept/*" onChange={handleUserImageChange} hidden />
        <button onClick={() => inputUserImgRef.current?.click()}>
          <Image src={selectedUserImage ? URL.createObjectURL(selectedUserImage) : '/assets/testuserimage.jpg'} alt="User image" className="w-20 h-20 object-cover rounded-full z-50" width={80} height={80} />
        </button>
        <input type="file" ref={inputBackgroundImgRef} accept="accept/*" onChange={handleBackgroundImageChange} hidden />
        <button className="absolute right-6 top-3" onClick={() => inputBackgroundImgRef.current?.click()}>
          <CameraIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}