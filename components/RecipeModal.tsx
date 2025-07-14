import React from 'react';
// The markdown-to-jsx library is loaded from a CDN in index.html
// We declare it here to satisfy TypeScript
declare const markdown: any;

import Spinner from './Spinner';
import { Icon } from './Icon';

interface RecipeModalProps {
    foodName: string;
    recipe: string | null;
    error: string | null;
    onClose: () => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ foodName, recipe, error, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 sm:p-8 max-w-2xl w-full relative transform transition-all">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                <div className="flex items-center space-x-3 mb-4">
                    <Icon name="Sparkles" className="w-8 h-8 text-blue-500"/>
                    <h3 className="text-2xl font-bold text-gray-800">AI Recipe Idea for {foodName}</h3>
                </div>
                <div className="max-h-[60vh] overflow-y-auto pr-4 -mr-4 text-gray-700">
                    {recipe && (
                        <div className="prose">
                            {markdown(recipe)}
                        </div>
                    )}
                    {error && (
                         <div className="text-red-500 bg-red-100 p-3 rounded-md text-sm">{error}</div>
                    )}
                    {!recipe && !error && (
                        <div className="flex flex-col items-center justify-center p-8">
                            <Spinner />
                            <p className="mt-4 text-gray-600">Generating your recipe with Gemini AI...</p>
                        </div>
                    )}
                </div>
                 <div className="mt-6 pt-4 border-t border-gray-200 text-right">
                    <button onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecipeModal;