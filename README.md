# MicroQuest

MicroQuest is an AI-powered tool that transforms a user's spare time into a spontaneous, hyper-local adventure. By taking simple inputs—location, available time, and interests—it leverages an LLM to craft a bite-sized itinerary with specific stops, activities, and quirky details.

![image](https://github.com/user-attachments/assets/1182802b-1f67-4a9c-9855-9ff403781bf4)
![image](https://github.com/user-attachments/assets/ed8f82f4-c46d-4526-8840-0e64757ea982)



## Features

- **Adventure Generation**: Users provide location, time window, and interests (e.g., "Toronto, 3 hours, sports") and receive a clean, readable itinerary
- **Reroll Option**: Users can request a new itinerary using the same inputs
- **Vibe Selector**: Users can specify a mood (e.g., "chill," "quirky," "energetic") to tailor the tone
- **Quick Stats**: Summary showing estimated travel time, approximate cost in dollar amounts, and a dynamic "fun factor" rating
- **Dark Mode**: Full support for light and dark themes with system preference detection

## Tech Stack

- Next.js
- React and TypeScript with strict type checking
- Tailwind CSS for responsive styling
- Zod for data validation
- OpenAI
## Development

```bash
# Install dependencies
npm install

# Create a .env.local file with your OpenAI API key
# OPENAI_API_KEY=your-api-key-here

# Run development server
npm run dev
```
