import React, { ReactNode } from "react";

export interface RootLayoutProps {
  children: ReactNode;
}

export interface EnvVariables {
  SUPABASE_URL: string;
  SUPABASE_KEY: string;
}

export interface CabinsDataType {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
  description: string;
}

export type CabinsPriceType = Pick<CabinsDataType, "regularPrice" | "discount">;

export interface Booking {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  guestId: number;
  cabinId: number;
  observations: string;
  cabins: {
    name: string;
    image: string;
  }[];
}

export type PageProps = {
  params: { cabinId: string };
};

export interface ErrorProps {
  error: Error;
  reset: () => void;
}

export type SearchParams = {
  searchParams: {
    capacity?: string;
  };
};

export type FilterType = "all" | "small" | "medium" | "large";

export interface ButtonType {
  filter: FilterType;
  handleFilter: (filter: FilterType) => void;
  activeFilter: string;
  children: React.ReactNode;
}

export interface RangeType {
  from: Date | undefined;
  to: Date | undefined;
}

export interface Guest {
  id: number;
  fullName: string;
  email: string;
  nationality: string | null;
  nationalID: string | null;
  countryFlag: string | null;
}

export interface UpdateGuestData {
  nationality: string;
  countryFlag: string;
  nationalID: string;
}

export interface NewGuest {
  email: string;
  fullName: string;
}

export interface Settings {
  minBookingLength: number;
  maxBookingLength: number;
}

export interface Country {
  name: string;
  flag: string;
}

export interface BookingData {
  startDate: Date;
  endDate: Date;
  numNights: number;
  cabinPrice: number;
  cabinId: number;
}

export interface NewBooking extends BookingData {
  guestId?: number;
  numGuests: number;
  observations: string;
  extrasPrice: number;
  totalPrice: number;
  isPaid: boolean;
  hasBreakfast: boolean;
  status: string;
}
