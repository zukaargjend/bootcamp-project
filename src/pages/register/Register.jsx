import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("/auth/register", credentials);
      navigate("/login");
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="rContainer">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            id="username"
            value={credentials.username}
            onChange={handleChange}
            className="rInput"
            required
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={credentials.password}
            onChange={handleChange}
            className="rInput"
            required
          />
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={credentials.email}
            onChange={handleChange}
            className="rInput"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="rButton"
          >
            {loading ? "Loading..." : "Register"}
          </button>
          {error && <span className="rError">{error}</span>}
        </form>
      </div>
    </div>
  );
};

export default Register;
