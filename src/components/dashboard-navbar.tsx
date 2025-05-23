"use client";

import Link from "next/link";
import { createClient } from "../../supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { UserCircle, Heart, Film } from "lucide-react";
import { useRouter } from "next/navigation";
import UserProfile from "./user-profile";

export default function DashboardNavbar() {
  const supabase = createClient();
  const router = useRouter();

  return (
    <nav className="w-full border-b border-kdrama-pink border-opacity-30 bg-white py-3 shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            prefetch
            className="text-xl font-bold flex items-center gap-2"
          >
            <Film className="text-kdrama-accent" />
            <span className="bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent font-bold">
              K-Drama Tracker
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-4 ml-8">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-kdrama-text hover:text-kdrama-accent transition-colors"
            >
              <Heart size={18} />
              My Library
            </Link>
            <Link
              href="/directory"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-kdrama-text hover:text-kdrama-accent transition-colors"
            >
              <Film size={18} />
              Directory
            </Link>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <UserProfile />
        </div>
      </div>
    </nav>
  );
}
