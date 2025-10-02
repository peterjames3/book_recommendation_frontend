// app/dashboard/layout.tsx
import SideNav from "@/app/ui/components/dashboard/sidenav";
import DisplayContent from "@/app/ui/components/dashboard/display-content";
//import { fetchUser } from "@/app/lib/data";
//import { User } from "@/app/lib/definitions";

//export const experimental_ppr = true;

export default  function Page() {
 

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-background w-full mx-auto max-w-full lg:max-w-[1240px] xl:max-w-[1440px]">
      <div className="w-full flex-none md:w-[20rem]">
        <SideNav />
      </div>

      <div className="flex flex-col flex-grow md:overflow-y-auto">
      
        <main className="flex-1 p-4 md:p-6 lg:p-8"><DisplayContent /></main>
      </div>
    </div>
  );
}