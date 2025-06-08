import { RootLayoutProps } from "@/@types/next-auth";
import SideNavigation from "@/app/_components/SideNavigation";

function Layout({ children }: RootLayoutProps) {
  return (
    <div className="grid h-full grid-cols-[16rem_1fr] gap-12">
      <SideNavigation />
      <div>{children}</div>
    </div>
  );
}

export default Layout;
