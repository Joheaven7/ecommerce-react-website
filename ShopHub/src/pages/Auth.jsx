import React, { useContext, useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mode, setMode] = useState("signup");
  const { signUp, login, user } = useContext(AuthContext);
  const [authError, setAuthError] = useState(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Set mode based on navigation state from navbar
  useEffect(() => {
    if (location.state?.mode) {
      setMode(location.state.mode);
    }
  }, [location.state]);

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      // Redirect to home page after successful login/signup
      navigate('/');
    }
  }, [user, navigate]);

  function onSubmit(data) {
    setAuthError(null);
    
    let result;
    if (mode === "signup") {
      result = signUp(data.email, data.password);
    } else {
      result = login(data.email, data.password);
    }
    
    if (!result.success) {
      setAuthError(result.error);
    } else {
      reset(); // Clear form on successful auth
      // Navigation will happen automatically via the useEffect above
    }
  }

  const switchMode = (newMode) => {
    setMode(newMode);
    setAuthError(null);
    reset();
  };

  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          <h1 className="page-title">{mode === "signup" ? "Sign Up" : "Login"}</h1>

          {authError && (
            <div className="alert alert-error" style={{ color: 'red', marginBottom: '1rem' }}>
              {authError}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input 
                className="form-input" 
                type="email" 
                id="email"
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })} 
              />
              {errors.email && (
                <span className="form-error" style={{ color: 'red', fontSize: '0.875rem' }}>
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input 
                {...register("password", {
                  required: "Password is required", 
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  maxLength: {
                    value: 12,
                    message: "Password must be less than 12 characters",
                  },
                })}
                className="form-input" 
                type="password" 
                id="password"
              />
              {errors.password && (
                <span className="form-error" style={{ color: 'red', fontSize: '0.875rem' }}>
                  {errors.password.message}
                </span>
              )}
            </div>

            <button type="submit" className="btn btn-primary btn-large">
              {mode === "signup" ? "Sign Up" : "Login"}
            </button>
          </form>

          <div className="auth-switch" style={{ marginTop: '1rem' }}>
            {mode === "signup" ? (
              <p>
                Already have an Account? 
                <span 
                  className="auth-link" 
                  onClick={() => switchMode("login")}
                  style={{ color: 'blue', cursor: 'pointer', marginLeft: '0.5rem' }}
                >
                  Login
                </span>
              </p>
            ) : (
              <p>
                Don't have an Account? 
                <span 
                  className="auth-link" 
                  onClick={() => switchMode("signup")}
                  style={{ color: 'blue', cursor: 'pointer', marginLeft: '0.5rem' }}
                >
                  Sign Up
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;