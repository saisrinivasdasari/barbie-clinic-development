// @ts-nocheck
"use client";

import React, { createContext, useContext, useState } from "react";
import BookingModal from "@/components/booking/BookingModal";

interface BookingContextType {
  isOpen: boolean;
  openBooking: (treatmentId?: string) => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextType>({
  isOpen: false,
  openBooking: () => {},
  closeBooking: () => {},
});

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialTreatmentId, setInitialTreatmentId] = useState<string | undefined>(undefined);

  const openBooking = (treatmentId?: string) => {
    setInitialTreatmentId(treatmentId);
    setIsOpen(true);
  };

  const closeBooking = () => {
    setIsOpen(false);
  };

  return (
    <BookingContext.Provider value={{ isOpen, openBooking, closeBooking }}>
      {children}
      <BookingModal
        isOpen={isOpen}
        onClose={closeBooking}
        initialTreatmentId={initialTreatmentId}
      />
    </BookingContext.Provider>
  );
}

export const useBooking = () => useContext(BookingContext);
