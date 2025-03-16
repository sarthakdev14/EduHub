import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const webinarTitle = searchParams.get("title") || "Webinar Registration";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        ...formData,
        webinarTitle,
      });

      if (response.status === 201) {
        setSuccess("Registration successful! Check your email for confirmation.");
      }
    } catch (error) {
      setSuccess("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-primary mb-6">
          {webinarTitle}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="w-full bg-primary text-white p-3 rounded-md font-semibold hover:bg-secondary transition-all"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register Now"}
          </button>
        </form>

        {success && (
          <p className="mt-4 text-center text-sm font-medium text-gray-600">
            {success}
          </p>
        )}
      </div>
    </div>
  );
};

export default Register;
