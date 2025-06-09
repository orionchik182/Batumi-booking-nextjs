"use client";

import { differenceInDays } from "date-fns";

import { useReservation } from "./ReservationContext";
import { createReservation } from "../_lib/actions";
import FormUpdateButton from "./FormUpdateButton";
import Image from "next/image";
import { ReservationFormProps } from "@/@types/next-auth";

function ReservationForm({ cabin, user }: ReservationFormProps) {
  const { range, resetRange } = useReservation();
  const { maxCapacity, regularPrice, discount, id } = cabin;

  const startDate = range?.from;
  const endDate = range?.to;

  if (!startDate || !endDate) return null;

  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };

  const createBookingWithData = createReservation.bind(null, bookingData);

  return (
    <div>
      <div className="bg-primary-800 text-primary-300 flex items-center justify-between px-6 py-2 md:px-16">
        <p>Logged in as</p>

        <div className="flex items-center gap-4">
          <Image
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image || ""}
            alt={user.name || "guest"}
            width={32}
            height={32}
          />
          <span>{user.name}</span>
        </div>
      </div>

      <form
        action={(formData) => {
          createBookingWithData(formData);
          resetRange();
        }}
        className="bg-primary-900 flex flex-col gap-5 px-6 py-8 text-lg md:px-16 md:py-10"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>
        <div className="flex items-center justify-end gap-6">
          {!(startDate && endDate) ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <FormUpdateButton pendingLabel="Updating...">
              Reserve now
            </FormUpdateButton>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
