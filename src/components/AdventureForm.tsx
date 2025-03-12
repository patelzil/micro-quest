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
          <input
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Winnipeg, Seattle, New York"
            className="input-field"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="timeWindow" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Time Window
          </label>
          <input
            type="text"
            id="timeWindow"
            name="timeWindow"
            value={timeWindow}
            onChange={(e) => setTimeWindow(e.target.value)}
            placeholder="e.g., 2 hours, afternoon, all day Saturday"
            className="input-field"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="interests" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Interests
          </label>
          <input
            type="text"
            id="interests"
            name="interests"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="e.g., food, art, outdoors, music"
            className="input-field"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="vibe" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Vibe
          </label>
          <select
            id="vibe"
            name="vibe"
            value={vibe}
            onChange={(e) => setVibe(e.target.value)}
            className="input-field"
          >
            <option value="balanced">Balanced</option>
            <option value="chill">Chill</option>
            <option value="quirky">Quirky</option>
            <option value="energetic">Energetic</option>
            <option value="romantic">Romantic</option>
            <option value="cultural">Cultural</option>
          </select>
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
