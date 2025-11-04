"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { authApi } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/store/authStore";

export default function RegisterForm() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await authApi.register(data);

      setAuth(response.user, response.token);

      toast.success("¡Registro exitoso!", {
        description: "Bienvenido a Fashion Shop",
      });

      router.push("/");
    } catch (error) {
      toast.error("Error al registrar", {
        description: error.message || "Por favor, intenta nuevamente",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className=" text-gray-500 bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Crear Cuenta
          </h2>
          <p className="text-gray-600">Únete a Fashion Shop</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-black mb-2"
            >
              Nombre Completo
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                id="name"
                type="text"
                {...register("name", {
                  required: "El nombre es requerido",
                  minLength: {
                    value: 3,
                    message: "El nombre debe tener al menos 3 caracteres",
                  },
                })}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2  focus:border-transparent transition-colors ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Juan Pérez"
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "El email es requerido",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email inválido",
                  },
                })}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2  focus:border-transparent transition-colors ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="tu@email.com"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-black mb-2"
            >
              Contraseña
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Contraseña requerida",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                    message:
                      "La contraseña debe tener al menos 6 caracteres, una mayúscula, un número y un carácter especial",
                  },
                })}
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2  focus:border-transparent transition-colors ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Registrando..." : "Crear Cuenta"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿Ya tienes cuenta?{" "}
            <Link
              href="/auth/login"
              className="text-amber-600 hover:text-amber-700 font-semibold"
            >
              Inicia Sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
