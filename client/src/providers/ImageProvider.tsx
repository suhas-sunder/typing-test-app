import { useState } from "react";
import { createContext } from "react";

interface ContextType {
  profileImgURL: string;
  setProfileImgURL: (value: string) => void;
}

export const ImageContext = createContext<ContextType>({
  profileImgURL: "",
  setProfileImgURL: () => {},
});

interface PropType {
  children: React.ReactNode;
}

export default function ImageProvider({ children }: PropType) {
  const [profileImgURL, setProfileImgURL] = useState<string>("");

  return (
    <ImageContext.Provider value={{ profileImgURL, setProfileImgURL }}>
      {children}
    </ImageContext.Provider>
  );
}
