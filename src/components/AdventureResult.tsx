'use client';

import { Adventure } from '@/lib/types/adventure';
import { useState } from 'react';

interface AdventureResultProps {
  adventure: Adventure;
  onReroll: () => void;
  onNewAdventure: () => void;
  isLoading: boolean;
}

export default function AdventureResult({
  adventure,
  onReroll,
  onNewAdventure,
  isLoading,
}: AdventureResultProps) {
  // State to track which stop is being hovered
  const [hoveredStop, setHoveredStop] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg 
                    transform transition-all duration-500 ease-out
                    hover:-translate-y-1"
           style={{ 
             boxShadow: 'var(--shadow-elevation-medium)',
             transition: 'all 0.3s ease'
           }}>
        <h2 className="text-2xl font-bold mb-1 
                     bg-gradient-to-r from-primary to-secondary dark:from-secondary dark:to-accent
                     bg-clip-text text-transparent">
          {adventure.title}
        </h2>
        <div className="flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
          <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md shadow-sm hover:shadow transition-shadow duration-300 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {adventure.location}
          </span>
          <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md shadow-sm hover:shadow transition-shadow duration-300 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            {adventure.timeWindow}
          </span>
          <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md shadow-sm hover:shadow transition-shadow duration-300 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {adventure.interests}
          </span>
          {adventure.vibe && (
            <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md shadow-sm hover:shadow transition-shadow duration-300 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              {adventure.vibe}
            </span>
          )}
        </div>

        <div className="space-y-4 mb-6">
          {adventure.stops.map((stop, index) => (
            <div 
              key={index} 
              className={`adventure-stop border-l-4 border-secondary pl-4 py-2 
                        transition-all duration-300 ease-out
                        hover:border-l-6 hover:pl-5 
                        ${hoveredStop === index ? 'bg-gray-50/70 dark:bg-gray-700/70 shadow-md -translate-y-1 scale-[1.02]' : ''}
                        rounded-r-md`}
              onMouseEnter={() => setHoveredStop(index)}
              onMouseLeave={() => setHoveredStop(null)}
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px',
                boxShadow: hoveredStop === index ? 
                  '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' : 'none'
              }}
            >
              <div className="flex items-start">
                <div className="font-medium text-lg text-gray-800 dark:text-gray-200 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  {stop.time}
                </div>
                <div className="ml-auto text-sm text-gray-500 dark:text-gray-400 pr-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  {stop.duration}
                </div>
              </div>
              <div className="font-bold text-primary dark:text-secondary flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {stop.location}
              </div>
              <div className="text-gray-700 dark:text-gray-300">{stop.activity}</div>
              <div className="text-sm italic text-gray-600 dark:text-gray-400 mt-1"> {stop.quirkyDetail}</div>
            </div>
          ))}
        </div>

        <div className="bg-gray-100/80 dark:bg-gray-700/80 p-4 rounded-md 
                      transform transition-all duration-500 ease-out
                      hover:bg-gray-100 dark:hover:bg-gray-700
                      hover:scale-[1.02] hover:shadow-lg dark:hover:shadow-xl dark:shadow-gray-900/30"
             style={{ 
               boxShadow: 'var(--shadow-elevation-low)',
               transformStyle: 'preserve-3d',
               perspective: '1000px'
             }}>
          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-600 dark:text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm9 4a1 1 0 10-2 0v6a1 1 0 102 0V7zm-3 2a1 1 0 10-2 0v4a1 1 0 102 0V9zm-3 3a1 1 0 10-2 0v1a1 1 0 102 0v-1z" clipRule="evenodd" />
            </svg>
            Quick Stats
          </h3>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="transform transition-transform hover:translate-z-2 hover:-translate-y-1 duration-300 p-2 rounded-md hover:bg-gray-200/50 dark:hover:bg-gray-600/50">
              <div className="text-gray-700 dark:text-gray-300 font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Travel Time
              </div>
              <div className="font-medium text-gray-800 dark:text-gray-200">{adventure.stats.travelTime}</div>
            </div>
            <div className="transform transition-transform hover:translate-z-2 hover:-translate-y-1 duration-300 p-2 rounded-md hover:bg-gray-200/50 dark:hover:bg-gray-600/50">
              <div className="text-gray-700 dark:text-gray-300 font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
                Cost (Approx)
              </div>
              <div className="font-medium text-gray-800 dark:text-gray-200">
                {adventure.stats.cost}
              </div>
            </div>
            <div className="transform transition-transform hover:translate-z-2 hover:-translate-y-1 duration-300 p-2 rounded-md hover:bg-gray-200/50 dark:hover:bg-gray-600/50">
              <div className="text-gray-700 dark:text-gray-300 font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Fun Factor
              </div>
              <div className="font-medium text-gray-800 dark:text-gray-200">{adventure.stats.funFactor}/10</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onReroll}
          disabled={isLoading}
          className="flex-1 group relative
                   bg-primary dark:bg-secondary
                   text-white font-medium py-2 px-4 rounded-md
                   transform transition-all duration-300
                   hover:shadow-lg active:shadow-inner active:translate-y-0.5
                   hover:-translate-y-1 hover:scale-[1.02]
                   focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secondary focus:ring-opacity-50
                   disabled:opacity-70 disabled:cursor-not-allowed"
          aria-label="Reroll Adventure"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {isLoading ? 'Generating...' : 'Reroll Adventure'}
          <span className="absolute -bottom-8 left-0 w-full text-xs text-center bg-gray-800 text-white py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Generate new options
          </span>
        </button>
        <button
          onClick={onNewAdventure}
          className="flex-1 group relative
                   bg-primary dark:bg-secondary
                   text-white font-medium py-2 px-4 rounded-md
                   transform transition-all duration-300
                   hover:shadow-lg active:shadow-inner active:translate-y-0.5
                   hover:-translate-y-1 hover:scale-[1.02]
                   focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secondary focus:ring-opacity-50"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          New Adventure
          <span className="absolute -bottom-8 left-0 w-full text-xs text-center bg-gray-800 text-white py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Start fresh with new inputs
          </span>
        </button>
      </div>
    </div>
  );
}
