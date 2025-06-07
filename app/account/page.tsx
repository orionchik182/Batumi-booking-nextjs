import type { Metadata } from "next";
import { auth } from "../_lib/auth";

export const metadata: Metadata = {
  title: "Guest area",
};

async function Page() {
  const session = await auth();
  
  const firstName = session?.user.name?.split(" ").at(0);
  return (
    <h2 className="text-accent-400 mb-7 text-2xl font-semibold">
      Welcome, {firstName}
    </h2>
  );
}

export default Page;
