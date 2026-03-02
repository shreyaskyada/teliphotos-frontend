"use client";

import { logout } from "@telephotos/app/login/actions";
import {
  Avatar,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@telephotos/ui";
import { Skeleton } from "@telephotos/ui/Skeleton";
import { ChevronLeftIcon, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import useUserProfile from "./useUserProfile";

const UserProfile: React.FC = () => {
  const router = useRouter();
  const { data, isLoading } = useUserProfile();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  if (isLoading) {
    return (
      <div className="flex gap-2 items-center">
        <Skeleton className="rounded-full size-10" />
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-[14px] w-[100px]" />
          <Skeleton className="h-[12px] w-[50px]" />
        </div>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" aria-label="Open profile menu" className="flex items-center space-x-2 focus:outline-none text-">
          <Avatar name={`${data?.firstName} ${data?.lastName}`} />

          <div className="flex  flex-col items-start">
            <span className="hidden md:inline text-sm text-nowrap font-bold">
              {data?.firstName} {data?.lastName}
            </span>
            <span className="hidden md:inline text-xs font-medium text-nowrap">
              {data?.username}
            </span>
          </div>

          <ChevronLeftIcon className="-rotate-90" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48 bg-slate-900 border border-white/10">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-400 hover:bg-white/10">
          <LogOut className="w-4 h-4 mr-2" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;
