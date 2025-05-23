import Link from "next/link";
import { ArrowUpRight, Heart, BookOpen, Bookmark } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-kdrama-lightpink via-white to-kdrama-lightblue opacity-80" />

      <div className="relative pt-24 pb-32 sm:pt-32 sm:pb-40">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-bold text-kdrama-text mb-8 tracking-tight">
              Your Personal{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-400">
                K-Drama
              </span>{" "}
              Library
            </h1>

            <p className="text-xl text-kdrama-text mb-12 max-w-2xl mx-auto leading-relaxed">
              Track, categorize, and discover your favorite Korean dramas with
              our beautiful, Goodreads-inspired interface. Never lose track of
              what you're watching again!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center px-8 py-4 text-white bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500 rounded-lg transition-colors text-lg font-medium shadow-md"
              >
                Start Your Collection
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </Link>

              <Link
                href="#features"
                className="inline-flex items-center px-8 py-4 text-kdrama-text bg-white bg-opacity-70 rounded-lg hover:bg-opacity-100 transition-colors text-lg font-medium border border-kdrama-pink shadow-sm"
              >
                Learn More
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-6">
              <div className="relative w-24 h-36 rounded-md overflow-hidden shadow-md transform rotate-[-5deg]">
                <Image
                  src="https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=200&q=80"
                  alt="Drama poster"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="relative w-24 h-36 rounded-md overflow-hidden shadow-md transform translate-y-4">
                <Image
                  src="https://images.unsplash.com/photo-1581368135153-a506cf13531c?w=200&q=80"
                  alt="Drama poster"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="relative w-24 h-36 rounded-md overflow-hidden shadow-md transform rotate-[5deg]">
                <Image
                  src="https://images.unsplash.com/photo-1625979747046-7d9c88111c93?w=200&q=80"
                  alt="Drama poster"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-kdrama-text">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-kdrama-accent" />
                <span>Track your favorites</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-kdrama-accent" />
                <span>Discover new dramas</span>
              </div>
              <div className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-kdrama-accent" />
                <span>Organize by tags</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
