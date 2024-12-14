import { AccountSettings } from '../services/account';

export interface UserProfile {
  address: string;
  avatarUrl: string;
  username?: string;
  bio?: string;
  joinedAt: string;
  reputation: {
    score: number;
    level: string;
    totalRentals: number;
    totalGPUsListed: number;
    reviews: number;
    successRate: number;
  };
  badges: Badge[];
  stats: {
    totalSpent: number;
    totalEarned: number;
    averageRating: number;
  };
  activity: UserActivity[];
  settings: AccountSettings;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}

export interface UserActivity {
  id: string;
  type: 'rental' | 'listing' | 'review' | 'badge' | 'level_up';
  timestamp: Date;
  details: {
    title: string;
    description: string;
    amount?: number;
    rating?: number;
    badgeId?: string;
    level?: string;
  };
}

export type ReputationLevel = 
  | 'Newcomer'
  | 'Regular'
  | 'Trusted'
  | 'Expert'
  | 'Elite'; 