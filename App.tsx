import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
// import type { FoodItem, User } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import FoodListings from './components/FoodListings';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import AddFoodModal from './components/AddFoodModal';

const App: React.FC = () => {
    const { user, loading } = useAuth();
    const [isAuthModalOpen, setAuthModalOpen] = useState(false);
    const [isAddFoodModalOpen, setAddFoodModalOpen] = useState(false);

    const openAuthModal = () => setAuthModalOpen(true);
    const openAddFoodModal = () => setAddFoodModalOpen(true);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="w-16 h-16 border-4 border-emerald-500 border-dashed rounded-full animate-spin"></div>
            </div>
        );
    }
    
    return (
        <div className="bg-gray-50 text-gray-800">
            <Header user={user} onLoginClick={openAuthModal} onAddFoodClick={openAddFoodModal} />
            <main>
                <Hero onGetStartedClick={user ? openAddFoodModal : openAuthModal} isLoggedIn={!!user} />
                <HowItWorks />
                <FoodListings user={user} />
            </main>
            <Footer />

            {isAuthModalOpen && <AuthModal onClose={() => setAuthModalOpen(false)} />}
            {isAddFoodModalOpen && <AddFoodModal user={user} onClose={() => setAddFoodModalOpen(false)} />}
        </div>
    );
};

export default App;