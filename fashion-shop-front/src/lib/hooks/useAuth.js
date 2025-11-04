"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { toast } from "sonner";

export function useAuth(options = {}) {
  const {
    redirectIfAuthenticated = false,
    redirectTo = redirectIfAuthenticated ? "/" : "/auth/login",
  } = options;

  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (redirectIfAuthenticated && isAuthenticated) {
      router.push(redirectTo);
    } else if (!redirectIfAuthenticated && !isAuthenticated) {
      toast.error("Acceso denegado", {
        description: "Debes iniciar sesión para acceder a esta página",
      });
      router.push(redirectTo);
    }
  }, [isAuthenticated, router, redirectIfAuthenticated, redirectTo]);

  return { isAuthenticated, user };
}
