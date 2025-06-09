class AuthService {
  API_URL = "";

  constructor() {
    this.API_URL = `${process.env.API_BASE_URL}/auth`;
  }

  getToken() {
    const token = localStorage.getItem("token");
    return token;
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  async generateToken(email, password) {
    const response = await fetch(`${this.API_URL}/generate-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: email, password: password }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate token");
    }

    const { message, token, user } = await response.json();

    if (!token) {
      throw new Error(message || "Token generation failed");
    }

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return token;
  }

  async getUser() {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }

    const token = this.getToken();
    if (!token) {
      throw new Error("No token found");
    }

    const response = await fetch(`${this.API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    return response.json();
  }
}

export default AuthService;
