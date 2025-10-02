import Link from "next/link";
import { User, LogOut } from "lucide-react";
import { useAuthStore } from "@/context/auth-store";
//import Logout from "@/app/ui/dashboard/logout";

export default function UserDropdown() {
  const { logout } = useAuthStore();
  const links = [
    { name: "Profile", href: "/dashboard/profile", Icon: User },
  ];

  const handleLogout = () =>{
    logout();
  }

  return (
    <div className="absolute right-0 top-20 w-[190px] bg-accent border-b border-button-default rounded-lg shadow-lg">
      <ul className="flex flex-col ">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="flex items-center gap-2 w-full p-4 hover:bg-notification-hovered rounded-t-lg "
          >
            <link.Icon className="text-text" />
            <span className="text-label text-text font-medium">
              {link.name}
            </span>
          </Link>
        ))}
        <div className="border-t px-2 text-error border-notification-hovered hover:bg-notification-hovered flex gap-2 items-center   rounded-b-lg">
          {/* <Logout /> */}
          <button type="button" 
          onClick={handleLogout}
          aria-label="sign out button"
            className="flex w-full hover:cursor-pointer items-center gap-3 p-3 text-sm font-medium text-red-700  hover:text-red-800 transition-colors"
      >
            <LogOut className="" />
            <span >
              Sign Out
            </span>

          </button>
        </div>
      </ul>
    </div>
  );
}