import { z } from "zod";

export const SignupSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(3).max(20),
});

export const SigninSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(3).max(20),
});

export const CardSchema = z.object({
  userId: z.string().min(3).max(20),
  github: z.string(),
  twitter: z.string(),
  linkedIn: z.string(),
  dsa: z.string(),
  liveProjects: z.array(z.string()),
  openSource: z.array(z.string()),
});

export const UpdateCardSchema = z.object({
  github: z.string(),
  twitter: z.string(),
  linkedIn: z.string(),
  dsa: z.string(),
  liveProjects: z.array(z.string()),
  openSource: z.array(z.string()),
}).partial();
