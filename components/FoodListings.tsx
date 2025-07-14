import React, { useState, useEffect } from 'react';
import { database } from '../services/firebase.ts';
import type { FoodItem, User } from '../types';
import FoodCard from './FoodCard';
import Spinner from './Spinner';
import { ref, onValue, off } from 'firebase/database';



interface FoodListingsProps {
    user: User | null;
}

const FoodListings: React.FC<FoodListingsProps> = ({ user }) => {
    const [foods, setFoods] = useState<FoodItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const foodsRef = ref(database, 'foods');

        // const unsubscribe = onValue(foodsRef, (snapshot) => {
        onValue(foodsRef, (snapshot) => {
            const data = snapshot.val();
            const foodList: FoodItem[] = [];

            if (data) {
                for (const id in data) {
                    foodList.push({ id, ...data[id] });
                }
            }

            // Sort: unclaimed first, then newest
            foodList.sort((a, b) => {
                if (a.claimed !== b.claimed) {
                    return a.claimed ? 1 : -1;
                }
                return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
            });

            setFoods(foodList);
            setLoading(false);
        });

        return () => off(foodsRef); // Unsubscribe listener manually
    }, []);


    return (
        <section id="donations" className="py-16 sm:py-20 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Available Food Donations</h2>
                {loading ? (
                    <div className="flex justify-center">
                        <Spinner />
                    </div>
                ) : foods.length === 0 ? (
                    <p className="text-center text-gray-600">No food donations available at the moment. Be the first to add one!</p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {foods.map((food) => (
                            <FoodCard key={food.id} food={food} user={user} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default FoodListings;
