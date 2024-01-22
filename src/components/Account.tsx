"use client";
import { useGlobal } from "@/contextWithDrivers/GlobalContext";
import { Button } from "@/shadcn/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shadcn/components/ui/dropdown-menu";
import { Github, LifeBuoy, LogIn, LogOut, MoreHorizontal, Settings, User, UserRound, UserRoundPlus } from "lucide-react";
import Link from "next/link";

export default function Account() {
  // Global context
  const { user, logout } = useGlobal();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} size={"icon"} className="dark relative rounded-full ml-4">
          {user.loggedIn ? <UserRound size={25} color="white" /> : <MoreHorizontal size={25} color="white" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" side="bottom" align="end" sideOffset={10}>
        <DropdownMenuLabel>{user.loggedIn ? user.name : "Geminiwear"}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Account</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Link href={"https://github.com/sohamw03"} target="_blank">
          <DropdownMenuItem className="cursor-pointer">
            <Github className="mr-2 h-4 w-4" />
            <span>GitHub</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem className="cursor-pointer">
          <LifeBuoy className="mr-2 h-4 w-4" />
          <span>Support</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {user.loggedIn ? (
          <DropdownMenuItem onClick={logout} className="focus:bg-red-950 hover:bg-red-950 cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        ) : (
          <>
            <Link href={"/login"}>
              <DropdownMenuItem className="cursor-pointer">
                <LogIn className="mr-2 h-4 w-4" />
                <span>Log in</span>
              </DropdownMenuItem>
            </Link>
            <Link href={"/signup"}>
              <DropdownMenuItem className="cursor-pointer">
                <UserRoundPlus className="mr-2 h-4 w-4" />
                <span>Sign up</span>
              </DropdownMenuItem>
            </Link>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
