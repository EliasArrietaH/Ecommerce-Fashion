"use client";

import Link from "next/link";
import { Home, Search, ShoppingBag, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const handleGoBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-stone-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-amber-600 opacity-20">404</h1>
          <div className="-mt-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Página No Encontrada
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Lo sentimos, la página que buscas no existe o ha sido movida.
            </p>
          </div>
        </div>

        {/* Illustration or Icon */}
        <div className="mb-12 flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 bg-amber-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-16 h-16 text-amber-600" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">?</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 mb-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center space-x-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors w-full sm:w-auto"
          >
            <Home size={20} />
            <span>Volver al Inicio</span>
          </Link>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center space-x-2 border-2 border-amber-600 text-amber-600 hover:bg-amber-50 font-semibold px-6 py-2 rounded-lg transition-colors"
            >
              <ShoppingBag size={18} />
              <span>Ir a Tienda</span>
            </Link>

            <button
              onClick={handleGoBack}
              className="inline-flex items-center justify-center space-x-2 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold px-6 py-2 rounded-lg transition-colors"
            >
              <ArrowLeft size={18} />
              <span>Volver Atrás</span>
            </button>
          </div>
        </div>

        {/* Helpful Links */}
        <div className="border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-600 mb-4">¿Necesitas ayuda?</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              href="/about"
              className="text-amber-600 hover:text-amber-700 font-medium"
            >
              Sobre Nosotros
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/contact"
              className="text-amber-600 hover:text-amber-700 font-medium"
            >
              Contacto
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/shop"
              className="text-amber-600 hover:text-amber-700 font-medium"
            >
              Explorar Productos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
