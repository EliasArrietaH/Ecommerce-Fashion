"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Heart, User, Search, LogOut } from "lucide-react";
import { useAuthStore } from "@/lib/store/authStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Sesión cerrada", {
      description: "Has cerrado sesión correctamente",
    });
    router.push("/");
    setShowUserMenu(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/Frame 168.png"
              alt="Fashion Shop Logo"
              width={140}
              height={40}
              className="w-70 h-10"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <User size={20} />
                  <span className="hidden md:inline text-sm font-medium">
                    {user?.name?.split(" ")[0]}
                  </span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <Link
                      href="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Mi Perfil
                    </Link>
                    <Link
                      href="/orders"
                      onClick={() => setShowUserMenu(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Mis Pedidos
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <LogOut size={16} />
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                <User size={20} />
              </Link>
            )}

            <button className="text-gray-700 hover:text-gray-900 transition-colors">
              <Search size={20} />
            </button>
            <Link
              href="/favorites"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Heart size={20} />
            </Link>
            <Link
              href="/cart"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              <ShoppingCart size={20} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
