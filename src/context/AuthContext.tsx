import React, { createContext, useContext, useState, useEffect } from "react";
import {
  auth,
  firestore,
  googleProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  firebaseUpdateProfile,
  signInWithPopup,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  updateDoc,
  type FirebaseUser,
} from "../firebase/firebase";

export type UserType = "guest" | "host";
export type HostType = "vendor" | "hotel-owner";

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
  login: (
    email: string,
    password: string,
    userType: UserType,
    hostType?: HostType
  ) => Promise<void>;
  loginWithGoogle: (userType: UserType, hostType?: HostType) => Promise<void>;
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Listen to Firebase auth state and sync user profile from Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (fbUser: FirebaseUser | null) => {
        if (!fbUser) {
          setUser(null);
          localStorage.removeItem("jharkhand_user");
          setIsLoading(false);
          return;
        }

        // Load user doc from Firestore
        try {
          const userDocRef = doc(firestore, "users", fbUser.uid);
          const userSnap = await getDoc(userDocRef as any);
          if (userSnap.exists()) {
            const data = userSnap.data() as any;
            const appUser: User = {
              id: fbUser.uid,
              name: data.name || fbUser.displayName || "",
              email: fbUser.email || "",
              userType: data.userType || "guest",
              hostType: data.hostType,
              avatar: data.avatar || fbUser.photoURL || undefined,
              phone: data.phone || undefined,
              joinedDate: data.joinedDate || new Date().toISOString(),
              location: data.location,
              bio: data.bio,
              totalBookings: data.totalBookings,
              totalSpent: data.totalSpent,
              favoriteDestinations: data.favoriteDestinations,
              totalListings: data.totalListings,
              totalEarnings: data.totalEarnings,
              rating: data.rating,
              isVerified: data.isVerified,
              storeName: data.storeName,
              storeDescription: data.storeDescription,
              propertyName: data.propertyName,
              propertyType: data.propertyType,
              roomCount: data.roomCount,
            };

            setUser(appUser);
            localStorage.setItem("jharkhand_user", JSON.stringify(appUser));
          } else {
            // No user doc — create a minimal doc
            const createdAt = serverTimestamp();
            await setDoc(doc(firestore, "users", fbUser.uid), {
              name: fbUser.displayName || "",
              email: fbUser.email || "",
              userType: "guest",
              joinedDate: createdAt,
              avatar: fbUser.photoURL || null,
            });

            const appUser: User = {
              id: fbUser.uid,
              name: fbUser.displayName || "",
              email: fbUser.email || "",
              userType: "guest",
              joinedDate: new Date().toISOString(),
              avatar: fbUser.photoURL || undefined,
            };

            setUser(appUser);
            localStorage.setItem("jharkhand_user", JSON.stringify(appUser));
          }
        } catch (err) {
          console.error("Failed to load user profile from Firestore", err);
        }

        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const login = async (
    email: string,
    password: string,
    userType: UserType,
    hostType?: HostType
  ) => {
    setIsLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const uid = cred.user.uid;
      // Optionally ensure user doc exists
      const userDocRef = doc(firestore, "users", uid);
      const now = serverTimestamp();
      // Build payload without undefined fields to avoid Firestore errors
      const payload: any = { email, userType, joinedDate: now };
      if (hostType !== undefined) payload.hostType = hostType;
      await setDoc(userDocRef, payload, { merge: true });
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (userType: UserType, hostType?: HostType) => {
    setIsLoading(true);
    try {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const fbUser = result.user;
        const userDocRef = doc(firestore, "users", fbUser.uid);
        const userData: any = {
          name: fbUser.displayName,
          email: fbUser.email,
          avatar: fbUser.photoURL,
          userType,
          joinedDate: serverTimestamp(),
        };
        if (userType === "host" && hostType !== undefined)
          userData.hostType = hostType;
        await setDoc(userDocRef, userData, { merge: true });
      } catch (err: any) {
        // Popup may fail due to Cross-Origin-Opener-Policy / COOP or popup blocking.
        // Fallback to redirect-based sign-in which works in stricter environments.
        console.warn(
          "signInWithPopup failed, falling back to redirect:",
          err?.code || err?.message || err
        );
        // Use redirect flow; this will navigate away and finish auth on return.
        // Import signInWithRedirect from firebase/auth dynamically to avoid adding to top-level imports.
        const { signInWithRedirect } = await import("firebase/auth");
        await signInWithRedirect(auth, googleProvider);
        return; // redirect will reload the app; nothing more to do here
      }
    } finally {
      setIsLoading(false);
    }
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
    try {
      const cred = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      const uid = cred.user.uid;
      const docRef = doc(firestore, "users", uid);
      const payload: any = {
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        phone: userData.phone,
        userType: userData.userType,
        joinedDate: serverTimestamp(),
        avatar: null,
      };
      if (userData.hostType !== undefined) payload.hostType = userData.hostType;
      await setDoc(docRef, payload, { merge: true });
      // Update Firebase displayName
      try {
        await firebaseUpdateProfile(cred.user, { displayName: payload.name });
      } catch (e) {
        // non-fatal
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    localStorage.removeItem("jharkhand_user");
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;
    const userDocRef = doc(firestore, "users", user.id);
    await updateDoc(userDocRef as any, updates as any);
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem("jharkhand_user", JSON.stringify(updatedUser));
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    loginWithGoogle,
    signup,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
