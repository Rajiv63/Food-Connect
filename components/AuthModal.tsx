import React, { useState } from 'react';
import {auth} from "../services/firebase.ts"
import Spinner from './Spinner';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// Mock imports for Firebase SDK
// const createUserWithEmailAndPassword = (auth: any, email: string, pass: string) => auth.createUserWithEmailAndPassword(email, pass);
// const signInWithEmailAndPassword = (auth: any, email: string, pass: string) => auth.signInWithEmailAndPassword(email, pass);

interface AuthModalProps {
    onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isLoginMode) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
            onClose();
        } catch (err: any) {
            setError(err.message || "An unknown error occurred.");
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = () => {
        setIsLoginMode(!isLoginMode);
        setError(null);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 sm:p-8 max-w-md w-full relative">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">&times;</button>
                <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">{isLoginMode ? 'Login' : 'Register'}</h3>
                {error && <div className="text-red-500 bg-red-100 p-3 rounded-md mb-4 text-sm">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2 font-medium" htmlFor="authEmail">Email</label>
                        <input type="email" id="authEmail" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition" required />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2 font-medium" htmlFor="authPassword">Password</label>
                        <input type="password" id="authPassword" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition" required minLength={6} />
                    </div>
                    <button type="submit" disabled={loading} className="w-full px-4 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition flex items-center justify-center disabled:bg-emerald-400">
                        {loading ? <Spinner size="small" /> : (isLoginMode ? 'Login' : 'Register')}
                    </button>
                </form>
                <p className="text-center mt-6 text-sm text-gray-600">
                    {isLoginMode ? "Don't have an account?" : "Already have an account?"}
                    <button onClick={toggleMode} className="ml-1 text-emerald-600 font-semibold hover:underline">
                        {isLoginMode ? 'Register' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthModal;