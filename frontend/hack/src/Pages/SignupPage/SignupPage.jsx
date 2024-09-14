import React from "react";
import "./SignupPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
    const navigate = useNavigate();
    const [form, setForm] = React.useState({ username: "", email: "", password: "" });
    const [error, setError] = React.useState("");  // State for error messages

    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    React.useEffect(() => {
        console.log(form);
    }, [form]);

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            // Signup API Call
            const response = await axios.post("http://localhost:8000/signup", form, { withCredentials: true });
            if (!response.error) {
                // Navigate to login page on successful signup
                navigate("/");
            } else {
                // Handle non-successful responses here
                setError("Signup failed. Please try again.");
            }
        } catch (error) {
            // Handle error responses here
            setError("An error occurred. Please try again.");
            console.error("Signup error:", error);
        }
    }

    return (
        <div className="signuppage">
            <form onSubmit={handleSubmit}>
                <h1>Signup Page</h1>
                <input
                    onChange={handleChange}
                    type="text"
                    name="username"
                    placeholder="Name"
                    value={form.username}
                    required
                />
                <input
                    onChange={handleChange}
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    required
                />
                <input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    required
                />
                <button type="submit">Create Account</button>
                {error && <p className="error-message">{error}</p>}  {/* Display error messages */}
                <h4>Already have an account? <a href="/login">Login</a>.</h4>
            </form>
        </div>
    );
}
