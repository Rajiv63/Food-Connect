export interface User {
  uid: string;
  email: string | null;
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  expiry: string; // YYYY-MM-DD
  location: string;
  postedBy: string; // email of the user
  postedAt: string; // ISO string
  claimed: boolean;
  claimedBy?: string | null; // email of the user who claimed it
}