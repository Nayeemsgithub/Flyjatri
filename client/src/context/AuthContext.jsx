import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

  useEffect(() => {
    const token = localStorage.getItem('flyjatri_token');
    const savedUser = localStorage.getItem('flyjatri_user');
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('flyjatri_user');
        localStorage.removeItem('flyjatri_token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authService.login({ email, password });
      if (response.data.success) {
        setUser(response.data.user);
        localStorage.setItem('flyjatri_token', response.data.token);
        localStorage.setItem('flyjatri_user', JSON.stringify(response.data.user));
        setAuthModalOpen(false);
        return { success: true };
      }
    } catch (err) {
      return { 
        success: false, 
        message: err.response?.data?.message || 'Login failed. Please check your credentials.' 
      };
    }
  };

  const register = async (name, email, password, phone) => {
    try {
      const response = await authService.register({ name, email, password, phone });
      if (response.data.success) {
        setUser(response.data.user);
        localStorage.setItem('flyjatri_token', response.data.token);
        localStorage.setItem('flyjatri_user', JSON.stringify(response.data.user));
        setAuthModalOpen(false);
        return { success: true };
      }
    } catch (err) {
      return { 
        success: false, 
        message: err.response?.data?.message || 'Registration failed. Please try again.' 
      };
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await authService.updateProfile(profileData);
      if (response.data.success) {
        const updated = { ...user, ...response.data.user };
        setUser(updated);
        localStorage.setItem('flyjatri_user', JSON.stringify(updated));
        return { success: true, message: response.data.message || 'Profile updated successfully!' };
      }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Failed to update profile. Please try again.'
      };
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const response = await authService.changePassword({ currentPassword, newPassword });
      return { success: true, message: response.data.message || 'Password updated successfully!' };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Failed to update password. Verify current password.'
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('flyjatri_token');
    localStorage.removeItem('flyjatri_user');
  };

  const openLoginModal = () => {
    setAuthMode('login');
    setAuthModalOpen(true);
  };

  const openRegisterModal = () => {
    setAuthMode('register');
    setAuthModalOpen(true);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      authModalOpen,
      setAuthModalOpen,
      authMode,
      setAuthMode,
      login,
      register,
      updateProfile,
      changePassword,
      logout,
      openLoginModal,
      openRegisterModal
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
