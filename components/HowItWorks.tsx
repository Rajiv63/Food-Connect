import React from 'react';
import { Icon, type IconName } from './Icon';

const InfoCard: React.FC<{ icon: IconName; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="text-center p-6 rounded-xl shadow-lg bg-white transition-transform transform hover:-translate-y-2">
        <div className="bg-emerald-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-5 text-emerald-600">
            <Icon name={icon} className="w-12 h-12" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600">{children}</p>
    </div>
);

const HowItWorks: React.FC = () => {
    return (
        <section className="py-16 sm:py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How Food Connect Works</h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <InfoCard icon="Restaurant" title="1. List Surplus Food">
                        Restaurants and grocery stores list surplus food that would otherwise go to waste.
                    </InfoCard>
                    <InfoCard icon="Bell" title="2. Get Matched">
                        Our system matches donations with nearby shelters and food banks automatically.
                    </InfoCard>
                    <InfoCard icon="Truck" title="3. Coordinate Pickup">
                        Volunteers pick up and deliver the food to those in need, ensuring it reaches them fresh.
                    </InfoCard>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
