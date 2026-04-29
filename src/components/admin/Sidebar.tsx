"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  ShoppingCart, 
  Users, 
  Star, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: ShoppingBag },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Reviews", href: "/admin/reviews", icon: Star },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("kerosyne_admin_auth");
    router.push("/admin/login");
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 right-4 z-50 bg-black text-white p-2 border-[2px] border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-black text-white border-r-[4px] border-black transition-transform duration-300 md:sticky md:top-0 md:h-screen md:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="h-full flex flex-col p-6 overflow-hidden">
          <div className="mb-12 shrink-0">
            <h2 className="text-3xl font-black italic tracking-tighter uppercase leading-none">
              Kerosyne<br/>
              <span className="text-sm font-bold tracking-[0.2em] not-italic text-white/50">Store Management</span>
            </h2>
          </div>

          <nav className="flex-1 space-y-2 overflow-y-auto scrollbar-hide pr-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center space-x-4 px-4 py-4 font-black uppercase tracking-widest text-sm transition-all
                    ${isActive 
                      ? "bg-white text-black translate-x-2 shadow-[-4px_0px_0px_0px_rgba(255,255,255,1)]" 
                      : "hover:bg-white/10"
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-6 border-t border-white/20 shrink-0">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-4 px-4 py-4 font-black uppercase tracking-widest text-sm text-red-500 hover:bg-red-500 hover:text-white transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
