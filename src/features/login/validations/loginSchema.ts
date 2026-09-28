import * as z from 'zod';

export const loginSchema = z.object({
    email: z.email('Email format is invalid').min(1, 'Email is required'), 
    password: z.string().min(1, 'Password is required'), 
}); 

export type LoginAdminRequest = z.infer<typeof loginSchema>