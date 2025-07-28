"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Reports", href: "/reports" },
    { label: "Data Apps", href: "/data-apps" },
    { label: "Templates", href: "/templates" },
    { label: "Support", href: "/support" },
    { label: "Training", href: "/training" },
  ];

  return (
    <>
      <header className="bg-primary text-primary-foreground">
        {/* Main navigation */}
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and company name */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-xl">WF</span>
              </div>
              <span className="font-semibold text-lg">Wesley Farm Supply</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:text-gray-300 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <button className="ml-4 hover:text-gray-300 transition-colors">
                Sign in
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-700">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-2 hover:text-gray-300 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <button className="block w-full text-left py-2 hover:text-gray-300 transition-colors">
                Sign in
              </button>
            </div>
          )}
        </nav>
      </header>

      {/* User info bar (when signed in) */}
      <div className="bg-gray-100 dark:bg-gray-800 text-sm py-2 px-4 text-right">
        <span>Signed in as William Gerstung</span>
      </div>
    </>
  );
}
