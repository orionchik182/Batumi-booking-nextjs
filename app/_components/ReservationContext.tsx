"use client";

import React, { createContext, useContext, useState } from "react";
import { RangeType } from "../_types/interfaces";

interface ReservationContextType {
  range: RangeType;
  setRange: React.Dispatch<React.SetStateAction<RangeType>>;
  resetRange: () => void;
}

const ReservationContext = createContext<ReservationContextType | undefined>(
  undefined,
);

const initialState: RangeType = { from: undefined, to: undefined };

interface ReservationProviderProps {
  children: React.ReactNode;
}

function ReservationProvider({ children }: ReservationProviderProps) {
  const [range, setRange] = useState<RangeType>(initialState);
  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (context == undefined)
    throw new Error("Context was used outside provider");
  return context;
}

export { ReservationProvider, useReservation };
