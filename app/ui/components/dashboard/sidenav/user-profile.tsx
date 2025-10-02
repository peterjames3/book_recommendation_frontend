// app/ui/components/dashboard/sidenav/UserProfileSection.tsx
import { LogOut } from "lucide-react";
import { UserProfileSectionProps } from "./types";

export default function UserProfileSection({ user, onLogout }: UserProfileSectionProps) {
  return (
    <div className="space-y-4 border-t border-gray-300 pt-4">
      {/* User Info */}
      {user && (
        <div className="flex items-center gap-3 p-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-semibold">
            {user.firstName?.charAt(0) || user.email?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text truncate">
              {user.firstName || 'User'}
            </p>
            <p className="text-xs text-normalText truncate">
              {user.email}
            </p>
          </div>
        </div>
      )}

      {/* Logout Button */}
      <button
        onClick={onLogout}
        className="flex w-full items-center gap-3 rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700 hover:bg-red-100 hover:text-red-800 transition-colors"
      >
        <LogOut size={20} />
        <span>Sign Out</span>
      </button>
    </div>
  );
}