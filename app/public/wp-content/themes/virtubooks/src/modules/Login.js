import AuthService from "../services/authService.js";

class Login {
  constructor() {
    this.init();
  }

  init() {
    const loginForm = document.getElementById("login-form");
    const logoutButton = document.getElementById("logout-button");
    if (loginForm) {
      loginForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;
        const remember = document.getElementById("login-remember").checked;
        const errorDiv = document.getElementById("login-error");
        errorDiv.style.display = "none";

        // Call WordPress login API
        try {
          const wpResponse = await fetch(`/wp-json/virtubooks/v1/login`, {
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
          const wpData = await wpResponse.json();
          if (!wpResponse.ok) {
            throw new Error(wpData.message || "Login failed");
          }

          // If successful, call AuthService.generateToken
          const authService = new AuthService();
          await authService.generateToken(email, password);

          // Redirect to home page
          window.location.href = "/";
        } catch (err) {
          errorDiv.textContent = err.message;
          errorDiv.style.display = "block";
        }
      });
    }
    if (logoutButton) {
      logoutButton.addEventListener("click", async function (e) {
        try {
          // Clear token from localStorage
          const authService = new AuthService();
          authService.logout();
          // Redirect to home page
          window.location.href = "/";
        } catch (err) {
          console.error("Logout failed:", err);
        }
      });
    }
  }
}

export default Login;
