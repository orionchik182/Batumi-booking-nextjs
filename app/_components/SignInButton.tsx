import { signInAction } from "../_lib/actions";
import Image from "next/image";

function SignInButton() {
  return (
    <form action={signInAction}>
      <button className="border-primary-300 flex items-center gap-6 border px-10 py-4 text-lg font-medium">
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height={24}
          width={24}
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
