import React from 'react';

interface HeroProps {
  onGetStartedClick: () => void;
  isLoggedIn: boolean;
}

const Hero: React.FC<HeroProps> = ({ onGetStartedClick, isLoggedIn }) => {
    return (
        <section className="gradient-bg text-white">
            <div className="container mx-auto px-4 py-20 md:py-28 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 !leading-tight">Connecting Surplus Food With Those In Need</h2>
                    <p className="text-lg md:text-xl mb-8 opacity-90">Help reduce food waste in our community by connecting restaurants with surplus food to local shelters and food banks.</p>
                    <button 
                        onClick={onGetStartedClick}
                        className="px-8 py-4 bg-white text-emerald-600 rounded-lg font-bold text-lg shadow-xl hover:bg-emerald-50 transform hover:scale-105 transition-all duration-300 ease-in-out"
                    >
                        {isLoggedIn ? 'Donate Food Now' : 'Get Started'}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
