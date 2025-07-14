import { useState, useEffect } from 'react';
import { auth } from '../services/firebase.ts';
import type { User } from '../types';
// Mock import for environments without the real Firebase SDK
type Auth = any;
type AuthUser = { uid: string; email: string | null; };

interface AuthState {
    user: User | null;
    loading: boolean;
}

export const useAuth = (): AuthState => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const onAuthStateChanged = (authUser: AuthUser | null) => {
            if (authUser) {
                setUser({ uid: authUser.uid, email: authUser.email });
            } else {
                setUser(null);
            }
            setLoading(false);
        };
        
        // This is the mock-compatible call
        const firebaseAuth = auth as Auth;
        const unsubscribe = firebaseAuth.onAuthStateChanged(onAuthStateChanged);

        return () => {
            unsubscribe();
        };
    }, []);

    return { user, loading };
};