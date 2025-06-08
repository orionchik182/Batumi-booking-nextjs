import FormUpdateButton from "@/app/_components/FormUpdateButton";
import { updateReservation } from "@/app/_lib/actions";


import { getBooking, getCabin } from "@/app/_lib/data-service";
import { JSX } from "react";

export default async function Page({
  params,
}: {
  params: { id: string };
}): Promise<JSX.Element> {
  const id = Number(params.id);

  const booking = await getBooking(id);
  if (!booking) throw new Error("Booking not found");

  const { numGuests, observations, cabinId } = booking;

  const cabin = await getCabin(cabinId);
  if (!cabin) throw new Error("Cabin not found");

  const { maxCapacity } = cabin;

  return (
    <div>
      <h2 className="text-accent-400 mb-7 text-2xl font-semibold">
        Edit Reservation #{id}
      </h2>

      <form
        className="bg-primary-900 flex flex-col gap-6 px-12 py-8 text-lg"
        action={updateReservation}
      >
        <input type="hidden" name="id" value={id} />
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            defaultValue={numGuests}
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
            defaultValue={observations}
            name="observations"
            className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm"
          />
        </div>

        <div className="flex items-center justify-end gap-6">
          <FormUpdateButton pendingLabel="Updating...">
            Update reservation
          </FormUpdateButton>
        </div>
      </form>
    </div>
  );
}
