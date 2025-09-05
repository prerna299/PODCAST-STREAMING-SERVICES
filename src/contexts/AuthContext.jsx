import { createContext, useState, useContext, useEffect } from 'react';

// Create authentication context
const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Get initial state from localStorage (if available)
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('podcastUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Save user to localStorage when it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('podcastUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('podcastUser');
    }
  }, [currentUser]);

  // Mock user data - in a real app, this would come from a database
  const users = [
    { id: 1, email: "user@example.com", password: "password123", name: "Demo User" },
    { id: 2, email: "admin@example.com", password: "admin123", name: "Admin User" }
  ];

  const login = async (email, password) => {
    setLoading(true);
    setError("");
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = users.find(user => user.email === email && user.password === password);
      
      if (user) {
        // Don't include password in the stored user object
        const { password, ...userWithoutPassword } = user;
        setCurrentUser(userWithoutPassword);
        return true;
      } else {
        setError("Invalid email or password");
        return false;
      }
    } catch (err) {
      setError("Failed to login. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    setError("");
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      if (users.some(user => user.email === email)) {
        setError("Email already in use");
        return false;
      }
      
      // In a real app, this would add the user to a database
      const newUser = {
        id: users.length + 1,
        email,
        name,
        // In a real app, password would be hashed
      };
      
      users.push({...newUser, password});
      setCurrentUser(newUser);
      return true;
    } catch (err) {
      setError("Failed to create an account. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};