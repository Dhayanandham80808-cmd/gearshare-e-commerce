import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const DEFAULT_USERS = [
  {
    id: "user-renter-1",
    name: "Kavya Patel",
    email: "kavya@gmail.com",
    role: "renter",
    phone: "+91 9876543210",
    city: "Bengaluru",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    verifiedId: true
  },
  {
    id: "user-lender-3",
    name: "Dhayanandham A.",
    email: "dhayanandham80808@gmail.com",
    role: "lender",
    phone: "+91 6383275813",
    city: "Puducherry",
    avatar: "/dhayanandham.jpg",
    verifiedId: true,
    linkedIn: "https://linkedin.com/in/dhayanandham-a-a39505323",
    github: "https://github.com/dhayanandham80808-cmd",
    education: "B.Tech in ECE, Sri Manakula Vinayagar Engineering College",
    bio: "Full Stack Developer, AI/ML Engineer & Filmmaker. Maintaining gear to pristine broadcast standards in Puducherry."
  },
  {
    id: "user-admin-1",
    name: "Administrator",
    email: "admin@gearshare.io",
    role: "admin",
    phone: "+91 9999900000",
    city: "HQ",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    verifiedId: true
  }
];

export const CREATOR_PROFILE = {
  name: "Dhayanandham A.",
  role: "Full Stack Developer & AI Engineer",
  education: "B.Tech in Electronics & Communication Engineering",
  institution: "Sri Manakula Vinayagar Engineering College, Puducherry",
  email: "dhayanandham80808@gmail.com",
  phone: "+91 6383275813",
  whatsapp: "+91 6383275813",
  linkedIn: "https://linkedin.com/in/dhayanandham-a-a39505323",
  github: "https://github.com/dhayanandham80808-cmd",
  location: "Puducherry, India",
  avatar: "/dhayanandham.jpg"
};

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('gearshare_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return DEFAULT_USERS[0]; // Default to renter
  });

  useEffect(() => {
    localStorage.setItem('gearshare_user', JSON.stringify(currentUser));
  }, [currentUser]);

  const switchUser = (role) => {
    const target = DEFAULT_USERS.find(u => u.role === role) || DEFAULT_USERS[0];
    setCurrentUser(target);
  };

  const loginWithEmail = async (email) => {
    try {
      const data = await api.login(email);
      if (data.user) {
        setCurrentUser(data.user);
        return { success: true };
      }
    } catch (err) {
      console.error(err);
      return { success: false, error: err.message };
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, switchUser, loginWithEmail, availableUsers: DEFAULT_USERS }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
