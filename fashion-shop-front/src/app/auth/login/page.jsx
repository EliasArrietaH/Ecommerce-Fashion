import Link from "next/link";
import LoginForm from "../../../Components/auth/LoginForm";

export const metadata = {
  title: "Iniciar Sesión - Fashion Shop",
  description: "Inicia sesión en Fashion Shop",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen  from-amber-50 via-white to-stone-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-2xl font-bold text-amber-600 hover:text-amber-700 transition-colors">
              Fashion Shop
            </h1>
          </Link>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
