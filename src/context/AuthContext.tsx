
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string, remember?: boolean) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  socialLogin: (provider: 'facebook' | 'gmail' | 'twitter') => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check local storage for user data on initial load
    const storedUser = localStorage.getItem('currentUser');
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse stored user data', error);
        localStorage.removeItem('currentUser');
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, remember: boolean = false): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any email with valid format and password longer than 5 chars
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      const isValidPassword = password.length >= 6;
      
      if (!isValidEmail || !isValidPassword) {
        toast.error("Invalid email or password");
        return false;
      }
      
      // Create fake user data
      const user: User = {
        id: `user-${Date.now()}`,
        name: email.split('@')[0],
        email: email
      };
      
      setCurrentUser(user);
      
      // Store in localStorage if remember is checked
      if (remember) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
      
      toast.success("Logged in successfully!");
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast.error("Login failed. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any email with valid format and password longer than 5 chars
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      const isValidPassword = password.length >= 6;
      
      if (!isValidEmail || !isValidPassword) {
        toast.error("Please provide a valid email and a password of at least 6 characters");
        return false;
      }
      
      // Create fake user data
      const user: User = {
        id: `user-${Date.now()}`,
        name: name || email.split('@')[0],
        email: email
      };
      
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      toast.success("Account created successfully!");
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast.error("Registration failed. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    toast.success("Logged out successfully");
  };
  
  const socialLogin = async (provider: 'facebook' | 'gmail' | 'twitter'): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create fake user data based on provider
      let name, email;
      
      switch (provider) {
        case 'facebook':
          name = 'Facebook User';
          email = 'user@facebook.com';
          break;
        case 'gmail':
          name = 'Gmail User';
          email = 'user@gmail.com';
          break;
        case 'twitter':
          name = 'Twitter User';
          email = 'user@twitter.com';
          break;
      }
      
      const user: User = {
        id: `${provider}-user-${Date.now()}`,
        name,
        email,
        avatar: '/placeholder.svg'
      };
      
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      toast.success(`Logged in with ${provider} successfully!`);
      return true;
    } catch (error) {
      console.error(`${provider} login error:`, error);
      toast.error(`${provider} login failed. Please try again.`);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout,
    socialLogin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
