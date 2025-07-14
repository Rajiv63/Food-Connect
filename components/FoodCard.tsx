import React, { useState } from 'react';
import { database } from '../services/firebase';
import { getRecipeSuggestion } from '../services/geminiService';
import type { FoodItem, User } from '../types';
import { Icon } from './Icon';
import Spinner from './Spinner';
import RecipeModal from './RecipeModal';
import { ref, update } from 'firebase/database';

// Mock imports for Firebase SDK
// const ref = (db: any, path: string) => db.ref(path);
// const update = (ref: any, data: any) => ref.update(data);


interface FoodCardProps {
    food: FoodItem;
    user: User | null;
}

const FoodCard: React.FC<FoodCardProps> = ({ food, user }) => {
    const [isClaiming, setIsClaiming] = useState(false);
    const [isGeneratingRecipe, setIsGeneratingRecipe] = useState(false);
    const [recipe, setRecipe] = useState<string | null>(null);
    const [recipeError, setRecipeError] = useState<string | null>(null);
    const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);

    const isOwner = user?.email === food.postedBy;
    const canClaim = user && !food.claimed && !isOwner;

    const handleClaim = async () => {
        if (!canClaim) return;

        const isConfirmed = window.confirm(`Are you sure you want to claim "${food.name}"?`);
        if (isConfirmed) {
            setIsClaiming(true);
            const foodRef = ref(database, `foods/${food.id}`);
            try {
                await update(foodRef, {
                    claimed: true,
                    claimedBy: user.email
                });
            } catch (error) {
                console.error("Error claiming food:", error);
                alert("Failed to claim food. Please try again.");
            } finally {
                setIsClaiming(false);
            }
        }
    };
    
    const handleGetRecipe = async () => {
        setIsGeneratingRecipe(true);
        setRecipe(null);
        setRecipeError(null);
        try {
            const generatedRecipe = await getRecipeSuggestion(food);
            setRecipe(generatedRecipe);
            setIsRecipeModalOpen(true);
        } catch (error) {
            setRecipeError("Failed to generate recipe.");
        } finally {
            setIsGeneratingRecipe(false);
        }
    };
    
    const timeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " years ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " minutes ago";
        return Math.floor(seconds) + " seconds ago";
    };

    return (
        <>
            <div className={`bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 ${food.claimed ? 'opacity-60' : ''}`}>
                <div className="h-48 bg-emerald-100 flex items-center justify-center p-4">
                     <img src={`https://picsum.photos/seed/${food.id}/400/300`} alt={food.name} className="w-full h-full object-cover rounded-lg"/>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                    {food.claimed && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Claimed</div>
                    )}
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{food.name}</h3>
                    <p className="text-gray-600 mb-4 text-sm flex-grow">{food.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div className="flex items-center space-x-2">
                             <Icon name="Users" className="w-4 h-4 text-gray-500"/>
                            <div>
                                <span className="block text-xs text-gray-500">Quantity</span>
                                <span className="font-medium">{food.quantity} servings</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Icon name="Calendar" className="w-4 h-4 text-gray-500"/>
                            <div>
                                <span className="block text-xs text-gray-500">Expires</span>
                                <span className="font-medium">{food.expiry}</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 col-span-2">
                            <Icon name="Location" className="w-4 h-4 text-gray-500"/>
                            <div>
                                <span className="block text-xs text-gray-500">Location</span>
                                <span className="font-medium">{food.location}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-auto pt-4 border-t border-gray-200">
                        <div className="flex flex-col space-y-2">
                            <button
                                onClick={handleClaim}
                                disabled={!canClaim || isClaiming}
                                className={`w-full px-4 py-2 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center space-x-2 ${
                                    canClaim ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                            >
                                {isClaiming && <Spinner size="small" />}
                                <span>{food.claimed ? 'Claimed' : (isOwner ? 'Your Donation' : 'Claim Food')}</span>
                            </button>
                             <button
                                onClick={handleGetRecipe}
                                disabled={isGeneratingRecipe}
                                className="w-full px-4 py-2 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center space-x-2 bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300"
                            >
                                {isGeneratingRecipe ? <Spinner size="small" /> : <Icon name="Sparkles" className="w-4 h-4" />}
                                <span>Get Recipe Idea</span>
                            </button>
                        </div>
                         <p className="text-xs text-gray-400 text-center mt-3">Posted {timeAgo(food.postedAt)}</p>
                    </div>
                </div>
            </div>
            {isRecipeModalOpen && (
                <RecipeModal
                    foodName={food.name}
                    recipe={recipe}
                    error={recipeError}
                    onClose={() => setIsRecipeModalOpen(false)}
                />
            )}
        </>
    );
};

export default FoodCard;