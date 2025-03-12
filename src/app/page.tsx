'use client';

import { useState } from 'react';
import AdventureForm from '@/components/AdventureForm';
import AdventureResult from '@/components/AdventureResult';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { Adventure } from '@/lib/types/adventure';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [adventure, setAdventure] = useState<Adventure | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate adventure');
      }
      
      const data = await response.json();
      setAdventure(data);
    } catch (error) {
      console.error('Error generating adventure:', error);
      alert('Failed to generate adventure. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReroll = async () => {
    if (!adventure) return;
    
    setIsLoading(true);
    
    const formData = new FormData();
    formData.append('location', adventure.location);
    formData.append('timeWindow', adventure.timeWindow);
    formData.append('interests', adventure.interests);
    formData.append('vibe', adventure.vibe || 'balanced');
    formData.append('reroll', 'true');
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to reroll adventure');
      }
      
      const data = await response.json();
      setAdventure(data);
    } catch (error) {
      console.error('Error rerolling adventure:', error);
      alert('Failed to reroll adventure. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewAdventure = () => {
    setAdventure(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-12">
        <div className="text-center flex-1">
          <h1 className="text-4xl font-bold text-primary dark:text-accent mb-2">MicroQuest</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Ignite Your Local Escape
          </p>
        </div>
        <div className="flex-none">
          <ThemeToggle />
        </div>
      </header>

      <div className="max-w-3xl mx-auto">
        {adventure ? (
          <AdventureResult 
            adventure={adventure} 
            onReroll={handleReroll} 
            onNewAdventure={handleNewAdventure}
            isLoading={isLoading}
          />
        ) : (
          <AdventureForm onSubmit={handleSubmit} isLoading={isLoading} />
        )}
      </div>
      
      <footer className="text-center py-6 text-sm text-gray-500 dark:text-gray-400 mt-8">
        Created by Zil Patel &copy; 2025
      </footer>
    </div>
  );
}
