import Image from "next/image";
import Link from "next/link";
import bg from "@/public/bg.png";

export default function Page() {
  return (
    <main className="mt-24 relative min-h-[60vh]">
      <Image
        src={bg}
        fill
        className="object-cover object-top"
        placeholder="blur"
        quality={80}
        alt="Mountains and forests with two cabins"
      />

      <div className="relative z-10 text-center">
        <h1 className="text-primary-50 mb-10 text-5xl font-normal tracking-tight md:text-8xl">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 text-primary-800 hover:bg-accent-600 px-6 py-4 text-lg font-semibold transition-all md:px-8 md:py-6"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}
