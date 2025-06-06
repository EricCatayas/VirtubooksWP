class AuthService {
  API_URL = "";

  constructor() {
    this.API_URL = `${process.env.API_BASE_URL}/auth`;
  }

  getToken() {
    const token = localStorage.getItem("token");
    return token;
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

    const { message, token } = response.json();
    if (!token) {
      throw new Error(message || "Token generation failed");
    }

    localStorage.setItem("token", token);

    return token;
  }
}

export default AuthService;
