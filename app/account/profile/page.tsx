import SelectCountry from "@/app/_components/SelectCountry";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import { auth } from "@/app/_lib/auth";
import { getCountries, getGuest } from "@/app/_lib/data-service";

export const metadata = {
  title: "Update profile",
};

export default async function Page() {
  const session = await auth();
  const guest = await getGuest(session?.user?.email);
  const countries = await getCountries();

  return (
    <div>
      <h2 className="text-accent-400 mb-4 text-2xl font-semibold">
        Update your guest profile
      </h2>

      <p className="text-primary-200 mb-8 text-lg">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <UpdateProfileForm guest={guest}>
        <SelectCountry
          key={guest.nationality}
          name="nationality"
          id="nationality"
          className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm"
          selectedCountry={guest.nationality}
          countries={countries}
        />
      </UpdateProfileForm>
    </div>
  );
}
