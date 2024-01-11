import React, { createContext, useState } from "react";

interface ContextType {
  totalScore: number;
  setTotalScore: (value: number) => void;
}

export const StatsContext = createContext<ContextType>({
  totalScore: 0,
  setTotalScore: () => {},
});

interface PropType {
  children: React.ReactNode;
}

export default function StatsProvider({ children }: PropType) {
  const [totalScore, setTotalScore] = useState<number>(0);

  return (
    <StatsContext.Provider
      value={{
        totalScore,
        setTotalScore,
      }}
    >
      {children}
    </StatsContext.Provider>
  );
}
