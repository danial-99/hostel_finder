import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { logoutByCookies } from "@/actions/authen/logout";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

export const useAuth = () => {
  const router = useRouter();

  const [auth, setAuth] = useState<AuthState>(() => {
    if (typeof window !== 'undefined') {
      // Initialize state from localStorage
      const storedAuth = localStorage.getItem("auth");
      return storedAuth ? JSON.parse(storedAuth) : { user: null, token: null };
    }
    return { user: null, token: null };
  });

  useEffect(() => {
    // Update localStorage when auth state changes
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  const loginHook = (userData: User, token: string) => {
    setAuth({ user: userData, token });
  };

  const logoutHook = async () => {
    const yes = confirm("Are you sure you want to log Out");
    if (yes) {
      const response = await logoutByCookies();
      console.log("logout response", response);
      if (response.success) {
        localStorage.removeItem("auth");
        window.location.href = "/auth/login";
        // router.push("/login");
        // router.refresh();
      } else {
        return alert(
          response.message || "Failed to logout. Please try again."
        );
      }
    }
  };

  return {
    user: auth.user,
    token: auth.token,
    isLoggedIn: !!auth.token,
    loginHook,
    logoutHook,
  };
};
