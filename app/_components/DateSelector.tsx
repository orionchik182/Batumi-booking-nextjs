"use client";

import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useReservation } from "./ReservationContext";
import { DateSelectorProps } from "@/@types/next-auth";

function isAlreadyBooked(range: DateRange | undefined, datesArr: Date[]) {
  if (!range?.from || !range?.to) return false;

  const start = range.from as Date;
  const end = range.to as Date;

  return datesArr.some((date) => isWithinInterval(date, { start, end }));
}

function DateSelector({ settings, cabin, bookedDates }: DateSelectorProps) {
  const { range, setRange, resetRange } = useReservation();

  const displayRange: DateRange | undefined = isAlreadyBooked(
    range,
    bookedDates,
  )
    ? undefined
    : range;

  const { regularPrice, discount } = cabin;

  const from = displayRange?.from;
  const to = displayRange?.to;
  const numNights = from && to ? differenceInDays(to, from) : 0;

  const cabinPrice = numNights * (regularPrice - discount);

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex max-w-[600px] flex-col justify-between overflow-x-auto">
      <DayPicker
        style={{ transform: "scale(0.8)", transformOrigin: "center" }}
        classNames={{
          months: "flex gap-6 pt-8 ml-[-10px]",
          day: "hover:bg-accent-500 hover: rounded-xl",
          selected: "bg-accent-500 rounded-xl",
          range_start: "bg-accent-500",
          range_middle: "bg-accent-500",
          range_end: "bg-accent-500",
        }}
        mode="range"
        selected={displayRange}
        onSelect={setRange}
        min={minBookingLength}
        max={maxBookingLength}
        startMonth={new Date()}
        endMonth={new Date(2030, 0)}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date) => isSameDay(date, curDate))
        }
      />

      <div className="bg-accent-500 text-primary-800 flex h-[72px] items-center justify-between px-8">
        <div className="flex items-baseline gap-6">
          <p className="flex items-baseline gap-2">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="text-primary-700 font-semibold line-through">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border-primary-800 border px-4 py-2 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
