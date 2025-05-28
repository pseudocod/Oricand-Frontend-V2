import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/UserContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await register(data);
      navigate("/account");
    } catch (err) {
      console.error(err);
      setError("Registration failed. Try a different email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-md flex flex-col items-center">
        <h1 className="text-5xl font-extralight tracking-wide text-gray-900 mb-12">
          REGISTER
        </h1>

        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="firstName"
                className="text-base font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                value={data.firstName}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-xs shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="lastName"
                className="text-base font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                value={data.lastName}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-xs shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-base font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={data.email}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-xs shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="password"
                className="text-base font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={data.password}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-xs shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-black text-white font-medium rounded-xs hover:bg-white hover:text-black transition-all duration-500 cursor-pointer"
            >
              {loading ? "CREATING ACCOUNT..." : "REGISTER"}
            </button>
          </form>

          <div className="text-center mt-4">
            <Link
              to="/login"
              className="inline-block w-full text-center py-2 px-4 text-black font-medium rounded-xs bg-white hover:bg-black hover:text-white transition-all duration-500"
            >
              SIGN IN INSTEAD
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
