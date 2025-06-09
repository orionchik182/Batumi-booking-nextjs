import React from "react";

import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { CabinsDataType } from "@/@types/next-auth";

function Cabin({ cabin }: { cabin: CabinsDataType }) {
  const { name, maxCapacity, image, description } = cabin;
  return (
    <div className="border-primary-800 mb-24 grid gap-10 border px-4 py-3 md:grid-cols-[3fr_4fr] md:gap-20 md:px-10">
      <div className="relative md:-translate-x-3">
        <Image src={image} fill className="object-cover" alt={`Cabin ${name}`} />
      </div>

      <div>
        <h3 className="text-accent-100 bg-primary-950 mb-5 text-4xl font-black md:w-[150%] md:-translate-x-[254px] md:p-6 md:pb-1 md:text-7xl">
          Cabin {name}
        </h3>

        <p className="text-primary-300 mb-10 text-lg">{description}</p>

        <ul className="mb-7 flex flex-col gap-4">
          <li className="flex items-center gap-3">
            <UsersIcon className="text-primary-600 h-5 w-5" />
            <span className="text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          <li className="flex items-center gap-3">
            <MapPinIcon className="text-primary-600 h-5 w-5" />
            <span className="text-lg">
              Located in the heart of the <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>
          <li className="flex items-center gap-3">
            <EyeSlashIcon className="text-primary-600 h-5 w-5" />
            <span className="text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Cabin;
