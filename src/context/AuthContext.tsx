import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserType = 'guest' | 'host';
export type HostType = 'vendor' | 'hotel-owner';

export interface User {
  id: string;
  name: string;
  email: string;
  userType: UserType;
  hostType?: HostType; // Only for host users
  avatar?: string;
  phone?: string;
  joinedDate: string;
  location?: string;
  bio?: string;
  // Guest specific fields
  totalBookings?: number;
  totalSpent?: number;
  favoriteDestinations?: string[];
  // Host specific fields
  totalListings?: number;
  totalEarnings?: number;
  rating?: number;
  isVerified?: boolean;
  // Vendor specific fields (for marketplace)
  storeName?: string;
  storeDescription?: string;
  // Hotel Owner specific fields
  propertyName?: string;
  propertyType?: string; // hotel, resort, homestay, etc.
  roomCount?: number;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, userType: UserType, hostType?: HostType) => Promise<void>;
  signup: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    userType: UserType;
    hostType?: HostType;
  }) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for stored user on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('jharkhand_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('jharkhand_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, userType: UserType, hostType?: HostType) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock user data based on user type
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email,
      userType,
      joinedDate: new Date().toISOString(),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    };

    if (userType === 'guest') {
      mockUser.totalBookings = Math.floor(Math.random() * 10) + 1;
      mockUser.totalSpent = Math.floor(Math.random() * 50000) + 5000;
      mockUser.favoriteDestinations = ['Netarhat', 'Hundru Falls', 'Betla National Park'];
      mockUser.location = 'Ranchi, Jharkhand';
    } else {
      mockUser.totalListings = Math.floor(Math.random() * 25) + 1;
      mockUser.totalEarnings = Math.floor(Math.random() * 200000) + 10000;
      mockUser.rating = 4.0 + Math.random() * 1;
      mockUser.isVerified = Math.random() > 0.3;
      mockUser.location = 'Jharkhand, India';
      // Random host type for existing login
      mockUser.hostType = hostType || (Math.random() > 0.5 ? 'vendor' : 'hotel-owner');
      
      if (mockUser.hostType === 'vendor') {
        mockUser.storeName = `${mockUser.name}'s Crafts`;
        mockUser.storeDescription = 'Traditional Jharkhand handicrafts and tribal art';
      } else {
        mockUser.propertyName = `${mockUser.name}'s Lodge`;
        mockUser.propertyType = 'hotel';
        mockUser.roomCount = Math.floor(Math.random() * 20) + 5;
      }
    }

    setUser(mockUser);
    localStorage.setItem('jharkhand_user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const signup = async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    userType: UserType;
    hostType?: HostType;
  }) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock user creation
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      phone: userData.phone,
      userType: userData.userType,
      hostType: userData.hostType,
      joinedDate: new Date().toISOString(),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email}`,
      location: 'Ranchi, Jharkhand',
    };

    if (userData.userType === 'guest') {
      newUser.totalBookings = 0;
      newUser.totalSpent = 0;
      newUser.favoriteDestinations = [];
    } else {
      newUser.totalListings = 0;
      newUser.totalEarnings = 0;
      newUser.rating = 0;
      newUser.isVerified = false;
      
      if (userData.hostType === 'vendor') {
        newUser.storeName = `${userData.firstName}'s Store`;
        newUser.storeDescription = 'Traditional crafts and local products';
      } else if (userData.hostType === 'hotel-owner') {
        newUser.propertyName = `${userData.firstName}'s Property`;
        newUser.propertyType = 'homestay';
        newUser.roomCount = 3;
      }
    }

    setUser(newUser);
    localStorage.setItem('jharkhand_user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jharkhand_user');
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('jharkhand_user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    signup,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}