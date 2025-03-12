import { z } from 'zod';

// Zod schema for adventure stop
export const AdventureStopSchema = z.object({
  time: z.string(),
  location: z.string(),
  activity: z.string(),
  duration: z.string(),
  quirkyDetail: z.string(),
});

// Zod schema for adventure stats
export const AdventureStatsSchema = z.object({
  travelTime: z.string(),
  cost: z.string(),
  funFactor: z.number().min(1).max(10),
});

// Zod schema for vibe options
export const VibeSchema = z.enum([
  'chill',
  'quirky',
  'energetic',
  'romantic',
  'cultural',
  'balanced',
]);

// Zod schema for the complete adventure
export const AdventureSchema = z.object({
  location: z.string(),
  timeWindow: z.string(),
  interests: z.string(),
  vibe: VibeSchema.optional(),
  title: z.string(),
  stops: z.array(AdventureStopSchema),
  stats: AdventureStatsSchema,
  approximationTime: z.string().optional(),
});

// TypeScript types derived from Zod schemas
export type AdventureStop = z.infer<typeof AdventureStopSchema>;
export type AdventureStats = z.infer<typeof AdventureStatsSchema>;
export type Vibe = z.infer<typeof VibeSchema>;
export type Adventure = z.infer<typeof AdventureSchema>;

// Zod schema for the form input
export const AdventureFormSchema = z.object({
  location: z.string().min(1, "Location is required"),
  timeWindow: z.string().min(1, "Time window is required"),
  interests: z.string().min(1, "Interests are required"),
  vibe: VibeSchema.optional(),
  approximationTime: z.string().optional(),
});
