"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Landmark,
  FileCheck,
  Blocks,
  ChartNoAxesCombinedIcon,
  LayoutPanelTop,
  Building2,
  Menu,
  X,
  Search,
} from "lucide-react";
import { useState } from "react";

type NavItem = {
  name: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

const navItems: NavItem[] = [
  { name: "Home", href: "/", icon: Home },
  { name: "Showcase", href: "/showcase", icon: Landmark },
  { name: "Docs", href: "/docs", icon: FileCheck },
  { name: "Blog", href: "/blog", icon: Blocks },
  { name: "Analytics", href: "/analytics", icon: ChartNoAxesCombinedIcon },
  { name: "Templates", href: "/templates", icon: LayoutPanelTop },
  { name: "Enterprise", href: "/enterprise", icon: Building2 },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Searching for: ${search}`);
  };

  return (
    <>
      {/* 🌐 Desktop Top Bar */}
      <nav className="hidden md:flex items-center justify-between bg-gray-900 text-white px-6 h-16 sticky top-0 z-40">
        <h1 className="text-xl font-bold">My App</h1>

        {/* Center Nav Links */}
        <ul className="flex gap-6">
          {navItems.map(({ name, href }) => {
            const active = pathname === href;
            return (
              <li key={name}>
                <Link
                  href={href}
                  className={`transition ${active ? "text-blue-400" : "hover:text-gray-300"
                    }`}
                >
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right Search Field */}
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-gray-800 px-3 py-1 rounded-lg"
        >
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-sm text-white placeholder-gray-400"
          />
          <button type="submit">
            <Search size={18} className="text-gray-400 ml-2 hover:text-white" />
          </button>
        </form>
      </nav>

      {/* 📱 Mobile Top Row */}
      <div className="flex items-center justify-between bg-gray-900 text-white px-4 h-16 md:hidden sticky top-0 z-40">
        {/* Left: Hamburger */}
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-lg bg-gray-800"
        >
          <Menu size={24} />
        </button>

        {/* Center: App Title */}
        <h1 className="text-lg font-bold">My App</h1>

        {/* Right: Spacer for balance */}
        <div className="w-10" />
      </div>

      {/* 📱 Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-4 flex flex-col z-50 transform transition-transform duration-300 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 h-16">
          <h1 className="text-2xl font-bold">My App</h1>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded hover:bg-gray-800">
              <Search size={22} />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded hover:bg-gray-800"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Links */}
        <nav className="flex-1">
          <ul className="space-y-2">
            {navItems.map(({ name, href, icon: Icon }) => {
              const active = pathname === href;
              return (
                <li key={name}>
                  <Link
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 p-2 rounded-lg transition ${active ? "bg-gray-700" : "hover:bg-gray-800"
                      }`}
                  >
                    <Icon size={20} />
                    <span>{name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
