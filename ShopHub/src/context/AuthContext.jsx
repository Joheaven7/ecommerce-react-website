import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({children}) {
  const [user, setUser] = useState(null);

  function signUp(email, password) {
    // Parse existing users or initialize empty array
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
      return {success: false, error: "Email already exists"};
    }

    // Add new user
    const newUser = {email, password};
    users.push(newUser);
    
    // Save to localStorage
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUserEmail", email);
    
    // Update state
    setUser({email});
    
    return {success: true};
  }

  function login(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Find user with matching email and password
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      localStorage.setItem("currentUserEmail", email);
      setUser({email});
      return {success: true};
    } else {
      return {success: false, error: "Invalid email or password"};
    }
  }

  function logout() {
    localStorage.removeItem("currentUserEmail");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{signUp, login, logout, user}}>
      {children}
    </AuthContext.Provider>
  );
}