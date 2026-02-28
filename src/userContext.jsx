import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (nickname) => {
    const newUser = {
      nickname: nickname,
      balance: 10000,
      avatar: '/images/avatar.png',
      spent: 0,
      openedCases: 0,
      soldSkins: 0,
      inventory: []
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const updateUser = (updates) => {
    setUser(prev => {
      if (!prev) return prev;
      const updatedUser = { ...prev, ...updates };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const addSkinToInventory = (skin) => {
    setUser(prev => {
      if (!prev) return prev;
      const updatedUser = {
        ...prev,
        inventory: [...prev.inventory, skin]
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  return (
    <UserContext.Provider value={{ user, login, updateUser,addSkinToInventory }}>
      {children}
    </UserContext.Provider>
  );
}
export function useUser() {
  return useContext(UserContext);
}