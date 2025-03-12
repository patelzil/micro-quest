'use client';

import { useState } from 'react';
import { VibeSchema } from '@/lib/types/adventure';

interface AdventureFormProps {
  onSubmit: (formData: FormData) => void;
  isLoading: boolean;
}

export default function AdventureForm({ onSubmit, isLoading }: AdventureFormProps) {
  const [location, setLocation] = useState('');
  const [timeWindow, setTimeWindow] = useState('');
  const [interests, setInterests] = useState('');
  const [vibe, setVibe] = useState<string>('balanced');
  const [approximationTime, setApproximationTime] = useState('');
  const [showApproximationTime, setShowApproximationTime] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('location', location);
    formData.append('timeWindow', timeWindow);
    formData.append('interests', interests);
    formData.append('vibe', vibe);
    if (showApproximationTime && approximationTime) {
      formData.append('approximationTime', approximationTime);
    }
    
    onSubmit(formData);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg" style={{ boxShadow: 'var(--shadow-elevation-medium)' }}>
      <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary dark:from-[var(--dark-primary)] dark:to-[var(--dark-secondary)]">
        Create Your Adventure
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Location
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              id="location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Winnipeg, Seattle, New York"
              className="input-field pl-10"
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="timeWindow" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Time Window
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              id="timeWindow"
              name="timeWindow"
              value={timeWindow}
              onChange={(e) => setTimeWindow(e.target.value)}
              placeholder="e.g., 2 hours, afternoon, all day Saturday"
              className="input-field pl-10"
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="interests" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Interests
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <input
              type="text"
              id="interests"
              name="interests"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="e.g., food, art, outdoors, music"
              className="input-field pl-10"
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="vibe" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Vibe
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </div>
            <select
              id="vibe"
              name="vibe"
              value={vibe}
              onChange={(e) => setVibe(e.target.value)}
              className="input-field pl-10"
            >
              <option value="balanced">Balanced</option>
              <option value="chill">Chill</option>
              <option value="quirky">Quirky</option>
              <option value="energetic">Energetic</option>
              <option value="romantic">Romantic</option>
              <option value="cultural">Cultural</option>
            </select>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <label htmlFor="showApproximationTime" className="text-sm text-gray-700 dark:text-gray-300">
              Include specific times for itinerary
            </label>
            <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
              <input
                type="checkbox"
                id="showApproximationTime"
                checked={showApproximationTime}
                onChange={() => setShowApproximationTime(!showApproximationTime)}
                className="absolute w-0 h-0 opacity-0"
              />
              <label
                htmlFor="showApproximationTime"
                className={`block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-600 cursor-pointer transition-colors duration-200 ease-in-out ${
                  showApproximationTime ? 'bg-secondary dark:bg-secondary' : ''
                }`}
              >
                <span
                  className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
                    showApproximationTime ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </label>
            </div>
          </div>
        </div>
        
        {showApproximationTime && (
          <div className="mb-4 transform transition-all duration-300 ease-in-out" style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
            <label htmlFor="approximationTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Approximation Time
            </label>
            <input
              type="text"
              id="approximationTime"
              name="approximationTime"
              value={approximationTime}
              onChange={(e) => setApproximationTime(e.target.value)}
              placeholder="e.g., Start at 9 AM, or 2 PM to 5 PM"
              className="input-field"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Specify approximate times for your itinerary stops
            </p>
          </div>
        )}
        
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full"
        >
          {isLoading ? 'Generating Adventure...' : 'Generate Adventure'}
        </button>
      </form>
    </div>
  );
}
