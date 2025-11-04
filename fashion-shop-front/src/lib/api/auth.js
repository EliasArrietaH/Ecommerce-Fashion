const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const authApi = {
  register: async (data) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al registrar usuario");
    }

    return response.json();
  },

  login: async (data) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al iniciar sesión");
    }

    return response.json();
  },
};
