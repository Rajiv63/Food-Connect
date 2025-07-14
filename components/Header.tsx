import React from 'react';
import { auth } from '../services/firebase';
import type { User } from '../types';

interface HeaderProps {
    user: User | null;
    onLoginClick: () => void;
    onAddFoodClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLoginClick, onAddFoodClick }) => {
    
    const handleLogout = () => {
        auth.signOut().catch((error: any) => console.error("Logout Error:", error));
    };

    return (
        <header className="gradient-bg text-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center space-x-3">
                        <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b5197a2e-c970-48e9-bff3-ef41e9bfa46a.png" alt="Food Connect logo" className="rounded-full w-10 h-10 border-2 border-white/50" />
                        <h1 className="text-2xl font-bold tracking-tight">Food Connect</h1>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        {user ? (
                            <>
                                <span className="hidden sm:inline text-sm">Welcome, {user.email}</span>
                                <button onClick={onAddFoodClick} className="px-4 py-2 bg-white text-emerald-600 rounded-lg font-semibold text-sm hover:bg-emerald-50 transition-colors shadow">Add Food</button>
                                <button onClick={handleLogout} className="px-4 py-2 border-2 border-white text-white rounded-lg font-semibold text-sm hover:bg-white hover:text-emerald-600 transition-colors">Logout</button>
                            </>
                        ) : (
                            <>
                                <button onClick={onLoginClick} className="px-4 py-2 bg-white text-emerald-600 rounded-lg font-semibold text-sm hover:bg-emerald-50 transition-colors shadow">Login/Register</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;