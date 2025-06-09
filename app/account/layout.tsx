import { RootLayoutProps } from "@/@types/next-auth";
import SideNavigation from "@/app/_components/SideNavigation";

function Layout({ children }: RootLayoutProps) {
  return (
    <div className="grid h-full gap-12 md:grid-cols-[16rem_1fr]">
      <SideNavigation />
      <div>{children}</div>
    </div>
  );
}

export default Layout;
