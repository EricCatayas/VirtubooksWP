class AuthService {
  API_URL = "";

  constructor() {
    this.API_URL = `${process.env.API_BASE_URL}/auth`;
  }

  setToken(token) {
    if (token) {
      localStorage.setItem("token", token);
    }
  }
  setUser(user) {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }

  getToken() {
    const token = localStorage.getItem("token");
    return token;
  }

  isLoggedIn() {
    const token = this.getToken();
    return !!token;
  }

  async logout() {
    const response = await fetch(`/wp-json/virtubooks/v1/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  async login(email, password, remember = false) {
    const response = await fetch(`/wp-json/virtubooks/v1/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_login: email,
        user_password: password,
        remember: remember,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }
    return;
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
      const data = await response.json();
      throw new Error(data.message || "Failed to generate token");
    }

    const { message, token, user } = await response.json();

    if (!token) {
      throw new Error(message || "Token generation failed");
    }
    this.setToken(token);
    this.setUser(user);

    return token;
  }

  async getUser() {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }

    const token = this.getToken();
    if (!token) {
      return undefined;
    }

    const response = await fetch(`${this.API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to fetch user data");
    }
    const userData = await response.json();
    localStorage.setItem("user", JSON.stringify(userData));
    return userData;
  }
}

export default AuthService;
