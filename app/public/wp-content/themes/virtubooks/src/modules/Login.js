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
        const remember = true; //document.getElementById("login-remember").checked;
        const errorDiv = document.getElementById("login-error");
        errorDiv.style.display = "none";

        // Call WordPress login API
        try {
          const authService = new AuthService();
          await authService.login(email, password, remember);
          // If successful, generate token from backend
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
