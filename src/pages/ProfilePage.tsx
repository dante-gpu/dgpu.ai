import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserProfile } from '../components/profile/UserProfile';
import { EditProfileModal } from '../components/profile/EditProfileModal';
import { getUserProfile, saveUserProfile } from '../services/reputation';
import { UserProfile as UserProfileType } from '../types/user';
import { useToast } from '../hooks/useToast';
import { Edit } from 'lucide-react';
import { generateAvatarUrl } from '../utils/avatar';

export const ProfilePage: React.FC = () => {
  const { address } = useParams<{ address: string }>();
  const [profile, setProfile] = useState<UserProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const { showToast } = useToast();
  const isOwnProfile = address === window.solana?.publicKey?.toBase58();

  useEffect(() => {
    const loadProfile = async () => {
      if (address) {
        const userProfile = await getUserProfile(address);
        if (userProfile) {
          const updatedProfile = {
            ...userProfile,
            avatarUrl: generateAvatarUrl(address)
          };
          await saveUserProfile(updatedProfile);
          setProfile(updatedProfile);
        } else {
          const newProfile: UserProfileType = {
            address,
            avatarUrl: generateAvatarUrl(address),
            joinedAt: new Date().toISOString(),
            reputation: {
              score: 0,
              level: 'Newcomer',
              totalRentals: 0,
              totalGPUsListed: 0,
              reviews: 0,
              successRate: 100
            },
            badges: [],
            stats: {
              totalSpent: 0,
              totalEarned: 0,
              averageRating: 0
            },
            activity: []
          };
          await saveUserProfile(newProfile);
          setProfile(newProfile);
        }
        setLoading(false);
      }
    };

    loadProfile();
  }, [address]);

  const handleProfileUpdate = async (updates: Partial<UserProfileType>) => {
    if (profile && isOwnProfile) {
      try {
        const updatedProfile = { ...profile, ...updates };
        await saveUserProfile(updatedProfile);
        setProfile(updatedProfile);
        showToast('Profile updated successfully', 'success');
      } catch (error) {
        console.error('Error updating profile:', error);
        showToast('Failed to update profile', 'error');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-glow-400"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-white mb-2">Profile Not Found</h2>
        <p className="text-gray-400">This user hasn't created a profile yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {isOwnProfile && (
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowEditModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-700 hover:bg-dark-600 transition-colors text-gray-300"
          >
            <Edit size={16} />
            <span>Edit Profile</span>
          </button>
        </div>
      )}

      <UserProfile profile={profile} />

      {isOwnProfile && showEditModal && (
        <EditProfileModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          profile={profile}
          onSave={handleProfileUpdate}
        />
      )}
    </div>
  );
}; 