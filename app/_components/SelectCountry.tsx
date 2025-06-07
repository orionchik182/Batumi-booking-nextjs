// Let's imagine your colleague already built this component 😃
import { Country } from "../_types/interfaces";

interface SelectCountryProps {
  selectedCountry: string;
  name: string;
  id: string;
  className?: string;
  countries: Country[];
}

function SelectCountry({
  selectedCountry,
  name,
  id,
  className,
  countries,
}: SelectCountryProps) {
  const flag =
    countries.find((country) => country.name === selectedCountry)?.flag ?? "";

  return (
    <select
      name={name}
      id={id}
      // Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
      defaultValue={`${selectedCountry}%${flag}`}
      className={className}
    >
      <option value="">Select country...</option>
      {countries.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
