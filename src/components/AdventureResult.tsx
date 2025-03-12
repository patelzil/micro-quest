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
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md 
                    transform transition-all duration-500 ease-out
                    hover:shadow-xl dark:hover:shadow-2xl dark:shadow-gray-900/30
                    hover:-translate-y-1">
        <h2 className="text-2xl font-bold mb-1 
                     bg-gradient-to-r from-primary to-secondary dark:from-secondary dark:to-accent
                     bg-clip-text text-transparent">
          {adventure.title}
        </h2>
        <div className="flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
          <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md shadow-sm hover:shadow transition-shadow duration-300"> {adventure.location}</span>
          <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md shadow-sm hover:shadow transition-shadow duration-300"> {adventure.timeWindow}</span>
          <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md shadow-sm hover:shadow transition-shadow duration-300"> {adventure.interests}</span>
          {adventure.vibe && (
            <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md shadow-sm hover:shadow transition-shadow duration-300"> {adventure.vibe}</span>
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
                <div className="font-medium text-lg text-gray-800 dark:text-gray-200">{stop.time}</div>
                <div className="ml-auto text-sm text-gray-500 dark:text-gray-400 pr-3">{stop.duration}</div>
              </div>
              <div className="font-bold text-primary dark:text-secondary">{stop.location}</div>
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
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Quick Stats</h3>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="transform transition-transform hover:translate-z-2 hover:-translate-y-1 duration-300 p-2 rounded-md hover:bg-gray-200/50 dark:hover:bg-gray-600/50">
              <div className="text-gray-600 dark:text-gray-400">Travel Time</div>
              <div className="font-medium text-gray-800 dark:text-gray-200">{adventure.stats.travelTime}</div>
            </div>
            <div className="transform transition-transform hover:translate-z-2 hover:-translate-y-1 duration-300 p-2 rounded-md hover:bg-gray-200/50 dark:hover:bg-gray-600/50">
              <div className="text-gray-600 dark:text-gray-400">Cost (Approx)</div>
              <div className="font-medium text-gray-800 dark:text-gray-200">
                {adventure.stats.cost}
              </div>
            </div>
            <div className="transform transition-transform hover:translate-z-2 hover:-translate-y-1 duration-300 p-2 rounded-md hover:bg-gray-200/50 dark:hover:bg-gray-600/50">
              <div className="text-gray-600 dark:text-gray-400">Fun Factor</div>
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
