import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { AdventureSchema, AdventureFormSchema, VibeSchema } from '@/lib/types/adventure';
import { z } from 'zod';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    // Parse form data
    const formData = await request.formData();
    const location = formData.get('location') as string;
    const timeWindow = formData.get('timeWindow') as string;
    const interests = formData.get('interests') as string;
    const vibeInput = formData.get('vibe') as string;
    const approximationTime = formData.get('approximationTime') as string | null;

    // Validate form data
    const validatedData = AdventureFormSchema.parse({
      location,
      timeWindow,
      interests,
      vibe: vibeInput,
      approximationTime: approximationTime || undefined,
    });

    // Create prompt for OpenAI
    let prompt = `Create a micro-adventure in ${validatedData.location} for a time window of ${validatedData.timeWindow} with interests in ${validatedData.interests}.`;
    
    if (validatedData.vibe) {
      prompt += ` The adventure should have a ${validatedData.vibe} vibe.`;
    }
    
    if (validatedData.approximationTime) {
      prompt += ` Please use these specific time approximations for the itinerary: ${validatedData.approximationTime}.`;
    }

    prompt += `\n\nPlease respond with a JSON object that strictly follows this structure:
    {
      "location": "${validatedData.location}",
      "timeWindow": "${validatedData.timeWindow}",
      "interests": "${validatedData.interests}",
      "vibe": "${validatedData.vibe || 'balanced'}",
      "title": "A creative title for the adventure",
      "stops": [
        {
          "time": "Time for this stop (e.g., '10:00 AM')",
          "location": "Name of the location",
          "activity": "Description of the activity",
          "duration": "Duration (e.g., '1 hour')",
          "quirkyDetail": "A unique or interesting detail about this stop"
        },
        // Include 2-3 stops total, if there is more than enough time then add more stops
      ],
      "stats": {
        "travelTime": "Estimated travel time between locations",
        "cost": "Estimated cost range (e.g., '$10-20')",
        "funFactor": "A number between 1-10 based on how enjoyable and exciting this adventure would be"
      }
    }`;

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-2024-08-06',
      messages: [
        {
          role: 'system',
          content: `You are MicroQuest, an AI that creates personalized micro-adventures based on location, time, and interests. 
          Your task is to craft a bite-sized itinerary with specific stops, activities, and quirky details.
          
          IMPORTANT RULES:
          1. Always respond with a valid JSON object that exactly matches the schema provided by the user.
          2. The "vibe" field must be one of these values only: 'chill', 'quirky', 'energetic', 'romantic', 'cultural', 'balanced'.
          3. The "interests" field must be a string, not an array.
          4. All required fields must be included.
          5. The "stops" field must be an array of objects, each with time, location, activity, duration, and quirkyDetail.
          6. The "stats" field must include travelTime, cost, and funFactor.
          7. The funFactor must be a number between 1-10, varying based on how well the adventure matches the user's interests and vibe.
             - 1-3: Not a match
             - 4-6: Decent match with basic activities
             - 7-8: Good match with interesting activities
             - 9-10: Perfect match with exceptional activities and experiences
          
          ${validatedData.approximationTime ? 'Use the provided time approximations to create a realistic itinerary with specific times.' : ''}`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    // Extract and parse JSON from response
    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No content in response');
    }

    try {
      // Clean up the content if it contains markdown formatting
      let cleanedContent = content;
      
      // Remove markdown code block syntax if present
      if (content.includes('```json')) {
        cleanedContent = content.replace(/```json\n|\n```/g, '');
      } else if (content.includes('```')) {
        cleanedContent = content.replace(/```\n|\n```/g, '');
      }
      
      // Try to parse the JSON response
      const adventureData = JSON.parse(cleanedContent);
      
      // Ensure interests is a string
      if (Array.isArray(adventureData.interests)) {
        adventureData.interests = adventureData.interests.join(', ');
      }
      
      // Normalize vibe field if present
      if (adventureData.vibe) {
        try {
          adventureData.vibe = VibeSchema.parse(adventureData.vibe.toLowerCase());
        } catch (e) {
          // If vibe is invalid, set it to the user's selected vibe or 'balanced'
          adventureData.vibe = validatedData.vibe || 'balanced';
        }
      }
      
      // Ensure all required fields are present
      if (!adventureData.timeWindow) adventureData.timeWindow = validatedData.timeWindow;
      if (!adventureData.title) adventureData.title = `Adventure in ${validatedData.location}`;
      if (!adventureData.stops || !Array.isArray(adventureData.stops) || adventureData.stops.length === 0) {
        adventureData.stops = [
          {
            time: "Start time",
            location: "First stop",
            activity: "Begin your adventure",
            duration: "30 minutes",
            quirkyDetail: "Look for the hidden details"
          }
        ];
      }
      if (!adventureData.stats) {
        adventureData.stats = {
          travelTime: "Varies",
          cost: "N/A", 
          funFactor: Math.floor(Math.random() * 9) + 1 // Random number between 1-10
        };
      } else if (typeof adventureData.stats.funFactor !== 'number' || 
                adventureData.stats.funFactor < 1 || 
                adventureData.stats.funFactor > 10) {
        // Ensure funFactor is a valid number between 1-10
        adventureData.stats.funFactor = Math.floor(Math.random() * 9) + 1; // Random number between 1-10
      }
      
      // Ensure cost format is correct
      if (adventureData.stats && adventureData.stats.cost) {
        // If cost is already in dollar amount format (e.g., "$10-20"), keep it as is
        if (!adventureData.stats.cost.match(/^\$\d+/)) {
          // Otherwise, convert from $ notation to dollar amount
          const costMap: Record<string, string> = {
            "$": "$10-20",
            "$$": "$20-50",
            "$$$": "$50-100",
            "$$$$": "$100+",
            "N/A": "N/A",
          };
          
          // Default to "$10-20" if not in the map
          adventureData.stats.cost = costMap[adventureData.stats.cost] || "$10-20";
        }
      }
      
      // Validate the adventure data against our schema
      const validatedAdventure = AdventureSchema.parse(adventureData);
      
      return NextResponse.json(validatedAdventure);
    } catch (error) {
      console.error('Error parsing or validating response:', error);
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { error: 'Invalid response format', details: error.errors },
          { status: 422 }
        );
      }
      throw error;
    }
  } catch (error) {
    console.error('Error generating adventure:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to generate adventure' },
      { status: 500 }
    );
  }
}
