import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import {
  ArrowUpRight,
  Heart,
  BookOpen,
  Tag,
  Film,
  Search,
  Grid3X3,
} from "lucide-react";
import { createClient } from "../../supabase/server";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-kdrama-lightpink">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-kdrama-text">
              Features You'll Love
            </h2>
            <p className="text-kdrama-text max-w-2xl mx-auto">
              Our K-Drama tracker helps you organize your watching experience
              with these amazing features.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Grid3X3 className="w-6 h-6" />,
                title: "Masonry Grid Layout",
                description:
                  "Beautiful visual display of your drama collection with poster artwork",
              },
              {
                icon: <Heart className="w-6 h-6" />,
                title: "Status Tracking",
                description:
                  "Mark dramas as liked, loved, or dropped to organize your collection",
              },
              {
                icon: <Tag className="w-6 h-6" />,
                title: "Tag Filtering",
                description:
                  "Filter your library by multiple tags to find exactly what you're looking for",
              },
              {
                icon: <Search className="w-6 h-6" />,
                title: "Smart Search",
                description:
                  "Easily find and add dramas from our global directory",
              },
              {
                icon: <Film className="w-6 h-6" />,
                title: "Global Directory",
                description:
                  "Discover new dramas with one-click add to your personal shelf",
              },
              {
                icon: <BookOpen className="w-6 h-6" />,
                title: "Contribute New Entries",
                description:
                  "Add missing dramas to our global directory with name, year, and tags",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-gradient-to-br from-white to-kdrama-lightpink rounded-xl shadow-sm hover:shadow-md transition-shadow border border-kdrama-pink border-opacity-20"
              >
                <div className="text-kdrama-accent mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-kdrama-text">
                  {feature.title}
                </h3>
                <p className="text-kdrama-text">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-20 bg-gradient-to-r from-kdrama-lightpink to-kdrama-lightblue">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1586899028174-e7098604235b?w=800&q=80"
                alt="K-Drama Library Preview"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                <div className="flex gap-3">
                  <span className="px-3 py-1 bg-kdrama-pink text-white rounded-full text-xs">
                    Romance
                  </span>
                  <span className="px-3 py-1 bg-kdrama-blue text-white rounded-full text-xs">
                    Comedy
                  </span>
                  <span className="px-3 py-1 bg-purple-400 text-white rounded-full text-xs">
                    Fantasy
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-kdrama-text">
                Your Personal K-Drama Collection
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-kdrama-pink rounded-full p-2 mt-1">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-kdrama-text">
                      Track Your Favorites
                    </h3>
                    <p className="text-kdrama-text">
                      Keep a record of dramas you've watched, loved, or want to
                      watch later.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-kdrama-blue rounded-full p-2 mt-1">
                    <Tag className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-kdrama-text">
                      Organize with Tags
                    </h3>
                    <p className="text-kdrama-text">
                      Categorize your dramas with custom tags and filter your
                      collection easily.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-purple-400 rounded-full p-2 mt-1">
                    <Search className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-kdrama-text">
                      Discover New Dramas
                    </h3>
                    <p className="text-kdrama-text">
                      Browse our global directory to find your next favorite
                      K-Drama.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-kdrama-text">
            Start Your K-Drama Journey Today
          </h2>
          <p className="text-kdrama-text mb-8 max-w-2xl mx-auto">
            Join our community of K-Drama enthusiasts and keep track of all your
            favorite shows in one beautiful place.
          </p>
          <Link
            href={user ? "/dashboard" : "/sign-up"}
            className="inline-flex items-center px-8 py-4 text-white bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500 rounded-lg transition-colors shadow-md"
          >
            {user ? "Go to Your Library" : "Create Your Library"}
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
