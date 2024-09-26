import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";
import toast, { Toaster } from "react-hot-toast";
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress from Material-UI
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { setUser, setToken } = useStateContext();
    const [loading, setLoading] = useState(false); // State for loading indicator
    const [showPassword, setShowPassword] = useState(false); // State for password visibility

    const handleSubmit = async (event) => {
        event.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (!email || !password) {
            toast.error("Please enter both email and password.");
            return;
        }

        setLoading(true); // Set loading to true when form is submitted

        try {
            const { data } = await axiosClient.post('/login', { email, password });
            setUser(data.user);
            setToken(data.token);
        } catch (error) {
            const response = error.response;
            console.error(response);
            if (response && response.status === 422) {
                toast.error(response.data.message);
            } else {
                toast.error("Failed to login. Please try again later.");
            }
        } finally {
            setLoading(false); // Reset loading state after request completes
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="auth-section">
            <div className="login-signup-form animated fadeInDown">
                <div className="form">
                    <img src="./images/logo/logo_white.png" style={{ width: '185px' }} alt="technox logo" />
                    <h1 className="title">Login</h1>
                    <Toaster />
                    <form onSubmit={handleSubmit}>
                        <input ref={emailRef} type="email" placeholder="Email" required />
                        <div style={{ position: 'relative' }}>
                            <input
                                ref={passwordRef}
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    outline: 'none',
                                }}
                            >
                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </button>
                        </div>
                        <button className="btn btn-block" type="submit" disabled={loading} style={{ height: '50px' }}>
                            {loading ? <CircularProgress size={24} /> : 'Login'}
                        </button>
                        <p className="message">
                            Not Registered? <Link to='/register'>Create a new account</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}