"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import {
  createBooking,
  deleteBooking,
  getBookings,
  updateBooking,
  updateGuestSupabase,
} from "./data-service";
import { redirect } from "next/navigation";
import { BookingData, NewBooking, UpdateGuestData } from "../_types/interfaces";

export async function updateGuest(formData: FormData): Promise<void> {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData: UpdateGuestData = { nationality, countryFlag, nationalID };

  await updateGuestSupabase(session.user.guestId, updateData);
  revalidatePath("/account/profile");
}

export async function createReservation(
  bookingData: BookingData,
  formData: FormData,
) : Promise<void> {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const newBooking: NewBooking = {
    ...bookingData,
    guestId: session.user?.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };
  await createBooking(newBooking);
  revalidatePath(`/cabins/${bookingData.cabinId}`);
  revalidatePath("/account/reservations");
  redirect("/cabins/thankyou");
}

export async function updateReservation(formData: FormData): Promise<void> {
  // 1) Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // 2) Authorization
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  const id = Number(formData.get("id"));

  if (!guestBookingIds.includes(id))
    throw new Error("You are not allowed to delete this booking");

  // 3) Building update data
  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations").slice(0, 1000);

  const updateData: Partial<NewBooking> = { numGuests, observations };

  await updateBooking(id, updateData);
  revalidatePath("/account/reservations");
  redirect("/account/reservations");
}

export async function deleteReservation(bookingId: number): Promise<void> {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");
  deleteBooking(bookingId);
  revalidatePath("/account/reservations");
}

export async function signInAction(): Promise<void> {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction(): Promise<void> {
  await signOut({ redirectTo: "/" });
}
