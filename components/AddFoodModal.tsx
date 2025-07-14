import React, { useState } from 'react';
import { database } from '../services/firebase';
import type { User } from '../types';
import Spinner from './Spinner';
import { ref, push } from 'firebase/database';

// Mock imports for Firebase SDK
// const ref = (db: any, path: string) => db.ref(path);
// const push = (ref: any, data: any) => ref.push(data);


interface AddFoodModalProps {
    user: User | null;
    onClose: () => void;
}

const AddFoodModal: React.FC<AddFoodModalProps> = ({ user, onClose }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [expiry, setExpiry] = useState('');
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            setError("You must be logged in to add food.");
            return;
        }

        setLoading(true);
        setError(null);

        const foodData = {
            name,
            description,
            quantity,
            expiry,
            location,
            postedBy: user.email,
            postedAt: new Date().toISOString(),
            claimed: false,
            claimedBy: null
        };

        try {
            await push(ref(database, 'foods'), foodData);
            onClose();
        } catch (err: any) {
            setError(err.message || "Failed to add donation.");
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 sm:p-8 max-w-lg w-full relative">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">&times;</button>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Add Food Donation</h3>
                {error && <div className="text-red-500 bg-red-100 p-3 rounded-md mb-4 text-sm">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 mb-1 font-medium">Food Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 mb-1 font-medium">Description</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" rows={3} required></textarea>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1 font-medium">Quantity (servings)</label>
                            <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg" min="1" required />
                        </div>
                         <div>
                            <label className="block text-gray-700 mb-1 font-medium">Expiry Date</label>
                            <input type="date" value={expiry} onChange={(e) => setExpiry(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required />
                        </div>
                         <div className="md:col-span-2">
                            <label className="block text-gray-700 mb-1 font-medium">Pickup Location</label>
                            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="e.g., Downtown Community Kitchen" required />
                        </div>
                    </div>
                    <button type="submit" disabled={loading} className="w-full mt-6 px-4 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition flex items-center justify-center disabled:bg-emerald-400">
                        {loading ? <Spinner size="small" /> : 'Submit Donation'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddFoodModal;