import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";

import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Metadata } from "next";

import { ReactElement, Suspense } from "react";

type Props = {
  params: { cabinId: string };

  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cabin = await getCabin(Number(params.cabinId));
  const name = cabin?.name;
  return { title: name ? `Cabin ${name}` : "Cabin" };
}

export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

  return ids;
}

export default async function Page({
  params,
}: {
  params: { cabinId: string };
}): Promise<ReactElement> {
  const cabin = await getCabin(Number(params.cabinId));

  if (!cabin) return <div>Cabin not found</div>;

  return (
    <div className="mx-auto mt-8 max-w-6xl">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-accent-400 mb-10 text-center text-5xl font-semibold">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
