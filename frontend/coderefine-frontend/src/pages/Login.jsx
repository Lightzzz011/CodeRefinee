import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // TODO: Replace with backend API call
    const fakeToken = "demo-jwt-token";
    localStorage.setItem("token", fakeToken);

    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-100">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-xl p-8 flex flex-col gap-6"
      >
        <h1 className="text-2xl font-bold">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-emerald-500 hover:bg-emerald-400 text-gray-900 font-semibold py-2 rounded-lg"
        >
          Login
        </button>

        <p className="text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-emerald-400">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
