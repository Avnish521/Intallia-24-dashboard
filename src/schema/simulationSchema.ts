import { z } from "zod";

export const sectionSchema = z.object({
  software: z.string().min(1, "Software is required"),
  studentFile: z.string().min(1, "Student File is required"),
  jsonFile: z.string().min(1, "JSON File is required"),
});
export const taskSchema = z.object({
  
});

// Define the schema for a simulation
const simulationSchema = z.object({
  plane: z.string().min(1, "Plane is required"),
  simulationName: z.string().min(1, "Simulation Name is required"),
  cardDescription: z.string().min(1, "Card Description is required"),
  bannerImage: z.any(),
  ctaImage: z.any(),
  cardImage: z.any(),
  difficultyLevel: z.string().min(1, "Difficulty Level is required"),
  priorityLevel: z.string().min(1, "priorityLevel is required"),
  tags: z.string().min(1, "Tags are required"),
  description: z.string().min(1, "Description is required"),
});

export type SimulationSchemaType = z.infer<typeof simulationSchema>;
export default simulationSchema;
