import Link from "next/link";
import { Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-kdrama-pink border-opacity-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Features Column */}
          <div>
            <h3 className="font-semibold text-kdrama-text mb-4">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#features"
                  className="text-kdrama-text hover:text-kdrama-accent"
                >
                  Personal Library
                </Link>
              </li>
              <li>
                <Link
                  href="#features"
                  className="text-kdrama-text hover:text-kdrama-accent"
                >
                  Global Directory
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-kdrama-text hover:text-kdrama-accent"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="#features"
                  className="text-kdrama-text hover:text-kdrama-accent"
                >
                  Tag System
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore Column */}
          <div>
            <h3 className="font-semibold text-kdrama-text mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-kdrama-text hover:text-kdrama-accent"
                >
                  Popular Dramas
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-kdrama-text hover:text-kdrama-accent"
                >
                  New Releases
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-kdrama-text hover:text-kdrama-accent"
                >
                  Top Rated
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-kdrama-text hover:text-kdrama-accent"
                >
                  Genres
                </Link>
              </li>
            </ul>
          </div>

          {/* Community Column */}
          <div>
            <h3 className="font-semibold text-kdrama-text mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-kdrama-text hover:text-kdrama-accent"
                >
                  Forums
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-kdrama-text hover:text-kdrama-accent"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-kdrama-text hover:text-kdrama-accent"
                >
                  Contribute
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-kdrama-text hover:text-kdrama-accent"
                >
                  Updates
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-semibold text-kdrama-text mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-kdrama-text hover:text-kdrama-accent"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-kdrama-text hover:text-kdrama-accent"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-kdrama-text hover:text-kdrama-accent"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-kdrama-text hover:text-kdrama-accent"
                >
                  GDPR
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-kdrama-pink border-opacity-20">
          <div className="text-kdrama-text mb-4 md:mb-0">
            © {currentYear} K-Drama Tracker. All rights reserved.
          </div>

          <div className="flex space-x-6">
            <a href="#" className="text-kdrama-text hover:text-kdrama-accent">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-kdrama-text hover:text-kdrama-accent">
              <span className="sr-only">Instagram</span>
              <Instagram className="h-6 w-6" />
            </a>
            <a href="#" className="text-kdrama-text hover:text-kdrama-accent">
              <span className="sr-only">YouTube</span>
              <Youtube className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
