import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onIdTokenChanged, // Use this to listen for token changes
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore'; 
import { auth, googleProvider, db } from '@/lib/firebase'; 
import { useToast } from '@/hooks/use-toast';

// The URL for your FastAPI backend
const API_URL = 'http://127.0.0.1:8000';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password:string, name: string) => Promise<User | null>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // onIdTokenChanged is more robust than onAuthStateChanged for session management
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const token = await user.getIdToken();

        // Send the token to the backend to set the session cookie
        try {
          await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
          });
        } catch (error) {
          console.error("Failed to set session cookie:", error);
          // Handle error appropriately, maybe log the user out
        }

      } else {
        setUser(null);
        // On sign out, ensure the backend session is also cleared
        try {
          await fetch(`${API_URL}/api/auth/logout`, { method: 'POST' });
        } catch (error) {
          console.error("Failed to clear session cookie:", error);
        }
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  
  const signUp = async (email: string, password: string, name: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      if (name && result.user) {
        await updateProfile(result.user, { displayName: name });
      }

      if (result.user) {
        const userDocRef = doc(db, 'users', result.user.uid);
        await setDoc(userDocRef, {
          uid: result.user.uid,
          email: result.user.email,
          displayName: name,
          createdAt: new Date(),
          age: null,
          dob: null,
          education: [],
          experience: [],
          interests: [],
          interestedFields: [],
          blacklistedFields: [],
          profileComplete: false,
        });
      }

      toast({
        title: "Welcome to North Star!",
        description: "Your account has been created successfully.",
      });
      return result.user;
    } catch (error: any) {
      toast({
        title: "Sign Up Failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      
      const userDocRef = doc(db, 'users', result.user.uid);
      const docSnap = await getDoc(userDocRef);

      if (!docSnap.exists()) {
        await setDoc(userDocRef, {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          createdAt: new Date(),
          age: null,
          dob: null,
          education: [],
          experience: [],
          interests: [],
          interestedFields: [],
          blacklistedFields: [],
          profileComplete: false,
        });
      }

      toast({
        title: "Welcome to North Star!",
        description: "You have been signed in with Google.",
      });
    } catch (error: any) {
      toast({
        title: "Google Sign In Failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Welcome back!",
        description: "You have been signed in successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Sign In Failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      // This will trigger the onIdTokenChanged listener, which handles backend logout
      await signOut(auth); 
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Sign Out Failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};