import Link from "next/link";
import { createClient } from "../../supabase/server";
import { Button } from "./ui/button";
import UserProfile from "./user-profile";
import { Heart, Film } from "lucide-react";

export default async function Navbar() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();
  const user = data.user;

  return (
    <nav className="w-full border-b border-kdrama-pink border-opacity-30 bg-white py-3 shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center">
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
        <div className="flex gap-4 items-center">
          {user ? (
            <>
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
              <UserProfile />
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="px-4 py-2 text-sm font-medium text-kdrama-text hover:text-kdrama-accent transition-colors"
              >
                Sign In
              </Link>
              <Link href="/sign-up">
                <Button className="bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500 text-white">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
