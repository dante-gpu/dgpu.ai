import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
    </div>
  );
};